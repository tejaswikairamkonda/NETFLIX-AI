// src/pages/TopActors.jsx
import React, { useEffect, useState } from "react";
import "./TopActors.css";

const API_KEY = "5748ec37102cbffe86554dfaefefb381";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w300";

function TopActors() {
  const [actors, setActors] = useState([]);
  const [selectedActor, setSelectedActor] = useState(null);
  const [movies, setMovies] = useState([]);

  // Fetch top actors
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setActors(data.results || []))
      .catch(console.error);
  }, []);

  // When actor clicked — fetch their movies
  const handleActorClick = (actor) => {
    setSelectedActor(actor);
    fetch(`https://api.themoviedb.org/3/person/${actor.id}/movie_credits?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setMovies(data.cast || []))
      .catch(console.error);
  };

  const closePopup = () => {
    setSelectedActor(null);
    setMovies([]);
  };

  return (
    <div className="actors-container">
      <h2 className="section-title">Top Actors</h2>
      <div className="actors-grid">
        {actors.map((actor) => (
          <div
            key={actor.id}
            className="actor-card"
            onClick={() => handleActorClick(actor)}
          >
            <img
              src={
                actor.profile_path
                  ? `${IMAGE_BASE}${actor.profile_path}`
                  : "https://via.placeholder.com/300x450?text=No+Image"
              }
              alt={actor.name}
            />
            <h3>{actor.name}</h3>
          </div>
        ))}
      </div>

      {/* Popup for selected actor */}
      {selectedActor && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closePopup}>
              ✖
            </button>
            <h2>{selectedActor.name}'s Movies</h2>
            <div className="movies-popup-grid">
              {movies.length > 0 ? (
                movies.slice(0, 10).map((movie) => (
                  <div key={movie.id} className="movie-popup-card">
                    <img
                      src={
                        movie.poster_path
                          ? `${IMAGE_BASE}${movie.poster_path}`
                          : "https://via.placeholder.com/200x300?text=No+Poster"
                      }
                      alt={movie.title}
                    />
                    <h4>{movie.title}</h4>
                    <p className="overview">
                      {movie.overview
                        ? movie.overview.slice(0, 100) + "..."
                        : "No description available."}
                    </p>
                    {movie.id && (
                      <a
                        href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                          movie.title + " trailer"
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="trailer-link"
                      >
                        🎬 Watch Trailer
                      </a>
                    )}
                  </div>
                ))
              ) : (
                <p>No movies found for this actor.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TopActors;
