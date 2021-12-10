import React from "react";
// React-Router
import { useParams, useNavigate } from "react-router-dom";
// Redux
import { useDispatch, useSelector } from "react-redux";
// Material
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from "@material-ui/core";
import useStyles from "./styles";
// Moment
import moment from "moment";
// Action Helpers
import { getPost, getPostsBySearch } from "../../actions/posts";

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams();

  console.log(posts);

  React.useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

  React.useEffect(() => {
    if (post)
      dispatch(
        getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
      );
  }, [post, dispatch]);

  if (!post) return null;

  const openPost = (_id) => navigate(`/posts/${_id}`);

  if (isLoading)
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Comments - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title}
          />
        </div>
      </div>
      {!!recommendedPosts.length && (
        <div className={classes.section}>
          <Typography variant="h5" gutterBottom>
            You might also like:
          </Typography>
          <Divider />
          <div>
            {recommendedPosts?.map(
              ({ title, message, name, likes, selectedFile, _id }) => (
                <div
                  style={{ margin: "20px", cursor: "pointer" }}
                  onClick={() => openPost(_id)}
                  key={_id}
                >
                  <Typography variant="h6" gutterBottom>
                    {title}
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    {name}
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    {message}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Likes: {likes?.length}
                  </Typography>
                  <img
                    src={
                      selectedFile ||
                      "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                    }
                    alt={title}
                    width="200px"
                  />
                </div>
              )
            )}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;
