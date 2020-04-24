import React from "react";
import {Table} from "antd";

const OptimizationCondition = ({data}) => {
    const columns = [
        {
            title: 'SKU',
            dataIndex: 'sku',
            key: 'sku',
            render: (sku, item) => (item.data && item.data[0])
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        }
    ];

    return (
        <section>
            <h2>Optimization Conditions</h2>
            <div className="fields"></div>
            {typeof data === 'string' && <h2>{data}</h2>}
            {typeof data === 'object' && <Table
                dataSource={data}
                columns={columns}
                pagination={false}
            />}
        </section>
    )
};

export default OptimizationCondition;