// Basic Exports
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
// Routes
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";

const app = express();
dotenv.config();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello to Memotries API");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL_ATLAS, { useNewUrlParser: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(
        `connetcted successfully and running on port: ${PORT}, http://localhost:${PORT}`
      )
    )
  )
  .catch((error) => console.log(`something went wrong!: ${error.message}`));
