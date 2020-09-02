import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from 'axios';

const FETCH_FOUND_MOVIES = "FETCH_FOUND_MOVIES";
const NOMINATE_MOVIE = 'NOMINATE_MOVIE';
const WITHDRAW_MOVIE = 'WITHDRAW_MOVIE';
const DISABLE_NOMINATE = 'DISABLE_NOMINATE'

let initialState = {
    foundMovies: [],
    nominates: []
}

const fetchFoundMovies = (foundMovies) => {
    return {
      type: FETCH_FOUND_MOVIES,
      foundMovies
    };
  };

export const nominateMovie = (movie) => {
    return {
      type: NOMINATE_MOVIE,
      movie
    };
  };

export const withdrawMovie = (movie) => {
    return {
        type: WITHDRAW_MOVIE,
        movie
    }
} 

export const disableNominate = (imdbID) => {
    return {
        type: DISABLE_NOMINATE,
        imdbID
    }
}

export const getMovies = (movie) => {
return async (dispatch) => {
    try {
    let response = await axios.get(`http://www.omdbapi.com/?apikey=c1268e3b&s=${movie}`);
    let movies = response.data.Search;
    console.log(movies)
    dispatch(fetchFoundMovies(movies));
    } catch (error) {
    console.log("Error with finding movie", error);
    }
};
};
  

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FOUND_MOVIES:
            let fetchedMovies = action.foundMovies;
            if (state.nominates.length) {
            let nominatesImdbIDs = state.nominates.map((movie) => {
                return movie.imdbID
            })
            console.log('nominatesImdbIDs', nominatesImdbIDs)
            fetchedMovies.map(movie => {
                if (nominatesImdbIDs.indexOf(movie.imdbID) !== -1) movie.disableNominate = true
            })
            }
            console.log('fetchedMovies', fetchedMovies)
            return {...state, foundMovies: fetchedMovies};
        case NOMINATE_MOVIE:
            return {...state, nominates: [...state.nominates, action.movie]}
        case WITHDRAW_MOVIE:    
            let newNominates = state.nominates.filter((movie) => {
                return (movie.imdbID !== action.movie.imdbID)
            });
            return {...state, nominates: newNominates}
        case DISABLE_NOMINATE:
            console.log('state.nominates', state.nominates)
            state.nominates.map((movie) => {
                if (movie.imdbID === action.imdbID) movie.disableNominate = true
            })
            console.log(state.nominates)
            return {...state}
        default:
            return state;
    }
  };
  
  const store = createStore(reducer, applyMiddleware(thunk));
  
  export default store;
