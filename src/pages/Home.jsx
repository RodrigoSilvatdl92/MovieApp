import Row from "../components/Row";
import Main from "../components/Main";
import requests from "../Request";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { setListOfFavoriteMovies } from "../store/authReducer";
import { useDispatch } from "react-redux";
import { selectCurrentUser } from "../store/authReducer";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

function Home() {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  /* a função onSnapShot está smp a fazer update ao state sempre q há alterações portanto no fim tens q fazer return unsubscrive para limpar a função e impedi la que ela corra sempre q "desmonstas este componente" */

  useEffect(() => {
    onSnapshot(doc(db, "users", `${currentUser}`), (doc) => {
      dispatch(setListOfFavoriteMovies(doc.data()?.favoriteMovies));
    });
  }, [currentUser, dispatch]);

  return (
    <div>
      <Main />
      <Row title={"Popular"} fetchUrl={requests.popular} rowId="1" />
      <Row title={"Top Rated"} fetchUrl={requests.top_rated} rowId="2" />
      <Row title={"Upcoming"} fetchUrl={requests.upcoming} rowId="4" />
    </div>
  );
}

export default Home;
