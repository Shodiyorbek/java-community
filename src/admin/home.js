import React, {Component} from 'react';
import "./home.css"
import AddCatigory from "./article/add-category";

class Home extends Component {
    render() {
        return (
            <div className="continer">
                <div className="nav">
                    <div className="logo"></div>
                    <div className="user"></div>
                </div>
                <div className="main-container">
                   <AddCatigory/>
                    <div className="right-side">

                    </div>
                </div>
            </div>
        );
    }
}

export default Home;