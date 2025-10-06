import React from "react";
import "./Page.css";

function Home() {
  const location=useLocation()
  let 
  return (
    <div className="page">
      <h1>Hello {location.state.id}! Welcome to ASL Translator</h1>
      <p>Learn, practice, and quiz yourself on ASL signs.</p>
    </div>
  );
}

export default Home;
