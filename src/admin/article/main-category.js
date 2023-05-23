import {useEffect, useState} from "react";
import axios from "axios";
import headerTokenRequest from "../../headerTokenRequest";
import {Button, Menu} from "antd";

export const MainCategory = () => {
    const [items, setItems] = useState([])

    useEffect( () => {
        try {
            axios
                .get("http://localhost:8080/category", {
                    headers: headerTokenRequest()
                }).then((res)=>{
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
                return getItem(category.name, category.id, "", convertJsonToJsMenuObject(category.subCategories), "")
            })
        }
    }

    return <div>
        <Menu
            onClick={(...args) => console.log(args)}
            style={{width: 256}}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
        />
    </div>
}