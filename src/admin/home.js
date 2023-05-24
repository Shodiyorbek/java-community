import React from 'react';
import "./home.css"
import {GetAllCategories} from "./category/get-all-categories";
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
                        <GetAllCategories setID={setID}/>
                    </div>
                    <div className="right-side">
                        <AddCategory id={id} />
                    </div>
                </div>
            </div>
        );
}

export default Home;