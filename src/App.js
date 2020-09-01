import React from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import SearchBar from './Components/SearchBar'
import SearchResults from './Components/SearchResults'
import Nominations from './Components/Nominations'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 50,
  },
}));


function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SearchBar />
      </Grid>
      <Grid item xs={6}>
        <SearchResults />
      </Grid>
      <Grid item xs={6}>
        <Nominations />
      </Grid>
    </Grid>
    </div>
  );
}

export default App;
