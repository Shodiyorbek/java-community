import React, { useState } from "react";
import axios from "axios";


const Register = () => {
    const [user, setUser] = useState({
        username:"",
        password:"",
        age:"",
        info:"",
        roles:["admin"]
    });
    const [error, setError] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .post("http://localhost:8080/user",user)
            .then((response) => {
                localStorage.setItem("token", response.data.token);
                window.location.href = "/";
            })
            .catch((error) => {
                setError("Failed to register.");
            });
    };
    const handleInputChange = (e)=>{
        setUser({
                ...user,
                [e.target.name]:e.target.value,
        }
        )
    }

    return (
        <div className={"container1"}>
            <div className="wrapper">
                <form onSubmit={handleSubmit} className="form-signin">
                    <h2 className="form-signin-heading">Please Register</h2>
                    <input onChange={handleInputChange} type="text" className="form-control" name="username" placeholder="Username" required="" autoFocus=""></input>
                    <input onChange={handleInputChange} type="text" className="form-control" name="password" placeholder="Password" required="" autoFocus=""></input>
                    <input onChange={handleInputChange} type="text" className="form-control" name="age" placeholder="Age" required="" autoFocus=""></input>
                    <input onChange={handleInputChange} type="text" className="form-control" name="info" placeholder="Info" required=""></input>
                    <a href={"/"}>Login</a>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
