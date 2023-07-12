import React, { useState, useEffect } from "react";
import axios from "axios";
import requests from "../Request";
import { Link } from "react-router-dom";

function Main() {
  const [movies, setMovies] = useState([]);

  const movie = movies[Math.floor(Math.random() * movies.length)];

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(requests.popular);
      setMovies(response.data.results);
    };

    fetchData();
  }, []);

  const truncateString = (str, num) => {
    if (str?.length > 0) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  return (
    <div className="w-full h-[550px] ">
      <div className="w-full h-[550px]">
        <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
          alt={movie?.title}
        />
      </div>
      <div className="absolute top-[20%] ml-4 ">
        <h1 className="text-white text-3xl md:text-5xl font-bold">
          {movie?.title}
        </h1>
        <div className="my-4">
          <Link to={"/movie/" + movie?.id}>
            <button className="bg-white py-1 px-4 text-xl">Play</button>
          </Link>
          <Link to={"/movie/" + movie?.id}>
            <button className="text-white text-xl ml-4 border py-1 px-4">
              Watch Trailer
            </button>
          </Link>
        </div>
        <p className="text-white">Released: {movie?.release_date}</p>
        <p className="text-white">{truncateString(movie?.overview, 200)}</p>
      </div>
    </div>
  );
}

export default Main;
