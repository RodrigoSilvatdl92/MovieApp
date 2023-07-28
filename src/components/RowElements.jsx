import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectFavoriteMovies } from "../store/authReducer";
import { addToFavorite } from "../store/authReducer";
import { removeFromFavorite } from "../store/authReducer";

import { useDispatch } from "react-redux";

function RowElements({ movie }) {
  const [like, setLike] = useState("");
  const favoriteMovies = useSelector(selectFavoriteMovies);
  const dispatch = useDispatch();

  useEffect(() => {
    if (favoriteMovies?.some((item) => item.id === movie.id)) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [favoriteMovies]);

  return (
    <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`}
        alt="/"
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
        <Link to={"/movie/" + movie.id}>
          <p className="text-xs md:text-sm font-bold flex items-center h-full justify-center">
            {movie?.title}
          </p>
        </Link>
        <p>
          {like ? (
            <FaHeart
              className="absolute top-4 left-4 text-gray-300 z-40"
              onClick={() => dispatch(removeFromFavorite(movie))}
            />
          ) : (
            <FaRegHeart
              className="absolute top-4 left-4 text-gray-300 z-40"
              onClick={() => dispatch(addToFavorite(movie))}
            />
          )}
        </p>
      </div>
    </div>
  );
}

export default RowElements;
