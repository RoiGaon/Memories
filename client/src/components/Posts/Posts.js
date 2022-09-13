import React from "react";
// Redux
import { useSelector } from "react-redux";
// Material
import { Grid, CircularProgress } from "@material-ui/core";
import useStyles from "./styles";
// My Components
import Post from "./Post/Post";

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  console.log({ posts });
  const classes = useStyles();

  if (!posts.length && !isLoading) return "No posts";

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts?.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
