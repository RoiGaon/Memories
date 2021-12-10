import React from "react";
// React-Router
import { Link, useNavigate, useLocation } from "react-router-dom";
// Redux
import { useDispatch } from "react-redux";
// Material
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import useStyles from "./styles";
// ActionsTypes
import { LOGOUT } from "../../constants/actionsTypes";
// JWT
import decode from "jwt-decode";

const NavBar = () => {
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const token = user?.token;

  const logout = React.useCallback(() => {
    dispatch({ type: LOGOUT });
    navigate("/");
    setUser(null);
  }, [dispatch, navigate]);

  React.useEffect(() => {
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, token, logout]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img
          component={Link}
          to="/"
          src={"/images/memoriesText.png"}
          alt="icon"
          height="45px"
        />
        <img
          className={classes.image}
          src={"/images/memoriesLogo.png"}
          alt="icon"
          height="40px"
        />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result.name}
              src={user?.result.imageUrl}
            >
              {user?.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
