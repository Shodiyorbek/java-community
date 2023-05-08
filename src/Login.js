import React, { useState } from "react";
import axios from "axios";
import './Style.css'


const Login = () => {
    const [user, setUser] = useState({
        username:"1",
        password:"1"
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
        <div className={"container"}>
            <a href={"Register"}>Register</a>
            <h1>Login</h1>
            <form  onSubmit={handleSubmit}>
                <div className={"form-group"}>
                    <label>Username:</label>
                    <input className={"form-control"}
                        type="text"
                     onChange={handleInputChange}
                        name={"username"}
                    />
                </div>
                <div className={"form-group"}>
                    <label>Password:</label>
                    <input className={"form-control"}
                        type="password"
                        name={"password"}
                        onChange={handleInputChange}
                    />
                </div>
                <button className={"btn btn-outline-primary"} type="submit">Login</button>
                {error && <div>{error}</div>}
            </form>
        </div>
    );
};

export default Login;
