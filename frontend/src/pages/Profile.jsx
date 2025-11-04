import React from "react";
import "./Profile.css";

function Profile() {
  const user = {
    name: "Tej",
    email: "tej.netflixai@example.com",
    plan: "Premium Ultra HD",
    joined: "March 2024",
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png",
    watchlist: [
      { id: 1, title: "Extraction", img: "/images/extraction.jpg" },
      { id: 2, title: "John Wick 4", img: "/images/johnwick.jpg" },
      { id: 3, title: "Dune 2", img: "/images/dune.jpg" },
      { id: 4, title: "The Batman", img: "/images/batman.jpg" },
    ],
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={user.avatar} alt="User Avatar" className="profile-avatar" />
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p>
            <strong>Plan:</strong> {user.plan}
          </p>
          <p>
            <strong>Member Since:</strong> {user.joined}
          </p>
          <button className="manage-btn">Manage Account</button>
        </div>
      </div>

      <div className="watchlist-section">
        <h3>My Watchlist</h3>
        <div className="watchlist-grid">
          {user.watchlist.map((movie) => (
            <div key={movie.id} className="watchlist-card">
              <img src={movie.img} alt={movie.title} />
              <h4>{movie.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
