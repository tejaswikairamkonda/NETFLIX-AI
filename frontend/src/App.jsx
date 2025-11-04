import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import TopActors from "./pages/TopActors";
import Profile from "./pages/Profile";
import Chatbot from "./components/Chatbot";
import "./style.css";

const Intro = ({ onDone }) => {
  useEffect(() => {
    const audio = new Audio("/intro.mp3");
    audio.volume = 1.0;

    // 🧠 Smart autoplay retry system (works in most browsers)
    let attempts = 0;
    const tryPlay = () => {
      audio
        .play()
        .then(() => {
          console.log("✅ Intro audio played successfully");
        })
        .catch(() => {
          attempts++;
          if (attempts < 5) {
            setTimeout(tryPlay, 700); // retry a few times
          } else {
            console.warn("⚠️ Autoplay blocked. User interaction required once.");
          }
        });
    };
    tryPlay();

    const timer = setTimeout(onDone, 4000); // show intro for 4 seconds
    return () => {
      clearTimeout(timer);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [onDone]);

  return (
    <div className="intro-container">
      <video
        autoPlay
        muted
        playsInline
        className="intro-video fullscreen-zoom"
        onEnded={onDone}
      >
        <source src="/logo.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // always play intro on page load or refresh
    setShowIntro(true);
  }, []);

  const handleIntroDone = () => setShowIntro(false);

  if (showIntro) return <Intro onDone={handleIntroDone} />;

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/top-actors" element={<TopActors />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Chatbot />
    </>
  );
}

export default App;
