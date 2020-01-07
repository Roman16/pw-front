import React, {useEffect} from "react";
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
import {numberMask} from "../../../../utils/numberMask";

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
                    {value >= 25 && <div className='downward-changes'>
                        {round(+value, 2)}%
                        <img style={{transform: 'rotate(180deg)'}} src={downWhiteIcon} alt=""/>

                    </div>}
                    {(value > 0 && value < 25) && <div className='down-changes'>
                        {round(+value, 2)}%
                        <img style={{transform: 'rotate(180deg)'}} src={downBlackIcon} alt=""/>
                    </div>}
                    {(value <= 0 && value > -25) && <div className='up-changes'>
                        {round(+value, 2)}%
                        <img style={{transform: 'rotate(180deg)'}} src={upGreenIcon} alt=""/>
                    </div>}
                    {(value <= -25) && <div className='upward-changes'>
                        {round(+value, 2)}%
                        <img style={{transform: 'rotate(180deg)'}} src={upWhiteIcon} alt=""/>
                    </div>}
                </div>
            )
        } else {
            return (
                <div className='product-metric-changes up'>
                    {value >= 25 && <div className='upward-changes'>
                        {round(+value, 2)}%
                        <img src={upWhiteIcon} alt=""/>
                    </div>}
                    {(value > 0 && value < 25) && <div className='up-changes'>
                        {round(+value, 2)}%
                        <img src={upGreenIcon} alt=""/>
                    </div>}
                    {(value <= 0 && value > -25) && <div className='down-changes'>
                        {round(+value, 2)}%
                        <img src={downBlackIcon} alt=""/>
                    </div>}
                    {(value <= -25) && <div className='downward-changes'>
                        {round(+value, 2)}%
                        <img src={downWhiteIcon} alt=""/>
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
        <p>We need to know your product net margin before algorithm start optimization</p>

        <button className='btn default' onClick={() => history.push('/ppc/product-settings')}>Add Net Margin</button>

        <div className='title'>Tip</div>
        <p>
            Amazon Fees + Cost of Goods + Inbound Shipping + Reshipping + PPC Spend
        </p>
    </div>
);


const ProductsList = ({products, onSearchChange, fetchParams, handlePaginationChange, onSelect, selectedProduct, hasMargin}) => {
    const columns = [
        {
            title: () => (
                <div className="input-search">
                    <Input.Search
                        onChange={onSearchChange}
                    />
                </div>
            ),
            key: 'id',
            dataIndex: 'id',
            width: '200px',
            render: (text, record) => (
                <ProductItem
                    product={record.product}
                />
            )
        },
        {
            title: 'Total Changes',
            dataIndex: 'total_changes',
            key: 'total_changes',
            width: '10em',
            render: (text) => (
                <div className='count-changes'>
                    {numberMask(text) || 0}
                </div>
            )
        },
        {
            title: () => <div>Budget <br/> Allocation<Tooltip
                description={'A budget allocation is the amount of funding designated to each of your product.'}
            /></div>,
            dataIndex: 'budget_allocation',
            key: 'budget_allocation',
            width: '10em',
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
            title: () => <div>Ad Sales <br/> Share<Tooltip
                description={'The percentage of sales allocated to the given product.'}
            /></div>,
            dataIndex: 'sales_share',
            key: 'sales_share',
            width: '11em',
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
            title: () => <div>CPA<Tooltip
                description={'Cost to acquire one paying customer on a campaign.'}
            /></div>,
            dataIndex: 'cpa',
            key: 'cpa',
            width: '10em',
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
            title: () => <div>Ad CVR<Tooltip
                description={'The Conversion Rate of a campaign is the percentage of people who clicked on an ad and then completed an action/purchase/conversion.'}
            /></div>,
            dataIndex: 'conversion_rate',
            key: 'conversion_rate',
            width: '11em',
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
            width: '10em',
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
            <Tooltip type='warning' description={<ProfitTooltipDescription/>}/>}</span>),
            dataIndex: 'profit',
            key: 'profit',
            width: '10em',
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
                currentPage={fetchParams.page}
                showPagination={true}
                pageSize={fetchParams.size}
                totalSize={fetchParams.totalSize}
                scroll={{x: true}}
                rowClassName={(record) => selectedProduct && (selectedProduct === record.product.id ? 'activated-product' : 'default-product')}
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
