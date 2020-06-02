import React from "react";
import CustomTable from "../../../components/Table/CustomTable";
import {Input} from "antd";
import moment from "moment";
import Pagination from "../../../components/Pagination/Pagination";

const ProductsList = ({productsList, selectedTab}) => {

    const defaultColumns = [
        {
            title: 'Product Name',
            dataIndex: 'id',
            key: 'id',
            width: '500px',
            render: (id, product) => (
                <div className='product-block'>
                    <div className="image">
                        <img src={product.image_url} alt=""/>
                    </div>

                    <div className="col">
                        <div className="name">
                            {product.name}
                        </div>

                        <div className="row">
                            <span className='price'>$35.99</span>
                            <span className='stock'>In Stock</span>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            width: '150px',
            render: (date) => (
                <div className='date-field'>
                    {moment(date).format('DD MMM YYYY')}
                </div>
            )
        },
        {
            title: 'ASIN',
            dataIndex: 'asin',
            key: 'asin',
            minWidth: '150px',
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
            key: 'sku',
            minWidth: '150px',
        }
    ];
    const columns = {
        'zth-products': [
            ...defaultColumns,
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                minWidth: '200px',
                render: (status) => (
                    /*  <div className="status-field loading">
                          <div />
                          <span>Loading ...</span>
                      </div>*/

                    <div className="status-field created">
                        <div/>
                        <span>Created</span>
                    </div>
                )
            },
            {
                title: 'Problems',
                dataIndex: 'problems',
                key: 'problems',
                minWidth: '150px',
            },
            {
                title: 'Campaign Type',
                dataIndex: 'campaign_type',
                key: 'campaign_type',
                minWidth: '150px',
            },
            {
                title: 'PPC Automate Status',
                dataIndex: 'optimization_status',
                key: 'optimization_status',
                minWidth: '200px',
                render: (status) => (
                    <div className="optimization-field">
                        <button className='btn green-btn'>Start</button>
                    </div>
                )
            },
        ],
        'other-products': [
            ...defaultColumns,
            {
                title: 'Zero To Hero Status',
                dataIndex: 'zth_status',
                key: 'zth_status',
                render: (status) => (
                    <div className="zth-status-field">
                        <button className='btn default'>Start</button>
                    </div>
                )
            },
            {
                title: 'Optimization Status',
                dataIndex: 'optimization_status',
                key: 'optimization_status',
                render: (status) => (
                    <div className="optimization-field">
                        <button className='btn green-btn'>Start</button>
                    </div>
                )
            },
        ]
    };

    return (
        <>
            <CustomTable
                rowKey="id"
                dataSource={productsList}
                columns={columns[selectedTab]}
            />

            <Pagination
                // onChange={() => {}}
                page={1}
                pageSizeOptions={[10, 25, 50]}
                pageSize={10}
                totalSize={0}
                listLength={productsList.length}
                processing={false}
            />
        </>
    )
};

export default ProductsList;