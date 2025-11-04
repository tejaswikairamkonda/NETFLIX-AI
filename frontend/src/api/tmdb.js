// src/api/tmdb.js
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE = import.meta.env.VITE_TMDB_BASE || "https://api.themoviedb.org/3";
const IMG = import.meta.env.VITE_IMAGE_BASE || "https://image.tmdb.org/t/p/w500";

function buildURL(path, params = {}) {
  const url = new URL(`${BASE}${path}`);
  url.searchParams.set("api_key", API_KEY);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, v);
  });
  return url.toString();
}

export const imageUrl = (path) => (path ? `${IMG}${path}` : "/placeholder.png");

export async function fetchTMDBPath(path, params) {
  const url = buildURL(path, params);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

export const getPopular = (page = 1) => fetchTMDBPath("/movie/popular", { page });
export const getTrending = (media = "movie", time = "week") => fetchTMDBPath(`/trending/${media}/${time}`);
export const searchMovie = (query, page = 1) => fetchTMDBPath("/search/movie", { query, page });
export const getGenres = () => fetchTMDBPath("/genre/movie/list");
export const discoverByGenre = (genreId, page = 1) => fetchTMDBPath("/discover/movie", { with_genres: genreId, page });
export const discoverByLanguage = (lang, page = 1) => fetchTMDBPath("/discover/movie", { with_original_language: lang, page });
export const getMovieDetails = (id) => fetchTMDBPath(`/movie/${id}`, { append_to_response: "videos,credits,reviews" });
export const getPopularPeople = (page = 1) => fetchTMDBPath("/person/popular", { page });
export const getPerson = (id) => fetchTMDBPath(`/person/${id}`, { append_to_response: "movie_credits" });
