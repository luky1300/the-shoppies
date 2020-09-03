import React from 'react'
import Paper from '@material-ui/core/Paper'
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Typography from '@material-ui/core/Typography';
import { Alert, AlertTitle } from '@material-ui/lab';
import { connect } from "react-redux";
import { nominateMovie } from "../store";


function SearchResults(props) {
    
    const movies = props.foundMovies
    const nominates = props.nominates
    const nominateMovie = props.nominateMovie
    const isSearchError = props.isSearchError
    const movie = props.searchedTitle
    
    return (
        <React.Fragment>
            <Typography variant="h6">
                Movie search result:
            </Typography>
        {isSearchError &&
        <Paper>
        <Alert severity="warning">
        <AlertTitle>{`We did not find any movies with "${movie}"`}</AlertTitle>
            Try again
        </Alert> 
        </Paper>
        }
        {movies && movies.length > 0 &&
        <Paper>
            <List >
                {movies.map((movie) => {
                    return (
                        <ListItem key={`${movie.imdbID}${movie.Title}`}>
                            <ListItemText>
                                <Typography variant="body2">
                                    {`${movie.Title} (year ${movie.Year})`}
                                </Typography>
                            </ListItemText>
                            <Button 
                                type="submit"
                                endIcon={<ArrowForwardIcon />}
                                disabled={movie.disableNominate || nominates.length >= 5}
                                onClick={(e) => { 
                                e.preventDefault()
                                if (nominates.length < 5) {
                                    nominateMovie(movie)
                                } else {
                                    return (
                                        <p>Error</p>
                                    )
                                }
                                }} >
                                Nominate
                            </Button>
                        </ListItem>
                    );
                })}
            </List>
        </Paper>
        }
    </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    foundMovies: state.foundMovies,
    nominates: state.nominates,
    isSearchError: state.isSearchError,
    searchedTitle: state.searchedTitle
});

const mapDispatchToProps = (dispatch) => ({
    nominateMovie: (movie) => dispatch(nominateMovie(movie)),
});

const ConnectedSearchResults = connect(
mapStateToProps,
mapDispatchToProps
)(SearchResults);

export default ConnectedSearchResults;

