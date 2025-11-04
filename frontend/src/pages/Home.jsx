import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import "./Home.css";

const API_KEY = "5748ec37102cbffe86554dfaefefb381";

function Home() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState("");
  const [closing, setClosing] = useState(false);
  const location = useLocation();

  // 🔍 get the search term from URL
  const query = new URLSearchParams(location.search).get("search");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let url = "";

        if (query) {
          // If searching
          url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
            query
          )}`;
        } else {
          // Otherwise show trending
          url = `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`;
        }

        const res = await fetch(url);
        const data = await res.json();
        setMovies(data.results || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovies();
  }, [query]);

  const handleMovieClick = async (movie) => {
    setSelectedMovie(movie);
    setClosing(false);

    try {
      const [castRes, trailerRes] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${API_KEY}`),
        fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}`),
      ]);

      const castData = await castRes.json();
      const trailerData = await trailerRes.json();

      setCast(castData.cast.slice(0, 5));
      const youtubeTrailer = trailerData.results.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      );
      setTrailer(
        youtubeTrailer
          ? `https://www.youtube.com/watch?v=${youtubeTrailer.key}`
          : ""
      );
    } catch (err) {
      console.error(err);
    }
  };

  const closeModal = () => {
    setClosing(true);
    setTimeout(() => {
      setSelectedMovie(null);
      setCast([]);
      setTrailer("");
      setClosing(false);
    }, 250);
  };

  return (
    <div className="home-container">
      <h2 className="section-title">
        {query ? `Search results for "${query}"` : "Trending Now"}
      </h2>

      {movies.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "50px" }}>No results found 😕</p>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="movie-click"
              onClick={() => handleMovieClick(movie)}
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}

      {selectedMovie && (
        <div
          className={`movie-modal-overlay ${closing ? "fade-out" : "fade-in"}`}
          onClick={closeModal}
        >
          <div
            className={`movie-modal ${closing ? "slide-down" : "slide-up"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
              alt={selectedMovie.title}
              className="modal-poster"
            />
            <div className="modal-details">
              <h2>{selectedMovie.title || selectedMovie.name}</h2>
              <p className="overview">{selectedMovie.overview}</p>

              <h4>Top Cast</h4>
              <ul>
                {cast.map((actor) => (
                  <li key={actor.id}>{actor.name}</li>
                ))}
              </ul>

              <div className="modal-actions">
                {trailer ? (
                  <a
                    href={trailer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="trailer-btn"
                  >
                    🎬 Watch Trailer
                  </a>
                ) : (
                  <p className="no-trailer">No trailer available</p>
                )}
              </div>
            </div>
            <button className="close-btn" onClick={closeModal}>
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
