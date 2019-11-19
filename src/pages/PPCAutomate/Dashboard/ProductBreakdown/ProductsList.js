import React from "react";
import {Input} from "antd";
import Tooltip from '../../../../components/Tooltip/Tooltip';
import Table from "../../../../components/Table/Table";
import ProductItem from "../../../../components/ProductList/ProductItem";
import upGreenIcon from '../../../../assets/img/icons/metric-arrows/up-green-arrow.svg';
import downBlackIcon from '../../../../assets/img/icons/metric-arrows/down-black-arrow.svg';
import {round} from "../../../../utils/round";

import upWhiteIcon from "../../../../assets/img/icons/metric-arrows/up-white-arrow.svg";
import downWhiteIcon from "../../../../assets/img/icons/metric-arrows/down-white-arrow.svg";
import {history} from "../../../../utils/history";

const RenderPramsChanges = ({type, product}) => {
    const value = product[type];

    if (value != null) {
        return (
            <div className='product-metric-changes up'>
                {value >= 25 && <div className='upward-changes'>
                    {round(+value, 4)}
                    <img src={upWhiteIcon} alt=""/>
                </div>}
                {(value > 0 && value < 25) && <div className='up-changes'>
                    {round(+value, 4)}
                    <img src={upGreenIcon} alt=""/>
                </div>}
                {(value <= 0 && value > -25) && <div className='down-changes'>
                    {round(+value, 4)}
                    <img src={downBlackIcon} alt=""/>
                </div>}
                {(value <= -25) && <div className='downward-changes'>
                    {round(+value, 4)}
                    <img src={downWhiteIcon} alt=""/>
                </div>}
            </div>
        )
    } else {
        return (
            <div className='product-metric-changes up'>
                <div className='down-changes'>
                    N/A
                </div>
            </div>
        )
    }
};

export const ProfitTooltipDescription = () => (
    <div className='profit-tooltip-description'>
        <div className='title'>Warning</div>
        <p>We need to know your product costs before algorithm start optimization</p>

        <button className='btn default' onClick={() => history.push('/ppc/product-settings')}>Add Net Margin</button>

        <div className='title'>Tip</div>
        <p>
            Amazon Fees + Cost of Goods + Inbound Shipping + Reshipping + PPC Spend
        </p>
    </div>
);


const ProductsList = ({products, onSearchChange, fetchParams, handlePaginationChange, onSelect, selectedProduct}) => {
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
            width: '300px',
            render: (text, record) => (
                <ProductItem
                    product={record.product}
                />
            )
        },
        {
            title: 'Number of Optimization',
            dataIndex: 'total_changes',
            key: 'total_changes',
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
                    {text != null ? round(text, 4) : 'N/A'}

                    <RenderPramsChanges
                        type='budget_allocation_diff'
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
                    {text != null ? round(text, 4) : 'N/A'}

                    <RenderPramsChanges
                        type='sales_share_diff'
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
                    {text != null ? round(text, 4) : 'N/A'}

                    <RenderPramsChanges
                        type='cpa_diff'
                        product={record}
                    />
                </div>
            )
        },
        {
            title: 'CVR Rate',
            dataIndex: 'conversion_rate',
            key: 'conversion_rate',
            width: 100,
            render: (text, record) => (
                <div className='product-params'>
                    {text != null ? round(text, 4) : 'N/A'}

                    <RenderPramsChanges
                        type='conversion_rate_diff'
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
                    {text != null ? round(text, 4) : 'N/A'}

                    <RenderPramsChanges
                        type='acos_diff'
                        product={record}
                    />
                </div>
            )
        },
        {
            title: () => (<span>Profit <Tooltip type='warning' description={<ProfitTooltipDescription/>}/></span>),
            dataIndex: 'profit',
            key: 'profit',
            width: '110px',
            render: (text, record) => (
                <div className='product-params'>
                    {text != null ? round(text, 4) : 'N/A'}

                    <RenderPramsChanges
                        type='profit_diff'
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
                dataSource={products}
                columns={columns}
                rowClassName={(record) => selectedProduct && (selectedProduct === record.product.id ? 'activated-product' : 'default-product')}
                currentPage={fetchParams.page}
                showPagination={true}
                pageSize={fetchParams.size}
                totalSize={fetchParams.totalSize}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: () => onSelect(record.product.id)
                    };
                }}
            />

        </div>
    )
};

export default ProductsList;
