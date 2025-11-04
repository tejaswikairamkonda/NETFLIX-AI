import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      navigate(`/?search=${encodeURIComponent(e.target.value.trim())}`);
      e.target.value = "";
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-left" onClick={() => navigate("/")}>
        <h1 className="logo">
          <span className="netflix">NETFLIX</span>
          <span className="ai">AI</span>
        </h1>
      </div>

      <div className="nav-center">
        <input
          type="text"
          placeholder="Search movies, shows, or actors..."
          className="search-bar"
          onKeyDown={handleSearch}
        />
      </div>

      <div className="nav-right">
        <Link to="/categories">Categories</Link>
        <Link to="/top-actors">Top Actors</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
}

export default Navbar;
