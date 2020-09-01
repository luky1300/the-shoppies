import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        // width: 400,
      },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        width: 400,
      },
      iconButton: {
        padding: 10,
      },
  }));

export default function Search() {
    
    const classes = useStyles();
    const [movie, setMovie] = useState("");
    
    return (
        <Paper className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder="Movie title"
                onChange={(e) => { 
                    e.preventDefault();
                    setMovie(e.target.value)
                    console.log('e.target.value', e.target.value) 
                    
                    }}  
            />
            <IconButton 
                type="submit"
                className={classes.iconButton}
                onClick={(e) => { 
                    e.preventDefault()
                    console.log(movie)    
                    }} >
                <SearchIcon />
            </IconButton>
        </Paper>
    )
} 