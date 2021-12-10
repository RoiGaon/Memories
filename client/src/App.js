import React from "react";
// React-Router
import { Routes, Route, Navigate } from "react-router-dom";
// Material
import { Container } from "@material-ui/core";
// My Components
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <Container maxWidth="xl">
      <NavBar />
      <Routes>
        <Route path="/" exact element={<Navigate to="/posts" />} />
        <Route path="/posts" exact element={<Home />} />
        <Route path="/posts/search" exact element={<Home />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route
          path="/auth"
          exact
          element={user ? <Navigate to="/posts" /> : <Auth />}
        />
      </Routes>
    </Container>
  );
};

export default App;
