import React from 'react';
import "./home.css"
import {GetCategory} from "./category/get-category";
import AddCategory from "./category/add-category";

function Home() {
    const [id, setID] = React.useState();

    return (
            <div className="continer">
                <div className="nav">
                    <div className="logo"></div>
                    <div className="user"></div>
                </div>
                <div className="main-container">
                    <div className="left-side">
                        <GetCategory setID={setID}/>
                    </div>
                    <div className="right-side">
                        <AddCategory id={id} />
                    </div>
                </div>
            </div>
        );
}

export default Home;