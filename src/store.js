import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from 'axios';
import {saveState, loadState} from './localStorage'

const FETCH_FOUND_MOVIES = "FETCH_FOUND_MOVIES";
const NOMINATE_MOVIE = 'NOMINATE_MOVIE';
const WITHDRAW_MOVIE = 'WITHDRAW_MOVIE';
const SEARCH_ERROR = 'SEARCH_ERROR'; 

let initialState = {
    foundMovies: [],
    nominates: [],
    isSearchError: false,
    searchedTitle: '',
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

const errorSearch = (movie) => {
    return {
        type: SEARCH_ERROR,
        movie
    }
}

export const getMovies = (movie) => {
return async (dispatch) => {
    try {
    let response = await axios.get(`http://www.omdbapi.com/?apikey=c1268e3b&s=${movie}&type=movie`);
    if (response.data.Response !== "False") {
        let movies = response.data.Search;
        dispatch(fetchFoundMovies(movies));
    } else {
        dispatch(errorSearch(movie))
    }
    } catch (error) {
    console.log("Error with finding movie", error);
    }
};
};
  

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FOUND_MOVIES:
            let fetchedMovies = action.foundMovies;
            if (state.nominates && state.nominates.length) {
                let nominatesImdbIDs = state.nominates.map((movie) => {
                    return movie.imdbID
                })
                fetchedMovies.forEach(movie => {
                    if (nominatesImdbIDs.indexOf(movie.imdbID) !== -1) movie.disableNominate = true
                })
            }
            return {...state, foundMovies: fetchedMovies, isSearchError: false};
        case NOMINATE_MOVIE:
            state.foundMovies.forEach((movie) => {
                if (movie.imdbID === action.movie.imdbID) movie.disableNominate = true
            })
            return {...state, nominates: [...state.nominates, action.movie]}
        case WITHDRAW_MOVIE:    
            let newNominates = state.nominates.filter((movie) => {
                return (movie.imdbID !== action.movie.imdbID)
            });
            if (state.foundMovies) {
            state.foundMovies.forEach((movie) => {
                if (movie.imdbID === action.movie.imdbID) movie.disableNominate = false
            })
            }
            return {...state, nominates: newNominates}
        case SEARCH_ERROR:
            return {...state, isSearchError: true, searchedTitle: action.movie}
        default:
            return state;
    }
  };
  
  const persistedState = loadState(initialState);

  const store = createStore(reducer, persistedState, applyMiddleware(thunk));

  store.subscribe(() => {
    saveState({
        nominates: store.getState().nominates
    });
  });
  
  export default store;
