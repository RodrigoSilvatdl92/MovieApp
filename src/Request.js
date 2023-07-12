export const key = "e74103383da6da67898c755c28063954";

const requests = {
  popular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
  top_rated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
  upcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
  similarMovies: `https://api.themoviedb.org/3/movie/{movie_id}/similar?api_key=${key}&language=en-US&page=1`,
  genre: `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`,
  moviedetails: `https://api.themoviedb.org/3/movie/{movie_id}?api_key=${key}&language=en-US`,
};

export default requests;
