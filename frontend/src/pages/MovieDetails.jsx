import React, { useEffect, useState } from "react";

const API_KEY = "5748ec37102cbffe86554dfaefefb381";

function MovieDetails({ movieId, onClose }) {
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    // Fetch movie details
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos,credits`)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        setCast(data.credits?.cast?.slice(0, 5) || []);
        const trailerVideo = data.videos?.results?.find(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        );
        setTrailer(trailerVideo?.key || null);
      })
      .catch(console.error);
  }, [movieId]);

  if (!movie) return null;

  return (
    <div className="details-overlay">
      <div className="details-box">
        <button className="close-btn" onClick={onClose}>✖</button>
        <div className="details-content">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="details-poster"
          />
          <div className="details-info">
            <h2>{movie.title}</h2>
            <p><strong>Release Date:</strong> {movie.release_date}</p>
            <p><strong>Genres:</strong> {movie.genres.map(g => g.name).join(", ")}</p>
            <p><strong>Overview:</strong> {movie.overview}</p>
            <p><strong>Cast:</strong> {cast.map(a => a.name).join(", ")}</p>
            {trailer && (
              <a
                href={`https://www.youtube.com/watch?v=${trailer}`}
                target="_blank"
                rel="noopener noreferrer"
                className="trailer-link"
              >
                🎞 Watch Trailer
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
