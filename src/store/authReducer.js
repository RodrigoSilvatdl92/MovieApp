import { createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc, arrayUnion, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";

const initialState = {
  currentUser: null,
  error: null,
  favoriteMovies: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.currentUser = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setListOfFavoriteMovies(state, action) {
      state.favoriteMovies = action.payload;
    },
  },
});

export const { setUser, setError, setListOfFavoriteMovies } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.currentUser;
export const selectError = (state) => state.auth.error;
export const selectFavoriteMovies = (state) => state.auth.favoriteMovies;

export const signUp = (email, password) => {
  return Promise.all([
    createUserWithEmailAndPassword(auth, email, password),
    setDoc(doc(db, "users", email), {
      favoriteMovies: [],
    }),
  ]);
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      if (user) {
        dispatch(setUser(user.email));
      }
    } catch (error) {
      console.log("ERRO");
      dispatch(setError(error.message));
      console.log(error.message);
    }
  };
};

export const logOut = () => {
  return async (dispatch) => {
    try {
      await signOut(auth);
      dispatch(setUser(null));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
};

export const addToFavorite = (movie) => {
  return async (dispatch, getState) => {
    const { currentUser, favoriteMovies } = getState().auth;
    const dbFavoriteMoviesPath = doc(db, "users", `${currentUser}`);
    if (!currentUser) {
      return;
    }
    try {
      dispatch(setListOfFavoriteMovies([...(favoriteMovies + movie)]));
      await updateDoc(dbFavoriteMoviesPath, {
        favoriteMovies: arrayUnion({
          id: movie.id,
          name: movie.original_title,
          imdb: movie.vote_average,
          overview: movie.overview,
          image: movie.backdrop_path,
        }),
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const removeFromFavorite = (movie) => {
  return async (dispatch, getState) => {
    const { currentUser, favoriteMovies } = getState().auth;
    const dbFavoriteMoviesPath = doc(db, "users", `${currentUser}`);
    if (!currentUser) {
      return;
    }
    try {
      const updatedMovies = favoriteMovies.filter(
        (item) => item.id !== movie.id
      );
      dispatch(setListOfFavoriteMovies(updatedMovies));
      await updateDoc(dbFavoriteMoviesPath, { favoriteMovies: updatedMovies });
    } catch (error) {
      console.log(error);
    }
  };
};
