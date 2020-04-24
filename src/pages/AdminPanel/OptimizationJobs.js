import React, {useState} from "react";
import {Input, Table} from "antd";

const OptimizationJobs = ({data, onCheck, onCheckChanges, onCheckConditions}) => {
    const [fields, setFields] = useState({});


    const changeFieldHandler = (e) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    };

    const checkOptimizationJobsByUserId = (e) => {
        e.preventDefault();

        onCheck({userId: fields.user_id})
    };

    const checkOptimizationJobsByMarketplaceId = (e) => {
        e.preventDefault();

        onCheck({
            type: 'marketplace',
            userId: fields.user_id,
            marketplaceId: fields.marketplace_id,
            asin: fields.asin,
            sku: fields.sku
        })
    };

    const optimizationJobsColumns = [
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
            render: (action, item) => (<button className={'btn default'}
                                               onClick={() => onCheckChanges(item.product.id, item.product.asin, item.product.marketplace_id)}>
                Check changes
            </button>)
        },
        {
            title: '',
            dataIndex: 'action2',
            key: 'action2',
            render: (action, item) => (
                <button className={'btn default'} onClick={() => onCheckConditions(item.product.sku)}>
                    Check conditions
                </button>)
        },
    ];

    return (
        <section className="optimization-jobs-section">
            <div className="fields">
                <form className="form-group" onSubmit={checkOptimizationJobsByUserId}>
                    <Input
                        required
                        type="text"
                        placeholder={`User id`}
                        name={'user_id'}
                        onChange={changeFieldHandler}
                    />
                    <button className={'btn default'}>Check</button>
                </form>

                <form className="form-group" onSubmit={checkOptimizationJobsByMarketplaceId}>
                    <Input
                        required
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
                title={() => 'Optimization Jobs'}
                scroll={{x: true}}
            />}
        </section>
    )
};

export default OptimizationJobs;