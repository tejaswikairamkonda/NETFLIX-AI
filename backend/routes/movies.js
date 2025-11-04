const express = require("express");
const axios = require("axios");
const router = express.Router();

const TMDB_BASE = "https://api.themoviedb.org/3";
const TMDB_KEY = process.env.TMDB_API_KEY;

// 🎞️ Trending Movies
router.get("/trending", async (req, res) => {
  try {
    const response = await axios.get(`${TMDB_BASE}/trending/movie/week?api_key=${TMDB_KEY}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching trending movies" });
  }
});

// 🔍 Search Movies
router.get("/search/:query", async (req, res) => {
  try {
    const query = req.params.query;
    const response = await axios.get(`${TMDB_BASE}/search/movie?api_key=${TMDB_KEY}&query=${query}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: "Error searching movies" });
  }
});

// 🎭 Movie Details
router.get("/details/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await axios.get(
      `${TMDB_BASE}/movie/${id}?api_key=${TMDB_KEY}&append_to_response=credits,videos,reviews`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching movie details" });
  }
});

// 📅 Upcoming Movies
router.get("/upcoming", async (req, res) => {
  try {
    const response = await axios.get(`${TMDB_BASE}/movie/upcoming?api_key=${TMDB_KEY}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching upcoming movies" });
  }
});

// 🌟 Top Rated Actors
router.get("/top-actors", async (req, res) => {
  try {
    const response = await axios.get(`${TMDB_BASE}/person/popular?api_key=${TMDB_KEY}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching top actors" });
  }
});

module.exports = router;
