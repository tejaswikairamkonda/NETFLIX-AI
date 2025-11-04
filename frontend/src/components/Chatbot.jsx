import React, { useState } from "react";
import "./Chatbot.css";

const API_KEY = "5748ec37102cbffe86554dfaefefb381";

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi! I’m your Netflix AI Bot. Ask me for Action, Comedy, Horror, or any movie suggestions!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setInput("");
    setLoading(true);

    let reply = "";

    // Identify genres from user message
    const lower = userMsg.toLowerCase();
    let genreId = null;
    if (lower.includes("action")) genreId = 28;
    else if (lower.includes("comedy")) genreId = 35;
    else if (lower.includes("romance")) genreId = 10749;
    else if (lower.includes("drama")) genreId = 18;
    else if (lower.includes("horror")) genreId = 27;

    try {
      if (genreId) {
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc`
        );
        const data = await res.json();
        const top = data.results.slice(0, 5);
        reply = `Here are some ${lower} movies you’ll love:\n🎬 ${top
          .map((m) => m.title)
          .join("\n🎬 ")}`;
      } else {
        reply =
          "Hmm 🤔 I can suggest Action, Comedy, Horror, Romance, or Drama movies. Try asking like 'Show me action movies'.";
      }
    } catch (err) {
      reply = "⚠️ Oops! I couldn't fetch movies right now. Try again later.";
    }

    setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    setLoading(false);
  };

  return (
    <div className="chatbot">
      <div className="chatbot-icon" onClick={() => setOpen(!open)}>
        💬
      </div>

      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>Netflix AI Bot</h3>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`msg ${msg.sender}`}>
                {msg.text.split("\n").map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
            ))}
            {loading && <p className="bot">Typing...</p>}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask for a movie..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
