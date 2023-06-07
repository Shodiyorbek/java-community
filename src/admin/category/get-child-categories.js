import axios from "axios";
import headerTokenRequest from "../../headerTokenRequest";
import {useEffect, useState} from "react";
import {Button, Space, Table} from "antd";
import Column from "antd/es/table/Column";

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

    }, [id])

    function deleteCategory(id) {
        try {
            axios
                .delete("http://localhost:8080/category/" + id, {
                    headers: headerTokenRequest()
                }).then((res) => {
                window.location.reload();
            });
        } catch (err) {
            console.error(JSON.stringify(err))
        }
    }

    return <div>
        <h6>CATEGORIES</h6>
        <Table dataSource={items.subCategories}>
            <Column title="id" dataIndex="id" key="id"/>
            <Column title="name" dataIndex="name" key="name"/>
            <Column title="createdDate" dataIndex="createdDate" key="createdDate"/>
            <Column title="modifiedDate" dataIndex="modifiedDate" key="modifiedDate"/>
            <Column title="createdBy" dataIndex="createdBy" key="createdBy"/>
            <Column title="modifiedBy" dataIndex="modifiedBy" key="modifiedBy"/>
            <Column
                title="Action"
                key="action"
                render={(_, record) => (
                    <Space size="middle">
                        <Button type="primary" danger ghost onClick={() => deleteCategory(record.id)}>Delete</Button>
                        <Button type="primary" warning ghost>Update</Button>
                    </Space>
                )}
            />
        </Table>;

        <h6>ARTICLES</h6>
        <Table dataSource={items.articles}>
            <Column title="id" dataIndex="id" key="id"/>
            <Column title="name" dataIndex="name" key="name"/>
            <Column title="createdDate" dataIndex="createdDate" key="createdDate"/>
            <Column title="modifiedDate" dataIndex="modifiedDate" key="modifiedDate"/>
            <Column title="createdBy" dataIndex="createdBy" key="createdBy"/>
            <Column title="modifiedBy" dataIndex="modifiedBy" key="modifiedBy"/>
            <Column
                title="Action"
                key="action"
                render={() => (
                    <Space size="middle">
                        <Button type="primary" danger ghost>Delete</Button>
                        <Button type="primary" warning ghost>Update</Button>
                    </Space>
                )}
            />
        </Table>

    </div>
}

export default GetChildCategories;