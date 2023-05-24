import React, {Component} from 'react';
import "./home.css"
import AddCatigory from "./category/add-category";
import {Button} from "antd";

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
                        <Button>Add Super Category</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;