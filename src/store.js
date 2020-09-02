import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from 'axios';

const FETCH_FOUND_MOVIES = "FETCH_FOUND_MOVIES";

let initialState = {
    foundMovies: [{Title: 'Placeholder'}],
    nominates: []
}

export const fetchFoundMovies = (foundMovies) => {
    return {
      type: FETCH_FOUND_MOVIES,
      foundMovies
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
      default:
        return state;
    }
  };
  
  const store = createStore(reducer, applyMiddleware(thunk));
  
  export default store;
