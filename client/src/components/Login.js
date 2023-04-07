
import { Component } from "react";
import Axios from "axios";
// import "./styles/style.css";


function Login() {
  
	return (
		<div className="Login">
				<div class="container">
					<label><b>Username</b></label>
					<input type="text" placeholder="Enter Username" name="uname" required/>

					<label><b>Password</b></label>
					<input type="password" placeholder="Enter Password" name="psw" required/>

					<button type="submit">Login</button>
				</div>
				<hr/>
				<div class="container">
					<button type="button" >Roster form</button>
				</div>
		</div>

	);
}

export default Login;