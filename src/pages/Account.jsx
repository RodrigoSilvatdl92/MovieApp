import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../store/authReducer";
import { Link } from "react-router-dom";
import { selectFavoriteMovies } from "../store/authReducer";
import { useDispatch } from "react-redux";
import { CiSquareRemove } from "react-icons/ci";

import { removeFromFavorite } from "../store/authReducer";

function Account() {
  const favoriteMovies = useSelector(selectFavoriteMovies);
  const dispatch = useDispatch();
  console.log(favoriteMovies);

  /* a função onSnapShot está smp a fazer update ao state sempre q há alterações portanto no fim tens q fazer return unsubscrive para limpar a função e impedi la que ela corra sempre q "desmonstas este componente" */

  return (
    <div className="max-w-screen-xl  m-auto top-[100px] px-4 rounded-sm relative">
      {favoriteMovies?.length > 0 ? (
        favoriteMovies.map((movie) => (
          <div
            key={movie.id}
            className="rounded border border-gray-500 flex justify-around h-[300px] items-center my-4 relative"
          >
            {movie.image && (
              <div className="w-[40%]">
                <img
                  className="object-cover rounded-sm "
                  src={`https://image.tmdb.org/t/p/original${movie?.image}`}
                  alt={movie.name}
                />
              </div>
            )}
            <div className="w-[40%]  flex flex-col justify-center rounded-sm">
              <p className="text-white font-bold">Title: {movie.name}</p>
              <Link to={"/movie/" + movie.id}>
                <button className="bg-red-600 px-6 py-2 rounded p-1 text-white mt-4">
                  Play
                </button>
              </Link>
              <CiSquareRemove
                className="absolute top-2 right-2 text-white cursor-pointer"
                size={30}
                onClick={() => dispatch(removeFromFavorite(movie))}
              />
            </div>
          </div>
        ))
      ) : (
        <h1 className="text-white font-bold text-2xl">
          No movies added to favorites...
        </h1>
      )}
    </div>
  );
}

export default Account;
