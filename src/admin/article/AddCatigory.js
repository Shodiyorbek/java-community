import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Style.css";
import { Modal } from "antd";

const AddCategory = () => {
    const [category, setCategory] = useState({});
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState("");
    const string = localStorage.getItem("token");
    const [visible, setVisible] = useState(false);
    const [expandedCategories, setExpandedCategories] = useState([]);
    const [id, setId]=useState({})

    const handleInputChange = (e)=>{
        console.log(category)
        setCategory({
                parentId:id.id,
                name:e.target.value
            }
        )

    }

    const CategoryList = ({ categories, parentCategoryId }) => {
        return categories.map((category) => (
            <React.Fragment key={category.id}>
                <div className={"paragraph"}>
                    <div
                        onClick={() => handleCategoryClick(category.id)}
                        style={{ cursor: "pointer" }}
                    >
                        {category.name}
                    </div>
                    <div
                        className={"add-btn btn btn-outline-primary"}
                        onClick={() => showModal(category.id, parentCategoryId)}
                    >
                        Add child category
                    </div>
                </div>
                {expandedCategories.includes(category.id) && (
                    <div className={"main"}>
                        <CategoryList
                            categories={category.childCategoryResponseList || []}
                            parentCategoryId={category.id}
                        />
                        {category.articleResponseList?.length > 0 &&
                            category.articleResponseList.map((article) => (
                                <React.Fragment key={article.id}>
                                    {getArticleContent({
                                        article: article,
                                        parentCategoryId: category.id,
                                    })}
                                </React.Fragment>
                            ))}
                    </div>
                )}
            </React.Fragment>
        ));
    };

    const getArticleContent = ({ article, parentCategoryId }) => {
        return (
            <div>
                <h5>{article.name}</h5>
            </div>
        );
    };

    const handleCategoryClick = (categoryId) => {
        setExpandedCategories((prevExpandedCategories) => {
            if (prevExpandedCategories.includes(categoryId)) {
                // category is currently expanded, so we need to collapse it
                return prevExpandedCategories.filter(
                    (expandedCategoryId) => expandedCategoryId !== categoryId
                );
            } else {
                // category is currently collapsed, so we need to expand it
                return [...prevExpandedCategories, categoryId];
            }
        });
    };

    useEffect(() => {
        axios
            .get("http://localhost:8080/category", {
                headers: {
                    Authorization: `Bearer ${JSON.parse(string)}`,
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                setError("Failed to register.");
            });
    }, []);


    const onOkItSelf = (e) => {
        e.preventDefault();
        console.log(string)

        const token = JSON.parse(string);

        axios.post("http://localhost:8080/category", category,
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

    }
return (
    <div className={"alls"}>
        <button className={"btn btn-outline-primary"} onClick={ ()=>showModal(null,null)} type={"button"}>Add super catigory</button>
        <Modal title="Basic Modal" open={visible} onOk={onOkItSelf} onCancel={handleCancel}>
            <div className="form-group">
                <label htmlFor="">Catigory name</label>
                <input  className="form-control" onChange={handleInputChange} name="file" />
            </div>
        </Modal>
        <div  className={"container-main"}>
            <CategoryList categories={categories} />

        </div>
    </div>

)};


export default  AddCategory;