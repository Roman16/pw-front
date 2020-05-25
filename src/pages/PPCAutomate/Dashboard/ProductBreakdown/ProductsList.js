import React, {useEffect} from "react";
import Tooltip from '../../../../components/Tooltip/Tooltip';
import ProductItem from "../../../../components/ProductList/ProductItem";
import {round} from "../../../../utils/round";

import {history} from "../../../../utils/history";
import {numberMask} from "../../../../utils/numberMask";
import {SVG} from "../../../../utils/icons";
import Pagination from "../../../../components/Pagination/Pagination";
import CustomTable from "../../../../components/Table/CustomTable";

const RenderPramsChanges = ({type, product}) => {
    const value = product[type];

    if (value != null) {
        if (value === 0) {
            return (
                <div className='product-metric-changes up'>
                    <div className='down-changes'>
                        0%
                        <div className='horizontal-line-icon'/>
                    </div>
                </div>
            )
        } else if (type === 'acos_diff' || type === 'cpa_diff') {
            return (
                <div className='product-metric-changes up'>
                    {(value > 0) && <div className='downward-changes'>
                        <i style={{transform: 'rotate(180deg)'}}>
                            <SVG id='downward-metric-changes'/>
                        </i>
                        {round(Math.abs(+value), 2)}%
                    </div>}

                    {(value <= 0) && <div className='upward-changes'>
                        <i style={{transform: 'rotate(180deg)'}}>
                            <SVG id='upward-metric-changes'/>
                        </i>
                        {round(Math.abs(+value), 2)}%
                    </div>}
                </div>
            )
        } else {
            return (
                <div className='product-metric-changes up'>
                    {(value > 0) && <div className='upward-changes'>
                        <i>
                            <SVG id='upward-metric-changes'/>
                        </i>
                        {round(Math.abs(+value), 2)}%
                    </div>}

                    {(value <= 0) && <div className='downward-changes'>
                        <i>
                            <SVG id='downward-metric-changes'/>
                        </i>
                        {round(Math.abs(+value), 2)}%
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


const ProductsList = ({fetching, products, fetchParams, handlePaginationChange, onSelect, selectedProduct, hasMargin}) => {
    const columns = [
        {
            title: 'Product Name',
            key: 'id',
            dataIndex: 'id',
            width: '26.785714285714285rem',
            render: (text, record) => (
                <ProductItem
                    product={record.product}
                />
            )
        },
        {
            title: () => (<span>Profit {!hasMargin &&
            <Tooltip
                type='warning'
                description={<ProfitTooltipDescription/>}/>}</span>),
            dataIndex: 'profit',
            key: 'profit',
            minWidth: '12.142857142857142rem',
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
        {
            title: () => <Tooltip
                type={'custom'}
                description={'Cost to acquire one paying customer on a campaign.'}
            >
                <span>CPA</span>
            </Tooltip>,
            dataIndex: 'cpa',
            key: 'cpa',
            minWidth: '100px',
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
            minWidth: '7.142857142857143rem',
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
            minWidth: '100px',
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
            title: () =>
                <Tooltip
                    type={'custom'}
                    description={'A budget allocation is the amount of funding designated to each of your product.'}
                >
                    <span>Budget Allocation</span>
                </Tooltip>,
            dataIndex: 'budget_allocation',
            key: 'budget_allocation',
            minWidth: '10.714285714285714rem',
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
            minWidth: '9.285714285714286rem',
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
    ];

    useEffect(() => {
        if ((products && products.length > 0) && selectedProduct !== null && (products.find(item => item.product.id === selectedProduct) === undefined)) {
            onSelect(null)
        }
    }, [products]);

    return (
        <div>
            <CustomTable
                onChangePagination={handlePaginationChange}
                dataSource={products}
                columns={columns}
                rowClassName={(record) => ((selectedProduct == null || selectedProduct === record.product.id) ? 'activated-product' : 'default-product')}
                rowClick={(record, rowIndex) => onSelect(record.product.id)}
            />

            <Pagination
                onChange={handlePaginationChange}
                pageSizeOptions={[10, 50, 100]}
                pageSize={fetchParams.pageSize}
                page={fetchParams.page}
                totalSize={fetchParams.totalSize}
                listLength={products && products.length ? products.length : 0}
                processing={fetching}
            />
        </div>
    )
};

export default ProductsList;
