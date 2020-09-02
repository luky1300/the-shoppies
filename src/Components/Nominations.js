import React from 'react'
import Paper from '@material-ui/core/Paper'
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from "react-redux";
import { withdrawMovie } from "../store";

function Nominations(props) {
    
    const nominates = props.nominates;
    const withdrawMovie = props.withdrawMovie
    
    return (
        <Paper> 
            <h5>Nominations</h5>
            <List >
                {nominates.map((movie) => {
                    return (
                        <ListItem key={`${movie.imdbID}${movie.Title}N`}>
                            <ListItemText>
                                {`${movie.Title} (year ${movie.Year})`}
                            </ListItemText>
                            <Button 
                                type="submit"
                                endIcon={<DeleteIcon />}
                                onClick={(e) => { 
                                e.preventDefault()
                                withdrawMovie(movie)    
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

const mapStateToProps = (state) => ({
    nominates: state.nominates,
});

const mapDispatchToProps = (dispatch) => ({
    withdrawMovie: (movie) => dispatch(withdrawMovie(movie)),
});

const ConnectedNominations = connect(
mapStateToProps,
mapDispatchToProps
)(Nominations);

export default ConnectedNominations;

