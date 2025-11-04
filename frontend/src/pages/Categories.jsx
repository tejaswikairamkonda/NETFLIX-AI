// src/pages/Categories.jsx
import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";  // ✅ fixed import path
import "./Categories.css";

const API_KEY = "5748ec37102cbffe86554dfaefefb381";

function Categories() {
  const [genre, setGenre] = useState("28");
  const [language, setLanguage] = useState("en");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genre}&language=${language}`
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results || []))
      .catch(console.error);
  }, [genre, language]);

  return (
    <div className="categories-container">
      <h2 className="title">🎬 Select Your Interest</h2>

      <div className="filters">
        <div className="dropdown">
          <label>Genre:</label>
          <select onChange={(e) => setGenre(e.target.value)}>
            <option value="28">Action</option>
            <option value="35">Comedy</option>
            <option value="18">Drama</option>
            <option value="27">Horror</option>
            <option value="10749">Romance</option>
            <option value="878">Sci-Fi</option>
          </select>
        </div>

        <div className="dropdown">
          <label>Language:</label>
          <select onChange={(e) => setLanguage(e.target.value)}>
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="te">Telugu</option>
            <option value="ta">Tamil</option>
            <option value="ml">Malayalam</option>
          </select>
        </div>
      </div>

      <div className="movies-grid">
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
    </div>
  );
}

export default Categories;
