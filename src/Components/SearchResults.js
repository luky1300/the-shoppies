import React from 'react'
import Paper from '@material-ui/core/Paper'
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { connect } from "react-redux";


function SearchResults(props) {
    
    const movies = props.foundMovies
    
    return (
        <Paper> 
            <h5>Movie search results</h5>
            <List >
                {movies.map((movie) => {
                    return (
                        <ListItem key={`${movie.imdbID}${movie.Title}`}>
                            <ListItemText>
                                {`${movie.Title} (year ${movie.Year})`}
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

const mapStateToProps = (state) => ({
    foundMovies: state.foundMovies,
  });
  
  const ConnectedSearchResults = connect(
    mapStateToProps
  )(SearchResults);
  
  export default ConnectedSearchResults;

