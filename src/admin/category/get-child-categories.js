import axios from "axios";
import headerTokenRequest from "../../headerTokenRequest";
import {useEffect, useState} from "react";
import {Table} from "antd";

const columns = [
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'createdDate',
        dataIndex: 'createdDate',
        key: 'createdDate',
    },
    {
        title: 'modifiedDate',
        dataIndex: 'modifiedDate',
        key: 'modifiedDate',
    },
    {
        title: 'createdBy',
        dataIndex: 'createdBy',
        key: 'createdBy',
    },
    {
        title: 'modifiedBy',
        dataIndex: 'modifiedBy',
        key: 'modifiedBy',
    }
];

function GetChildCategories({id}) {
    const [items, setItems] = useState({});
    useEffect(() => {
        try {
            axios
                .get("http://localhost:8080/category/getAllChild/" + id, {
                    headers: headerTokenRequest()
                }).then((res) => {
                 setItems(res.data)
            });
        } catch (err) {
            console.error(JSON.stringify(err))
        }

    }, [])
    return <div>
        <Table dataSource={items.subCategories} columns={columns}/>;
    </div>
}

export default GetChildCategories;