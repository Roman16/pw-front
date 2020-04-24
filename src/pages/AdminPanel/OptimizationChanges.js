import React from "react";
import {Table} from "antd";

const OptimizationChanges = ({data}) => {

    const columns = [
        {
            title: 'Product ID',
            dataIndex: 'product_id',
            key: 'product_id',
        },
        {
            title: 'Event Date',
            dataIndex: 'eventDateTime',
            key: 'eventDateTime',
        },
        {
            title: 'Count',
            dataIndex: 'count',
            key: 'count',
        }
    ];


    return(
        <section>
            {typeof data === 'string' && <h2>{data}</h2>}
            {typeof data === 'object' && <Table
                dataSource={data}
                columns={columns}
                pagination={false}
                title={() => 'Optimization Changes'}
            />}
        </section>
    )
};

export default OptimizationChanges;