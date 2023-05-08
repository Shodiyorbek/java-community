import React, { useState } from "react";
import axios from "axios";


const Register = () => {
    const [user, setUser] = useState({
        username:"a",
        password:"1",
        age:1,
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
                window.location.reload();
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
        <div className={"container"}>
            <a href={"/"}>Login</a>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className={"form-group"}>
                    <label>Username</label>
                    <input className={"form-control"} type="text" onChange={handleInputChange} name={"username"} />
                </div>
                <div className={"form-group"}>
                    <label>Password:</label>
                    <input type={"password"} className={"form-control"} onChange={handleInputChange} name={"password"}/>
                </div>
                <div className={"form-group"}>
                    <label>Age:</label>
                    <input className={"form-control"} type={"text"} onChange={handleInputChange} name={"age"}/>
                </div>
                <div className={"form-group"}>
                    <label>Info:</label>
                    <input className={"form-control"} type={"text"} onChange={handleInputChange} name={"info"}/>
                </div>

                <button className={"btn btn-outline-primary"} type="submit">Register</button>
                {error && <div>{error}</div>}
            </form>
        </div>
    );
};

export default Register;
