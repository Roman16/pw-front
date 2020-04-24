import React from "react";
import {Table} from "antd";

const OptimizationCondition = ({data}) => {
    const columns = [
        {
            title: 'SKU',
            dataIndex: 'sku',
            key: 'sku',
            render: (sku, item) => (item.data[0])
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        }
    ];

    return (
        <section>
            {typeof data === 'string' && <h2>{data}</h2>}
            {typeof data === 'object' && <Table
                dataSource={data}
                columns={columns}
                pagination={false}
                title={() => 'Optimization Conditions'}
            />}
        </section>
    )
};

export default OptimizationCondition;