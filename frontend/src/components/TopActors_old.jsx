// src/components/TopActors.jsx
import React from "react";
import "./TopActors.css";

const topActors = [
  {
    id: 1,
    name: "Leonardo DiCaprio",
    image: "/images/leonardo.jpg",
    movies: ["Inception", "Titanic"],
  },
  {
    id: 2,
    name: "Scarlett Johansson",
    image: "/images/scarlett.jpg",
    movies: ["Lucy", "Black Widow"],
  },
  {
    id: 3,
    name: "Tom Cruise",
    image: "/images/tomcruise.jpg",
    movies: ["Mission Impossible", "Top Gun"],
  },
  {
    id: 4,
    name: "Robert Downey Jr.",
    image: "/images/rdj.jpg",
    movies: ["Iron Man", "Sherlock Holmes"],
  },
];

function TopActors() {
  return (
    <div className="top-actors">
      <h2>Top Actors</h2>
      <div className="actor-grid">
        {topActors.map((actor) => (
          <div key={actor.id} className="actor-card">
            <img src={actor.image} alt={actor.name} className="actor-image" />
            <h3>{actor.name}</h3>
            <p>{actor.movies.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopActors;
