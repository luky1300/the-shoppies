import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from 'axios';

const FETCH_FOUND_MOVIES = "FETCH_FOUND_MOVIES";
const NOMINATE_MOVIE = 'NOMINATE_MOVIE';

let initialState = {
    foundMovies: [{Title: 'Placeholder'}],
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

export const getMovies = (movie) => {
return async (dispatch) => {
    try {
    let response = await axios.get(`http://www.omdbapi.com/?apikey=c1268e3b&s=${movie}`);
    let movies = response.data.Search;
    console.log(movies)
    dispatch(fetchFoundMovies(movies));
    } catch (error) {
    console.log("Error with finding place", error);
    }
};
};
  

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FOUND_MOVIES:
            return {...state, foundMovies: action.foundMovies};
        case NOMINATE_MOVIE:
            console.log('there', action.movie)
            return {...state, nominates: [...state.nominates, action.movie]}
        default:
            return state;
    }
  };
  
  const store = createStore(reducer, applyMiddleware(thunk));
  
  export default store;
