import React from "react";
import "./Page.css";
import "./login.css";
import { Link } from "react-router-dom";

// import user_icon from "../assets/user.png";
import email_icon from "../assets/email.png";
import passwaord_icon from "../assets/password.png";

function Login() {

  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  async function submit(e){
    e.preventDefault();

    try{
      await axios.post("mongodb+srv://jubjub632_db_user:MAxn3eRWMDwmR4o@asldatabase.9sn35at.mongodb.net/?retryWrites=true&w=majority&appName=ASLDatabase"),{
        email,password
      })
    } catch(e){
      console.log(e);
    }
  
  return (
    <div className="container">
      <div className="header">
        <div className ="text"> Login</div>
        <div className="Underline"></div>
      </div>
      <div className = "inputs">
        <div className = "input">
            <img src={email_icon} alt=""/>
            <input type="email" onChange={(e)=>(setEmail(e.target.value))} placeholder="Email" />
        </div>
        <div className = "input">
            <img src={passwaord_icon} alt=""/>
            <input type="password" onChange={(e)=>(setPassword(e.target.value))} placeholder="Password" />
        </div>
          <input type="submit" onClick={submit}/>

          </form>

          <br />
          <p>OR</p>
          <br />

          <Link to="/sign"></Link>Sign
      </div>
      <div className= "forgot-password">Lost Password? <span>Click Here!</span></div>
      <div className ="submit-container">
        <Link to="/sign" className="submit">Sign Up</Link>
        <Link to="/login" className="submit">Login</Link>
      </div>
    </div>
  );
}

export default Login;
