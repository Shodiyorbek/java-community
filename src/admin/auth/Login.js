import React, { useState } from "react";
import axios from "axios";
import './auth.css'


const Login = () => {
    const [user, setUser] = useState({
        username:"",
        password:""
    });
    const [error, setError] = useState("");

    const handleSubmit = (event) => {
        console.log(user)
        event.preventDefault();

        axios
            .post("http://localhost:8080/user/login",user )
            .then((response) => {
                const token = response.data.token
                localStorage.setItem('token', JSON.stringify(token));
                window.location.href = "/main";
            })
            .catch((error) => {
                setError("Invalid email or password.");
            });
    };
    const handleInputChange = (e)=>{
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }

    return (
        <div className={"container1"}>
            <div className="wrapper">
                <form onSubmit={handleSubmit} className="form-signin">
                    <h2 className="form-signin-heading">Please login</h2>
                    <input onChange={handleInputChange} type="text" className="form-control" name="username" placeholder="Username" required="" autoFocus=""></input>
                    <input onChange={handleInputChange} type="password" className="form-control" name="password" placeholder="Password" required=""></input>
                    <a href={"/Register"}>Register</a>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
