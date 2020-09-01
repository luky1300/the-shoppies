import React from 'react'
import Paper from '@material-ui/core/Paper'
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

export default function SearchResults() {
    
    const movies = ["Movie 1", "Movie 2", "Movie 3", "Movie 4", "Movie 5"]
    
    return (
        <Paper> 
            <h5>Movie search results</h5>
            <List >
                {movies.map((movie) => {
                    return (
                        <ListItem key={movie}>
                            <ListItemText>
                                {movie}
                            </ListItemText>
                            <Button 
                                type="submit"
                                endIcon={<ArrowForwardIcon />}
                                onClick={(e) => { 
                                e.preventDefault()
                                console.log(`movie ${movie} will added to the list`)    
                                }} >
                                Nominate
                            </Button>
                        </ListItem>
                    );
                })}
            </List>
        </Paper>
    )
}
