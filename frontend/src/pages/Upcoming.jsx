import React from "react";
import Navbar from "../components/Navbar";

export default function Upcoming() {
  const upcoming = [
    { title: "Pushpa 2", release: "2025", overview: "Next chapter continues." },
    { title: "KGF 3", release: "2026", overview: "Rocky returns." }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-6">Upcoming Movies</h1>
        <div className="grid gap-6">
          {upcoming.map((m) => (
            <div key={m.title} className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold">{m.title}</h2>
              <p className="text-gray-400">Release: {m.release}</p>
              <p className="mt-2">{m.overview}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
