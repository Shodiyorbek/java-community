import {Modal} from "antd";
import React, {useState} from "react";
import axios from "axios";
import headerTokenRequest from "../../headerTokenRequest";

function AddArticle({id: categoryID}) {
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const string = localStorage.getItem("token");
    const [visible, setVisible] = useState(false);
    const [id, setId] = useState({});

    const handleInputChange = (e) => {
        setName(e.target.value);
    };
    const onOkItSelf = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8080/article/", {categoryId: categoryID, name: name}, {
                headers: headerTokenRequest(),
            })
            .then((response) => {
                handleOk();
            })
            .catch((error) => {
                setError("Failed to register.");
            });
    };
    const handleOk = () => {
        console.log("clicked ok");
        setVisible(false);
    };

    const handleCancel = () => {
        console.log("clicked cancel");
        setVisible(false);
    };

    const showModal = () => {
        setVisible(true);
    };
    return <>
        <button
            className={"btn btn-outline-primary"}
            onClick={() => showModal()}
            type={"button"}
        >
            Add Article
        </button>
        <Modal
            title="Basic Modal"
            open={visible}
            onOk={onOkItSelf}
            onCancel={handleCancel}
        >
            <div className="form-group">
                <label htmlFor="">Article name</label>
                <input
                    className="form-control"
                    onChange={handleInputChange}
                    name="file"
                />
            </div>
        </Modal>
    </>
}

export default AddArticle;