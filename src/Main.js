import React, {useEffect, useState} from "react";
import axios from "axios";
import AddCatigory from "./AddCatigory";


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
            <AddCatigory />
        </div>
    );
};

export default Main;
