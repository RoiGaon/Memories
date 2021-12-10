import React from "react";
// React-Router
import { Link } from "react-router-dom";
// Redux
import { useDispatch, useSelector } from "react-redux";
// Material
import { Pagination, PaginationItem } from "@material-ui/lab";
import useStyles from "./styles";
// Actions Helpers
import { getPosts } from "../../actions/posts";

const Paginate = ({ page }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { numberOfPages } = useSelector((state) => state.posts);

  React.useEffect(() => {
    if (page) {
      dispatch(getPosts(page));
    }
  }, [dispatch, page]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
        />
      )}
    />
  );
};

export default Paginate;
