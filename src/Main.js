import React, {useEffect, useState} from "react";
import axios from "axios";


const Main = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState("");


    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     console.log(token);
    //
    //     const source = axios.CancelToken.source();
    //
    //     axios.get("http://localhost:8080/user/current", {
    //         headers: { 'Authorization': `Bearer ${token}` },
    //         cancelToken: source.token
    //     })
    //         .then((response) => {
    //             setUser(response.data);
    //         })
    //         .catch((error) => {
    //             if (!axios.isCancel(error)) {
    //                 setError("Failed to register.");
    //             }
    //         });
    //
    //     return () => {
    //         source.cancel();
    //     };
    // }, []




// )
const handleOk = ()=>{
        const token = localStorage.getItem('token');
        console.log(token);

        const source = axios.CancelToken.source();

        axios.get("http://localhost:8080/user/current", {
            headers: { 'Authorization': `Bearer ${token}` },
            cancelToken: source.token
        })
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                if (!axios.isCancel(error)) {
                    setError("Failed to register.");
                }
            });
    }

    return (
        <div className={"container"}>
<button className={"btn btn-danger"} onClick={handleOk}>Hello</button>
        </div>
    );
};

export default Main;
