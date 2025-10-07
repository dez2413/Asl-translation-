import React from "react";
import {useNavigate, useLocation} from "react-router-dom";
import "./style/Page.css";;

function Lessons() {
  const location = useLocation();
  
  return (
    <div className="page">
      <h1>Lessons</h1>
      <h2>Hello {location.state.id} </h2>
      <p>Here you will find ASL alphabet and word lessons.</p>
    </div>
  );
}

export default Lessons;