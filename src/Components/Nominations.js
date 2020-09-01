import React from 'react'
import Paper from '@material-ui/core/Paper'
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Nominations() {
    
    const movies = ["Movie 1", "Movie 2", "Movie 3", "Movie 4", "Movie 5"]
    
    return (
        <Paper> 
            <h5>Nominations</h5>
            <List >
                {movies.map((movie) => {
                    return (
                        <ListItem key={movie}>
                            <ListItemText>
                                {movie}
                            </ListItemText>
                            <Button 
                                type="submit"
                                endIcon={<DeleteIcon />}
                                onClick={(e) => { 
                                e.preventDefault()
                                console.log(`movie ${movie} will be removed from the list`)    
                                }} >
                                withdraw
                            </Button>
                        </ListItem>
                    );
                })}
            </List>
        </Paper>
    )
}
