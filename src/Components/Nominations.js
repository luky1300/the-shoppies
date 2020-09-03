import React from 'react'
import Paper from '@material-ui/core/Paper'
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import { Alert, AlertTitle } from '@material-ui/lab';
import { connect } from "react-redux";
import { withdrawMovie } from "../store";

function Nominations(props) {
    
    const nominates = props.nominates;
    const withdrawMovie = props.withdrawMovie
    
    return (
        <React.Fragment>
            <Typography variant="h6">
                Nominations:
            </Typography>  
        {nominates && nominates.length > 0 &&
        <Paper> 
            <List >
                {nominates.map((movie) => {
                    return (
                        <ListItem key={`${movie.imdbID}${movie.Title}N`}>
                            <ListItemText>
                                <Typography variant="body2">
                                    {`${movie.Title} (year ${movie.Year})`}
                                </Typography>
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
            {nominates.length >= 5 && 
            <Alert severity="success">
            <AlertTitle>Yay! You have all nominates in!</AlertTitle>
                To add something else withdraw one
            </Alert> 
            }
        </Paper>
        }
        </React.Fragment>
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

