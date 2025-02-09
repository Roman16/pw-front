import React, {Fragment, useState} from "react";
import {Input, Table} from "antd";

const OptimizationJobs = ({data, onCheck, onCheckChanges, onCheckConditions, userId}) => {
    const [fields, setFields] = useState({});

    const changeFieldHandler = (e) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    };

    const checkOptimizationJobs = (e) => {
        e.preventDefault();

        onCheck({
            type: fields.marketplace_id && 'marketplace',
            userId: fields.user_id || userId,
            marketplaceId: fields.marketplace_id,
            asin: fields.asin,
            sku: fields.sku
        })
    };

    const optimizationJobsColumns = [
        {
            title: 'Product',
            dataIndex: 'product',
            key: 'product',
            render: (product, item) => (<div className={'product'}>
                <img src={item.product.product_image} alt=""/>
                <span>{item.product.product_name}</span>
            </div>)
        },
        {
            title: 'Product ID',
            dataIndex: 'product_id',
            key: 'product_id',
        },
        {
            title: 'ASIN',
            dataIndex: 'asin',
            key: 'asin',
            render: (asin, item) => (item.product.asin)
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
            key: 'sku',
            render: (sku, item) => (item.product.sku)
        },
        {
            title: 'Marketplace ID',
            dataIndex: 'marketplace_id',
            key: 'marketplace_id',
            render: (marketplace_id, item) => (item.product.marketplace_id)
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Optimization Strategy',
            dataIndex: 'optimization_strategy',
            key: 'optimization_strategy',
        },
        {
            title: 'Product Net Margin',
            dataIndex: 'product_margin',
            key: 'product_margin',
            render: (margin, item) => (item.product.product_margin)
        },
        {
            title: 'Product Price',
            dataIndex: 'price',
            key: 'price',
            render: (margin, item) => (item.product.item_price)
        },
        {
            title: '',
            dataIndex: 'action',
            key: 'action',
            width: '175px',
            render: (action, item) => (
                <div className={'actions'}>
                    <button
                        className={'btn default'}
                        onClick={() => onCheckChanges(item.product.id, item.product.asin, item.product.marketplace_id)}
                    >
                        Check changes
                    </button>
                    <button
                        className={'btn default'}
                        onClick={() => onCheckConditions({sku: item.product.sku})}
                    >
                        Check conditions
                    </button>
                </div>)
        }
    ];

    const variationsRender = (variations) => {

        const columns = [
            {
                title: 'Product',
                dataIndex: 'product',
                key: 'product',
                width: '350px',
                render: (product, item) => (<div className={'product'}>
                    <img src={item.product_image} alt=""/>
                    <span>{item.product_name}</span>
                </div>)
            },
            {
                title: 'Product ID',
                dataIndex: 'id',
                key: 'id',
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
                title: 'Status on Amazon',
                dataIndex: 'status_on_amazon',
                key: 'status_on_amazon',
            },
        ];

        return (<Table
            dataSource={variations}
            columns={columns}
            pagination={false}
            scroll={{x: true}}
        />)
    }

    return (
        <section className="optimization-jobs-section">
            <h2>Optimization Jobs</h2>
            <div className="fields">
                <form className="form-group" onSubmit={checkOptimizationJobs}>
                    <Input
                        type="text"
                        name={'user_id'}
                        onChange={changeFieldHandler}
                        placeholder={userId ? `User id: ${userId}` : `User id`}
                    />

                    <Input
                        type="text"
                        placeholder={`Marketplace id`}
                        name={'marketplace_id'}
                        onChange={changeFieldHandler}
                    />
                    <span className={'or'}>+</span>
                    <Input
                        type="text"
                        placeholder={`SKU`}
                        name={'sku'}
                        onChange={changeFieldHandler}
                    />
                    <span className={'or'}>or</span>
                    <Input
                        type="text"
                        placeholder={`ASIN`}
                        name={'asin'}
                        onChange={changeFieldHandler}
                    />

                    <button className={'btn default'}>Check</button>
                </form>
            </div>

            {typeof data === 'string' && <h2>{data}</h2>}
            {typeof data === 'object' && <Table
                dataSource={data}
                columns={optimizationJobsColumns}
                pagination={false}
                scroll={{x: true}}
                className="components-table-demo-nested"
                rowClassName={record => record.product.variations.length === 0 && 'hide-button'}
                expandedRowRender={record => variationsRender(record.product.variations)}
            />}
        </section>
    )
};

export default OptimizationJobs;