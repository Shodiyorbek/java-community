import React, {useEffect, useState} from "react";
import axios from "axios";
import './Style.css'
import {  Modal } from "antd";



const AddCatigory = () => {
    const [catigory, setCatigory] = useState({});
    const [catigories, setCatigories] =useState([])
    const [error, setError] = useState("");
    const string = localStorage.getItem('token');
    const [visible, setVisible] = useState(false);
    const [id, setId]=useState({})




    const handleInputChange = (e)=>{
        console.log(catigory)
        setCatigory({
                parentId:id.id,
                name:e.target.value
            }
        )

    }
    const CategoryList = ({ categories })=> {

        return categories.map((category) => getCategoryContent({category: category, parentCategoryId:null  }));
    };

    const getCategoryContent=({ category,parentCategoryId })=>{
        if(category !== undefined) {
            return (
                <div>
                <div className={"paragraph"}  >
                    <div>{category.name}</div>
                    <div className={"add-btn btn btn-outline-primary"} onClick={()=>showModal(category.id, parentCategoryId)} >Add child catigory</div>
                </div>
                    <div className={"main"}>
                    {category.childCategoryResponseList?.length > 0 && (
                        category.childCategoryResponseList.map(child => (
                            <React.Fragment key={child.id}>
                                {getCategoryContent({ category: child, parentCategoryId:category.id })}
                            </React.Fragment>
                        ))
                    )}

                    {category.articleResponseList?.length > 0&& (
                        category.articleResponseList.map(article => (
                            <React.Fragment key={article.id}>
                                {getArticleContent({ article:article, parentCategoryId:category.id})}
                            </React.Fragment>
                        ))
                    )}
                    </div>
                </div>
            )
        }
        return <></>;
    };

    const getArticleContent =({ article, parentCategoryId })=>{
        return (
            <div>
                <h5>{article.name}</h5>
            </div>
        );
    };


    useState(()=>{
        axios.get("http://localhost:8080/category",
            {
                headers: {
                    Authorization: `Bearer ${JSON.parse(string)}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                setCatigories(response.data)

            })
            .catch((error) => {
                setError("Failed to register.");
            })
    })
    const onOkItSelf = (e) => {
        e.preventDefault();
        console.log(string)

        const token = JSON.parse(string);

        axios.post("http://localhost:8080/category", catigory,
            {

                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                console.log("hhh")
                handleOk()
                window.location.reload()
            })
            .catch((error) => {
                setError("Failed to register.");
                console.log("ff")
            });
    };
    const handleOk = () => {
        console.log("clicked ok")
        setVisible(false)

    }

    const handleCancel = () => {
        console.log("clicked cancel")
        setVisible(false)
    }

    const showModal = (id,parentId) => {
        setVisible(true);
        setId({
            id:id,
            parentId:parentId
        })
    };
    return (
        <>
            <button className={"btn btn-outline-primary"} onClick={ ()=>showModal(null,null)} type={"button"}>Add super catigory</button>
            <Modal title="Basic Modal" open={visible} onOk={onOkItSelf} onCancel={handleCancel}>
                <div className="form-group">
                    <label htmlFor="">Catigory name</label>
                    <input  className="form-control" onChange={handleInputChange} name="file" />
                </div>
            </Modal>
            <div  className={"container-main"}>
                <CategoryList categories={catigories} />

            </div>
        </>

    );
};

export default AddCatigory;
