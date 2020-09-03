import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    bottomPush: {
        bottom: 0,
        paddingBottom: 10,
        marginTop: 20
  }
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.bottomPush}>
        <Typography>
        * <a href="https://icons8.com/icon/46684/movie-projector">Movie Projector icon by Icons8</a>
        </Typography>
    </div>
  );
}
