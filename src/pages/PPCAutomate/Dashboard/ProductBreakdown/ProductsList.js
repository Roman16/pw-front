import React from "react";
import {Input} from "antd";
import Tooltip from '../../../../components/Tooltip/Tooltip';
import Table from "../../../../components/Table/Table";
import ProductItem from "../../../../components/ProductList/ProductItem";
import upGreenIcon from '../../../../assets/img/icons/metric-arrows/up-green-arrow.svg';
import downBlackIcon from '../../../../assets/img/icons/metric-arrows/down-black-arrow.svg';

import upWhiteIcon from "../../../../assets/img/icons/metric-arrows/up-white-arrow.svg";
import downWhiteIcon from "../../../../assets/img/icons/metric-arrows/down-white-arrow.svg";

const RenderPramsChanges = (key, product) => {
    const value = product[key];

    return (
        <div className='product-metric-changes up'>
            {value >= 25 && <div className='upward-changes'>
                {value}
                <img src={upWhiteIcon} alt=""/>
            </div>}
            {(value > 0 && value < 25) && <div className='up-changes'>
                {value}
                <img src={upGreenIcon} alt=""/>
            </div>}
            {(value <= 0 && value > -25) && <div className='down-changes'>
                {value}
                <img src={downBlackIcon} alt=""/>
            </div>}
            {(value <= -25) && <div className='downward-changes'>
                {value}
                <img src={downWhiteIcon} alt=""/>
            </div>}
        </div>
    )
};

const ProductsList = ({products, onSearchChange, fetchParams, handlePaginationChange}) => {

    const columns = [
        {
            title: () => (
                <div className="input-search">
                    <Input.Search
                        onChange={onSearchChange}
                    />
                </div>
            ),
            dataIndex: 'id',
            width: '350px',
            render: (text, record) => (
                <ProductItem
                    product={record.product}
                />
            )
        },
        {
            title: 'Number of Optimization',
            dataIndex: 'optimization_count',
            key: 'optimization_count',
            width: '50px',
            render: (text) => (
                <div className='count-changes'>
                    {text || 0}
                </div>
            )
        },
        {
            title: 'Budget Allocation',
            dataIndex: 'budget_allocation',
            key: 'budget_allocation',
            width: 100,
            render: (text, record) => (
                <div className='product-params'>
                    {text || '0%'}

                    <RenderPramsChanges
                        key='changes_budget_allocation'
                        product={record}
                    />
                </div>
            )
        },
        {
            title: 'Sales Share',
            dataIndex: 'sales_share',
            key: 'sales_share',
            width: 100,
            render: (text, record) => (
                <div className='product-params'>
                    {text || '0%'}

                    <RenderPramsChanges
                        key='changes_sales_share'
                        product={record}
                    />
                </div>
            )
        },
        {
            title: 'CPA',
            dataIndex: 'cpa',
            key: 'cpa',
            width: 100,
            render: (text, record) => (
                <div className='product-params'>
                    {text || '$0'}

                    <RenderPramsChanges
                        key='changes_cpa'
                        product={record}
                    />
                </div>
            )
        },
        {
            title: 'CVR Rate',
            dataIndex: 'cvr_rate',
            key: 'cvr_rate',
            width: 100,
            render: (text, record) => (
                <div className='product-params'>
                    {text || '0%'}

                    <RenderPramsChanges
                        key='changes_cvr_rate'
                        product={record}
                    />
                </div>
            )
        },
        {
            title: 'ACoS',
            dataIndex: 'acos',
            key: 'acos',
            width: 100,
            render: (text, record) => (
                <div className='product-params'>
                    {text || '0%'}

                    <RenderPramsChanges
                        key='changes_acos'
                        product={record}
                    />
                </div>
            )
        },
        {
            title: () => (<span>Profit <Tooltip type='warning'/></span>),
            dataIndex: 'profit',
            key: 'profit',
            width: '90px',
            render: (text, record) => (
                <div className='product-params'>
                    {text || '$0'}

                    <RenderPramsChanges
                        key='changes_profit'
                        product={record}
                    />
                </div>
            )
        },
    ];

    return (
        <div>
            <Table
                onChangePagination={handlePaginationChange}
                // loading={loading}
                dataSource={products}
                columns={columns}
                // rowClassName={ (record, index) => { }
                currentPage={fetchParams.page}
                showPagination={true}
                pageSize={fetchParams.size}
                totalSize={fetchParams.totalSize}
            />

        </div>
    )
};

export default ProductsList;
