import React, {useEffect} from "react";
import {Input} from "antd";
import Tooltip from '../../../../components/Tooltip/Tooltip';
import Table from "../../../../components/Table/Table";
import ProductItem from "../../../../components/ProductList/ProductItem";
import {round} from "../../../../utils/round";

import {history} from "../../../../utils/history";
import {numberMask} from "../../../../utils/numberMask";
import {SVG} from "../../../../utils/icons";
import Pagination from "../../../../components/Pagination/Pagination";

const RenderPramsChanges = ({type, product}) => {
    const value = product[type];

    if (value != null) {
        if (value === 0) {
            return (
                <div className='product-metric-changes up'>
                    <div className='down-changes'>
                        0%
                        <div className='horizontal-line-icon'></div>
                    </div>
                </div>
            )
        } else if (type === 'acos_diff' || type === 'cpa_diff') {
            return (
                <div className='product-metric-changes up'>
                    {(value > 0) && <div className='downward-changes'>
                        {round(Math.abs(+value), 2)}%
                        <SVG id='up-white-arrow'/>
                    </div>}

                    {(value <= 0) && <div className='upward-changes'>
                        {round(Math.abs(+value), 2)}%
                        <SVG id='down-white-arrow'/>
                    </div>}
                </div>
            )
        } else {
            return (
                <div className='product-metric-changes up'>
                    {(value > 0) && <div className='upward-changes'>
                        {round(Math.abs(+value), 2)}%
                        <SVG id='up-white-arrow'/>
                    </div>}

                    {(value <= 0) && <div className='downward-changes'>
                        {round(Math.abs(+value), 2)}%
                        <SVG id='down-white-arrow'/>
                    </div>}
                </div>
            )
        }
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
        <p>
            In order for this metric to display, we need to know your net margin for a given product, make sure you add
            it on the product settings page.
        </p>

        <button className='btn default' onClick={() => history.push('/ppc/product-settings')}>Add Net Margin</button>
    </div>
);


const ProductsList = ({products, fetchParams, handlePaginationChange, onSelect, selectedProduct, hasMargin}) => {
    const columns = [
        {
            title: 'Product Name',
            key: 'id',
            dataIndex: 'id',
            width: '260px',
            render: (text, record) => (
                <ProductItem
                    product={record.product}
                />
            )
        },
        {
            title: () =>
                <Tooltip
                    type={'custom'}
                    description={'A budget allocation is the amount of funding designated to each of your product.'}
                >
                    <span>Budget Allocation</span>
                </Tooltip>,
            dataIndex: 'budget_allocation',
            key: 'budget_allocation',
            width: '100px',
            render: (text, record) => (
                <div className='product-params'>
                    {text != null ? `${numberMask(text, 2)}%` : 'N/A'}

                    <RenderPramsChanges
                        type='budget_allocation_diff'
                        product={record}
                    />
                </div>
            )
        },
        {
            title: () =>
                <Tooltip
                    type={'custom'}
                    description={'The percentage of sales allocated to the given product.'}
                >
                    <span>Ad Sales Share</span>
                </Tooltip>,
            dataIndex: 'sales_share',
            key: 'sales_share',
            width: '100px',
            render: (text, record) => (
                <div className='product-params'>
                    {text != null ? `${numberMask(text, 2)}%` : 'N/A'}

                    <RenderPramsChanges
                        type='sales_share_diff'
                        product={record}
                    />
                </div>
            )
        },
        {
            title: () => <Tooltip
                type={'custom'}
                description={'Cost to acquire one paying customer on a campaign.'}
            >
                <span>CPA</span>
            </Tooltip>,
            dataIndex: 'cpa',
            key: 'cpa',
            width: '80px',
            render: (text, record) => (
                <div className='product-params'>
                    {text != null ? `$${numberMask(text, 2)}` : 'N/A'}

                    <RenderPramsChanges
                        type='cpa_diff'
                        product={record}
                    />
                </div>
            )
        },
        {
            title: () =>
                <Tooltip
                    type={'custom'}
                    description={'The Conversion Rate of a campaign is the percentage of people who clicked on an ad and then completed an action/purchase/conversion.'}
                >
                    <span>Ad CVR</span>
                </Tooltip>,
            dataIndex: 'conversion_rate',
            key: 'conversion_rate',
            width: '100px',
            render: (text, record) => (
                <div className='product-params'>
                    {text != null ? `${numberMask(text, 2)}%` : 'N/A'}

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
            width: '80px',
            render: (text, record) => (
                <div className='product-params'>
                    {text != null ? `${numberMask(text, 2)}%` : 'N/A'}

                    <RenderPramsChanges
                        type='acos_diff'
                        product={record}
                    />
                </div>
            )
        },
        {
            title: () => (<span>Profit {!hasMargin &&
            <Tooltip
                type='warning'
                description={<ProfitTooltipDescription/>}/>}</span>),
            dataIndex: 'profit',
            key: 'profit',
            width: '100px',
            render: (text, record) => (
                <div className='product-params'>
                    {text != null ? `$${numberMask(text, 2)}` : 'N/A'}

                    <RenderPramsChanges
                        type='profit_diff'
                        product={record}
                    />
                </div>
            )
        },
    ];

    useEffect(() => {
        if ((products && products.length > 0) && selectedProduct !== null && (products.find(item => item.product.id === selectedProduct) === undefined)) {
            onSelect(null)
        }
    }, [products]);

    return (
        <div>
            <Table
                onChangePagination={handlePaginationChange}
                dataSource={products}
                columns={columns}
                showPagination={false}
                scroll={{x: '800px', y: '380px'}}
                rowClassName={(record) => selectedProduct && (selectedProduct === record.product.id ? 'activated-product' : 'default-product')}
                rowKey={record => record.product.id}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: () => onSelect(record.product.id)
                    };
                }}
            />

            <Pagination
                onChange={handlePaginationChange}
                pageSizeOptions={[10, 50, 100]}
                pageSize={fetchParams.pageSize}
                page={fetchParams.page}
                totalSize={fetchParams.totalSize}
                listLength={products.length}
            />

        </div>
    )
};

export default ProductsList;
