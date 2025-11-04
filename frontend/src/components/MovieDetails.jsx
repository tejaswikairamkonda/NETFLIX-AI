// src/components/MovieDetails.jsx
import React, { useEffect, useState } from "react";
import "./MovieDetails.css";

const API_KEY = "5748ec37102cbffe86554dfaefefb381";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

function MovieDetails({ movieId, onClose }) {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const res = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    }

    if (movieId) fetchMovie();
  }, [movieId]);

  if (!movie) return null;

  return (
    <div className="movie-details-overlay" onClick={onClose}>
      <div className="movie-details" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
        <img src={IMAGE_URL + movie.poster_path} alt={movie.title} className="poster" />
        <div className="info">
          <h2>{movie.title}</h2>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Rating:</strong> {movie.vote_average}/10</p>
          <p className="overview">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
