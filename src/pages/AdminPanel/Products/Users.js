import React from "react";
import {Table} from "antd";

const testData = [
    {
        id: 445,
        name: 'Test11',
        email: 'qfwef@gmail.com'
    }
]

const Users = ({data, getProducts}) => {

    const columns = [
        {
            title: 'User ID',
            dataIndex: 'id',
            key: 'id',
            width: '100px',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: '',
            dataIndex: 'action',
            key: 'action',
            render: (action, user) => (
                <button className={'btn default'} onClick={() => getProducts(user.id)}>Get products</button>
            )
        },
    ]

    return (
        <section className={'user-products-section'}>
            <h2>Agency Users</h2>
            <Table
                dataSource={testData}
                columns={columns}
                pagination={false}
            />
        </section>
    )
};

export default Users;