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

    function convertJsonToJsMenuObject(categories) {
        if (categories) {
            return Array.from(categories).map((category) => {
                let list = (category.articles  || []).map((artice) => getItem(artice.name, artice.id, "", undefined, ""))

                list = [...list, ...convertJsonToJsMenuObject(category.subCategories)];
                return getItem(category.name, category.id, "", list.length ? list : undefined, "")
            })
        }else return []
    }

    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
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
                <button>Show Sub Article Content</button>
            </div>
        </div>
    </div>
}