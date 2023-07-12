import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import requests from "../Request";
import axios from "axios";
import { key } from "../Request";

function MovieDetails() {
  const params = useParams();
  const [movie, setMovie] = useState("");
  const [movieTrailer, setMovieTrailer] = useState("");

  console.log(movieTrailer.results);

  const fetchUrlMovie = `https://api.themoviedb.org/3/movie/${params.movieid}?api_key=${key}&language=en-US`;

  const fetchUrlMovieTrailer = `https://api.themoviedb.org/3/movie/${params.movieid}/videos?api_key=${key}`;

  {
    /* fetch do filme selecionado e dos trailer desse filme */
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieFetch = await axios.get(fetchUrlMovie);
        setMovie(movieFetch.data);

        const movieTrailer = await axios.get(fetchUrlMovieTrailer);
        setMovieTrailer(movieTrailer.data);

        console.log(movieTrailer.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [fetchUrlMovie]);

  /* saber qual é a key do primeiro trailer que aparece no fetch dos trailer do filme selecionado  */
  const trailerKey = movieTrailer?.results?.find(
    (item) => item.type === "Trailer"
  )?.key;

  return (
    <div className="max-w-screen-xl relative m-auto top-[100px] px-4 ">
      {/* Movie Details  */}
      <div className="w-full flex flex-col">
        <div className="flex w-full flex-col items-center md:flex-row md:justify-between">
          <div className="w-full md:w-[40%]">
            <img
              className="w-full"
              src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
              alt="imagem foda-se"
            />
          </div>
          <div className="w-full md:w-[40%] mt-4">
            <p className="text-white font-bold my-2">
              Title: {movie?.original_title}
            </p>
            <p className="text-white font-bold my-2">
              Release Date: {movie?.release_date}
            </p>
            <p className="text-white font-bold my-2">
              Duration: {movie?.runtime} mins
            </p>
            <p>imdb pontuação</p>
          </div>
        </div>
        <div className="mt-10  ">
          <p className="text-white">{movie?.overview}</p>
          {/* trailer */}
          <div className="">
            {trailerKey && (
              <div className="mt-10 ">
                <iframe
                  className="w-full h-[400px] m-auto md:w-[50%]"
                  src={`https://www.youtube.com/embed/${trailerKey}`}
                  title="Movie Trailer"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Similar Movies */}
    </div>
  );
}

export default MovieDetails;
