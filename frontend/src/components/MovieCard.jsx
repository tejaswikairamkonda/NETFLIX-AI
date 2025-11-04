import React, { useState } from "react";
import MovieDetails from "./MovieDetails";

function MovieCard({ movie }) {
  const [showDetails, setShowDetails] = useState(false);

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.jpg";

  return (
    <>
      <div className="movie-card" onClick={() => setShowDetails(true)}>
        <img src={imageUrl} alt={movie.title || movie.name} />
        <div className="movie-info">
          <h3>{movie.title || movie.name}</h3>
          <p>{(movie.release_date || "").slice(0, 4)}</p>
        </div>
      </div>

      {showDetails && (
        <MovieDetails movieId={movie.id} onClose={() => setShowDetails(false)} />
      )}
    </>
  );
}

export default MovieCard;
