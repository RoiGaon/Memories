import React from "react";
// React-Router
import { useLocation } from "react-router-dom";
// Material
import { Container, Grow, Grid, Paper } from "@material-ui/core";
import useStyles from "./styles";
// My Components
import Posts from "../../components/Posts/Posts";
import Form from "../../components/Form/Form";
import Pagination from "../../components/Pagination/Pagination";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = React.useState(null);
  const classes = useStyles();
  const query = useQuery();
  const page = query.get("page") || 1;

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper className={classes.pagination} elevation={6}>
              <Pagination page={page} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
