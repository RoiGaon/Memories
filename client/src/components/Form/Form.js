import React from "react";
// React-Router
import { useNavigate } from "react-router-dom";
// Redux
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { useSelector } from "react-redux";
// Material
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import useStyles from "./styles";
// FileBase
import FileBase from "react-file-base64";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = React.useState({
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
  });
  const post = useSelector((state) =>
    currentId
      ? state.posts.posts.find((message) => message._id === currentId)
      : null
  );
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();

  const clear = React.useCallback(() => {
    setCurrentId(0);
    setPostData({ title: "", message: "", tags: [], selectedFile: "" });
  }, [setCurrentId]);

  React.useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
  }, [post, clear]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !postData.title ||
      postData.title.trim() === "" ||
      !postData.message ||
      postData.message.trim() === "" ||
      !postData.tags.length > 0
    )
      return alert("Must fill all inputs");
    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
      clear();
    } else {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.form} ${classes.root}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editting" : "Creating"} a Memory
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          required
          value={postData.title}
          onChange={(e) =>
            setPostData((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          required
          value={postData.message}
          onChange={(e) =>
            setPostData((prev) => ({ ...prev, message: e.target.value }))
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          required
          value={postData.tags}
          onChange={(e) =>
            setPostData((prev) => ({
              ...prev,
              tags: e.target.value.split(","),
            }))
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData((prev) => ({ ...prev, selectedFile: base64 }))
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
