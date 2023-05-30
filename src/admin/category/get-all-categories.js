import React, {useEffect, useState} from "react";
import axios from "axios";
import headerTokenRequest from "../../headerTokenRequest";
import {Menu} from "antd";
// import "./style.css"
import SubMenu from "antd/es/menu/SubMenu";

export const GetAllCategories = ({setID}) => {
    const [items, setItems] = useState([])

    useEffect(() => {
        try {
            axios
                .get("http://localhost:8080/category", {
                    headers: headerTokenRequest()
                }).then((res) => {
                setItems(convertJsonToJsMenuObject(res.data))
            });
        } catch (err) {
            console.error(JSON.stringify(err))
        }
    }, []);

    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }

    function convertJsonToJsMenuObject(categories) {

        if (categories !== undefined) {
            return Array.from(categories).map((category) => {
                if (category.articles !== undefined) {

                    category.articles.map((article) => {
                        return getItem(article.name, article.id, "", [], "")
                    });
                    return getItem(category.name, category.id, "", convertJsonToJsMenuObject(category.subCategories), "")
                }
            })
        }
    }

    const onClick = (id) => {
        setID(id)
        console.log('click ', id);
    };

    function renderMenuItems(menuItems) {
        return menuItems.map(item => {
            if (item.children !== undefined) {
                return (
                    <SubMenu key={item.key} title={<div onClick={() => onClick(item.key)}>{item.label}</div>}>
                        {renderMenuItems(item.children)}
                    </SubMenu>
                );
            }
            return (
                <Menu.Item onClick={() => onClick(item.key)} key={item.key}>{item.label}</Menu.Item>
            );
        });
    }

    return <div>
        <div className={"alls"}>
            <div className={"container-main"}>
                <Menu
                    style={{width: 256}}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                >
                    {renderMenuItems(items)}
                </Menu>
            </div>
        </div>
    </div>
}