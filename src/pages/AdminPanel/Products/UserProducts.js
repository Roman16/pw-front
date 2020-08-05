import React from "react";
import {Table} from "antd";

const testData = [
    {
        id: 322,
        asin: 'EWNDMDM',
        sku: 'NDNDDD',
        status: true
    },
    {
        id: 322,
        asin: 'EWNDMDM',
        sku: 'NDNDDD',
        status: false
    },
]

const UserProducts = ({data}) => {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '100px',
        },
        {
            title: 'ASIN',
            dataIndex: 'asin',
            key: 'asin',
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
            key: 'sku',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status, product) => (
                status ?
                    <button className={'btn default'}>Delete</button>
                    :
                    <button className={'btn default'}>Add</button>
            )
        },
    ]

    return (
        <section className={'user-products-section'}>
            <h2>User Products</h2>

            <Table
                dataSource={testData}
                columns={columns}
                pagination={false}
            />
        </section>
    )
};

export default UserProducts;