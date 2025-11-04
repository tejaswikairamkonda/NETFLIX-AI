import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import introSound from "../assets/netflix_intro.mp3";
import logo from "../assets/netflix_logo.png";

const Intro = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const audio = new Audio(introSound);
    audio.play();

    const timer = setTimeout(() => {
      navigate("/home");
    }, 4500); // after 4.5s → Home

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <img src={logo} alt="Netflix Intro" className="w-48 animate-pulse" />
    </div>
  );
};

export default Intro;
