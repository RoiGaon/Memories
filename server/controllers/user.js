import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const exsitingUser = await User.findOne({ email });
    if (!exsitingUser)
      return res.status(404).json({ message: "User doen't exist" });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      exsitingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(404).json({ message: "Invalid Credentials" });
    const token = jwt.sign(
      { email: exsitingUser.email, id: exsitingUser._id },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: exsitingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Somthing went wrong " + error });
  }
};

export const signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    const exsitingUser = await User.findOne({ email });
    if (exsitingUser)
      return res.status(400).json({ message: "User already exist" });
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Somthing went wrong " + error });
  }
};
