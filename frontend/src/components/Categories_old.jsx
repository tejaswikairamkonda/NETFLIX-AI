// src/components/Categories.jsx
import React from "react";
import MovieCard from "./MovieCard";

const categories = {
  Action: [
    { id: 1, title: "Extraction", image: "/images/extraction.jpg" },
    { id: 2, title: "John Wick", image: "/images/johnwick.jpg" },
  ],
  Comedy: [
    { id: 3, title: "The Mask", image: "/images/themask.jpg" },
    { id: 4, title: "Jumanji", image: "/images/jumanji.jpg" },
  ],
  Drama: [
    { id: 5, title: "The Shawshank Redemption", image: "/images/shawshank.jpg" },
    { id: 6, title: "Forrest Gump", image: "/images/forrestgump.jpg" },
  ],
};

function Categories() {
  return (
    <div className="categories-container">
      {Object.keys(categories).map((genre) => (
        <div key={genre} className="category-section">
          <h2>{genre}</h2>
          <div className="movies-row">
            {categories[genre].map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Categories;
