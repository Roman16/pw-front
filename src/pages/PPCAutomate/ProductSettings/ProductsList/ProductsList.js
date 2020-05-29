import React, {Fragment, useState} from 'react';
import InputCurrency from '../../../../components/Inputs/InputCurrency';
import ProductItem from '../../../../components/ProductList/ProductItem';
import {notification} from '../../../../components/Notification';
import './TableSettings.less';
import InformationTooltip from "../../../../components/Tooltip/Tooltip";
import CustomTable from "../../../../components/Table/CustomTable";
import Pagination from "../../../../components/Pagination/Pagination";
import {SVG} from "../../../../utils/icons";
import MultiApply from "../MultiApply/MultiApply";
import {numberMask} from "../../../../utils/numberMask";
import {round} from "../../../../utils/round";


const ACTIVE = 'RUNNING';
const PRODUCT = 'product';
const NET_MARGIN = 'product_margin_value';
const PRICE = 'item_price';
const PRICE_FROM_USER = 'item_price_from_user';
const MIN_BID_MANUAL_CAMPING = 'min_bid_manual_campaign';
const MAX_BID_MANUAL_CAMPING = 'max_bid_manual_campaign';
const MIN_BID_AUTO_CAMPING = 'min_bid_auto_campaign';
const MAX_BID_AUTO_CAMPING = 'max_bid_auto_campaign';
const TOTAL_CHANGES = 'total_changes';
const OPTIMIZATION_STATUS = 'optimization_status';

let minBidManualTimerId = null,
    minBidAutoTimerId = null,
    maxBidManualTimerId = null,
    maxBidAutoTimerId = null,
    marginTimerId = null,
    priceTimerId = null;


const ProductsList = ({products, totalSize, paginationOption, changePagination, processing, setRowData, updateSettingsHandlerByIdList}) => {
    const [selectedRows, setSelectedRows] = useState([]),
        [selectedAll, setSelectedAll] = useState(false);

    const onChangeRow = (value, item, index) => {
        console.log(value);
        if (products[index][item] !== value) {
            if (value === '' || value == null) {
                setRowData(null, item, index);
            } else if (item === PRICE_FROM_USER && value > 0) {
                setRowData(value, item, index);
                clearTimeout(priceTimerId);
            } else if (item === PRICE_FROM_USER && value <= 0) {
                setRowData(value, item, index);

                clearTimeout(priceTimerId);
                priceTimerId = setTimeout(() => {
                    notification.warning({
                        title: 'Price should be greater than 0'
                    });
                }, 1000);
                return;
            } else if (item !== NET_MARGIN) {
                if (value < 0.02 || ((item === MIN_BID_MANUAL_CAMPING) && (value > products[index][MAX_BID_MANUAL_CAMPING]) && products[index][MAX_BID_MANUAL_CAMPING] != null)) {
                    clearTimeout(minBidManualTimerId);
                    minBidManualTimerId = setTimeout(() => {
                        notification.warning({
                            title: value < 0.02 ? 'Bids should be greater than or equal to 0.02$' : 'Min Bid (Manual Campaign) should be less than Max Bid (Manual Campaign)'
                        });
                    }, 1000);
                    return;
                }
                if (value < 0.02 || ((item === MAX_BID_MANUAL_CAMPING) && (value < products[index][MIN_BID_MANUAL_CAMPING]) && products[index][MIN_BID_MANUAL_CAMPING] != null)) {
                    clearTimeout(maxBidManualTimerId);
                    maxBidManualTimerId = setTimeout(() => {
                        notification.warning({
                            title: value < 0.02 ? 'Bids should be greater than or equal to 0.02$' : 'Max Bid (Manual Campaign) should be greater than Min Bid (Manual Campaign)'
                        });
                    }, 1000);
                    return;
                }
                if (value < 0.02 || ((item === MIN_BID_AUTO_CAMPING) && (value > products[index][MAX_BID_AUTO_CAMPING]) && products[index][MAX_BID_AUTO_CAMPING] != null)) {
                    clearTimeout(minBidAutoTimerId);
                    minBidAutoTimerId = setTimeout(() => {
                        notification.warning({
                            title: value < 0.02 ? 'Bids should be greater than or equal to 0.02$' : 'Min Bid (Auto Campaign) should be less than Max Bid (Auto Campaign)'
                        });
                    }, 1000);
                    return;
                }
                if (value < 0.02 || ((item === MAX_BID_AUTO_CAMPING) && (value < products[index][MIN_BID_AUTO_CAMPING]) && products[index][MIN_BID_AUTO_CAMPING] != null)) {
                    clearTimeout(maxBidAutoTimerId);
                    maxBidAutoTimerId = setTimeout(() => {
                        notification.warning({
                            title: value < 0.02 ? 'Bids should be greater than or equal to 0.02$' : 'Max Bid (Manual Campaign) should be greater than  Min Bid (Manual Campaign)'
                        });
                    }, 1000);
                    return;
                }

                clearTimeout(maxBidAutoTimerId);
                clearTimeout(minBidAutoTimerId);
                clearTimeout(minBidManualTimerId);
                clearTimeout(maxBidManualTimerId);

                setRowData(value, item, index)
            } else if (item === NET_MARGIN && value > 0 && value <= 100) {
                setRowData(value, item, index);
                clearTimeout(marginTimerId);
            } else if (item === NET_MARGIN && (value < 0 || value > 100)) {
                clearTimeout(marginTimerId);
                marginTimerId = setTimeout(() => {
                    notification.warning({
                        title: 'Product net margin should be greater than 0% and less than 100%'
                    });
                }, 1000)
            } else {
                notification.warning({
                    title: item === NET_MARGIN ? 'Product net margin should be greater than 0% and less than 100%' : 'Bids should be greater than or equal to 0.02$'
                });
            }
        }
    };

    const onSubmitSettingParams = (value) => {
        updateSettingsHandlerByIdList({
            ...value,
            ...!selectedAll && {product_id: selectedRows},
        })
    }

    const expandedRowRender = (props) => {
        const columns = [
            {
                width: '35rem',
                render: (props) => {
                    return (<ProductItem
                            product={props.product}
                        />
                    )
                }
            },
            {
                minWidth: '160px',
                render: (props) => (
                    <InputCurrency
                        value={props[PRICE]}
                        disabled
                    />
                )
            },
            {
                minWidth: '160px',
                render: (props) => (
                    <InputCurrency
                        value={props[PRICE_FROM_USER]}
                        disabled
                        step={0.01}
                    />
                )
            },
            {
                minWidth: '160px',
                render: (props) => (
                    <InputCurrency
                        value={props[NET_MARGIN]}
                        typeIcon='percent'
                        disabled
                    />
                )
            },
            {
                minWidth: '175px',
                render: (props) => (
                    <InputCurrency
                        value={props[MIN_BID_MANUAL_CAMPING]}
                        disabled
                        step={0.01}
                    />
                )
            },
            {
                minWidth: '175px',
                render: (props) => (
                    <InputCurrency
                        value={props[MAX_BID_MANUAL_CAMPING]}
                        disabled
                        step={0.01}
                    />
                )
            },
            {
                minWidth: '175px',
                render: (props) => (
                    <InputCurrency
                        value={props[MIN_BID_AUTO_CAMPING]}
                        disabled
                        step={0.01}
                    />
                )
            },
            {
                minWidth: '175px',
                render: (props) => (
                    <InputCurrency
                        value={props[MAX_BID_AUTO_CAMPING]}
                        disabled
                        step={0.01}
                    />
                )
            },
            {
                width: '100px',
                render: (props) => (<div style={{textAlign: 'right'}}></div>)
            },
            {
                width: '135px',
                render: (props) => (
                    <span> {props[OPTIMIZATION_STATUS] === ACTIVE ? <span className={'running'}>Running</span> :
                        <span className={'paused'}>Paused</span>}</span>)
            },
        ];


        return (
            props.product.variations.map(productVariation => (
                    <div>

                        {columns.map((item, index) => {
                                const fieldWidth = item.width ? ((devicePixelRatio === 2 && (item.width.search('em') !== -1)) ? {width: `calc(${item.width} + 1.5em)`} : {width: item.width}) : {flex: 1};

                                return (
                                    <div
                                        className={`table-body__field ${item.align || ''}`}
                                        style={{...fieldWidth, minWidth: item.minWidth || '0'}}
                                    >
                                        {index === 0 && <div className="variation-indicator"/>}

                                        {item.render(props)}
                                    </div>
                                )
                            }
                        )}
                    </div>
                )
            )
        )
    };

    const rowSelection = {
        onChange: (selectedRows, type) => {
            setSelectedRows(selectedRows);
            if (type !== 'all') {
                setSelectedAll(false);
            }
        }
    };

    const [openedProduct, setOpenedProduct] = useState(null);

    const openVariationsHandler = (id) => {
        setOpenedProduct(prevState => prevState === id ? null : id);
    }

    const columns = [
        {
            title: 'Product Name',
            dataIndex: PRODUCT,
            key: PRODUCT,
            width: '31.428571428571427rem',
            render: (product) => (
                <ProductItem
                    product={product}
                    products={products}
                    onOpenChild={openVariationsHandler}
                    openedProductOnSetting={openedProduct}

                />
            )
        },
        {
            title: 'Product Price',
            dataIndex: PRICE,
            key: PRICE,
            minWidth: '160px',
            render: (index, item) => (
                <InputCurrency
                    value={item[PRICE]}
                    disabled
                />
            )
        },
        {
            title: <>Overwrite <br/> Product Price</>,
            dataIndex: PRICE_FROM_USER,
            key: PRICE_FROM_USER,
            minWidth: '160px',
            render: (index, item, indexRow) => (
                <InputCurrency
                    key={PRICE_FROM_USER}
                    value={item[PRICE_FROM_USER]}
                    min={0}
                    step={0.01}
                    onChange={event => onChangeRow(event, PRICE_FROM_USER, indexRow)}
                    onBlur={(e) => {
                    }}
                />
            )
        },
        {
            title: <InformationTooltip
                type={'custom'}
                description={'It is the percentage of profit generated from revenue after you have accounted for all of your expenses, costs, and open cash flow items. ' +
                'The formula for calculating net profit margin is total revenue minus COGS, ' +
                'divided by total revenue. We need this information, so the algorithm calculates your ' +
                'target ACoS based on your product profitability and business goal.'}>
                <span className='net-margin'>Net Margin*</span>
            </InformationTooltip>,
            dataIndex: NET_MARGIN,
            key: NET_MARGIN,
            minWidth: '160px',
            render: (index, item, indexRow) => {
                return (
                    <InputCurrency
                        value={item[NET_MARGIN]}
                        typeIcon='percent'
                        data-intercom-target="net-margin-field"
                        onChange={event => onChangeRow(event, NET_MARGIN, indexRow)}
                    />
                )
            }
        },
        {
            title: () => (<span>Min Bid <br/> (Manual Campaign)</span>),
            dataIndex: MIN_BID_MANUAL_CAMPING,
            key: MIN_BID_MANUAL_CAMPING,
            minWidth: '175px',
            render: (index, item, indexRow) => (
                <InputCurrency
                    value={item[MIN_BID_MANUAL_CAMPING]}
                    min={0}
                    max={item[MAX_BID_MANUAL_CAMPING] || 999999999}
                    step={0.01}
                    data-intercom-target="min-bid-field"
                    onChange={event => onChangeRow(event, MIN_BID_MANUAL_CAMPING, indexRow)}
                />
            )
        },
        {
            title: () => (<span>Max Bid <br/> (Manual Campaign)</span>),
            dataIndex: MAX_BID_MANUAL_CAMPING,
            key: MAX_BID_MANUAL_CAMPING,
            minWidth: '175px',
            render: (index, item, indexRow) => (
                <InputCurrency
                    value={item[MAX_BID_MANUAL_CAMPING]}
                    min={item[MIN_BID_MANUAL_CAMPING] || 0}
                    step={0.01}
                    onChange={event => onChangeRow(event, MAX_BID_MANUAL_CAMPING, indexRow)}
                />
            )
        },
        {
            title: () => (<span>Min Bid <br/> (Auto Campaign)</span>),
            dataIndex: MIN_BID_AUTO_CAMPING,
            key: MIN_BID_AUTO_CAMPING,
            minWidth: '175px',
            render: (index, item, indexRow) => (
                <InputCurrency
                    value={item[MIN_BID_AUTO_CAMPING]}
                    min={0}
                    max={item[MAX_BID_AUTO_CAMPING] || 999999999}
                    step={0.01}
                    onChange={event => onChangeRow(event, MIN_BID_AUTO_CAMPING, indexRow)}
                />
            )
        },
        {
            title: () => (<span>Max Bid <br/> (Auto Campaign)</span>),
            dataIndex: MAX_BID_AUTO_CAMPING,
            key: MAX_BID_AUTO_CAMPING,
            minWidth: '175px',
            render: (index, item, indexRow) => (
                <InputCurrency
                    value={item[MAX_BID_AUTO_CAMPING]}
                    min={item[MIN_BID_AUTO_CAMPING] || 0}
                    step={0.01}
                    onChange={event => onChangeRow(event, MAX_BID_AUTO_CAMPING, indexRow)}
                />
            )
        },
        {
            title: 'Total Changes',
            dataIndex: TOTAL_CHANGES,
            key: TOTAL_CHANGES,
            width: '100px',
            align: 'right',
            render: (index, item) => (
                <div>{item[TOTAL_CHANGES]}</div>
            )
        },
        {
            title: 'Optimization Status',
            dataIndex: OPTIMIZATION_STATUS,
            key: OPTIMIZATION_STATUS,
            width: '135px',
            render: (index, item) => (
                <span> {item[OPTIMIZATION_STATUS] === ACTIVE ? <span className={'running'}>Running</span> :
                    <span className={'paused'}>Paused</span>}</span>)
        }
    ];

    return (
        <Fragment>
            {selectedRows.length > 0 && <MultiApply
                selectedRows={selectedRows}
                totalSize={totalSize}
                onSelectAll={() => setSelectedAll(true)}
                selectedAll={selectedAll}

                onSubmit={onSubmitSettingParams}
            />}

            <CustomTable
                key={'table'}
                rowKey="id"
                dataSource={products}
                columns={columns}
                loading={processing}
                rowSelection={rowSelection}
                openedRow={openedProduct}
                selectedAll={selectedAll}

                expandedRowRender={expandedRowRender}
            />

            <Pagination
                onChange={changePagination}
                page={paginationOption.page}
                pageSizeOptions={[10, 30, 50]}
                pageSize={paginationOption.pageSize}
                totalSize={totalSize}
                listLength={products.length}
                processing={processing}
            />
        </Fragment>
    );
}

export default React.memo(ProductsList);

