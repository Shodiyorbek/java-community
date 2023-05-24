import {Modal} from "antd";
import React, {useState} from "react";
import axios from "axios";
import headerTokenRequest from "../../headerTokenRequest";

function AddCategory({id: categoryID}) {
    const [category, setCategory] = useState({});
    const [error, setError] = useState("");
    const string = localStorage.getItem("token");
    const [visible, setVisible] = useState(false);
    const [id, setId] = useState({});

    const handleInputChange = (e) => {
        console.log(category);
        setCategory({
            parentId: id.parentId,
            name: e.target.value,
        });
    };
    const onOkItSelf = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8080/category", category, {
                headers: headerTokenRequest(),
            })
            .then((response) => {
                handleOk();
                window.location.reload();
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

    const showModal = (id, parentId) => {
        setVisible(true);
        setId({
            parentId: parentId,
        });
    };
    return <>
        <button
            className={"btn btn-outline-primary"}
            onClick={() => showModal(null, null)}
            type={"button"}
        >
            Add super category
        </button>
        <button
            className={"btn btn-outline-primary"}
            onClick={() => showModal(null, categoryID)}
            type={"button"}
        >
            Add category
        </button>
        <Modal
            title="Basic Modal"
            open={visible}
            onOk={onOkItSelf}
            onCancel={handleCancel}
        >
            <div className="form-group">
                <label htmlFor="">Catigory name</label>
                <input
                    className="form-control"
                    onChange={handleInputChange}
                    name="file"
                />
            </div>
        </Modal>
    </>
}

export default AddCategory;