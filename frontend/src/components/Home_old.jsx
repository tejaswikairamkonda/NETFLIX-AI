// src/components/Home.jsx
import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import "./Home.css";

const API_KEY = "5748ec37102cbffe86554dfaefefb381";
const BASE_URL = "https://api.themoviedb.org/3";

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
        const data = await res.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }

    fetchMovies();
  }, []);

  return (
    <div className="home">
      <h2>Trending Movies</h2>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Home;
