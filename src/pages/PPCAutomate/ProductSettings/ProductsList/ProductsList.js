import React, {Component, Fragment} from 'react';
import {func, arrayOf, object} from 'prop-types';
import {Input, Switch, Icon} from 'antd';
import InputCurrency from '../../../../components/Inputs/InputCurrency';
import Table from '../../../../components/Table/Table';
import ProductItem from '../../../../components/ProductList/ProductItem';
import {productsServices} from '../../../../services/products.services';
import {notification} from '../../../../components/Notification';
import {throttling} from "../../../../utils/throttling";
import './TableSettings.less';
import {productsActions} from "../../../../actions/products.actions";
import {connect} from "react-redux";
import InformationTooltip from "../../../../components/Tooltip/Tooltip";
import axios from "axios";
import {SVG} from "../../../../utils/icons";
import CustomTable from "../../../../components/Table/CustomTable";
import Pagination from "../../../../components/Pagination/Pagination";

const CancelToken = axios.CancelToken;
let source = null;

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

const delay = 1000; // ms

const ProductsList = ({products, totalSize, paginationOption, changePagination, processing}) => {
    // state = {
    //     products: [],
    //     openedProduct: '',
    //     totalSize: 0,
    //     page: 1,
    //     size: 10,
    //     onlyActive: this.props.onlyActiveOnAmazon || false,
    //     fetching: false
    // };
    //
    // timerId = null;
    // timerNotificationId = null;
    // timerIdSearch = null;
    //
    // prevItem = null;
    // prevItemIndex = null;
    //
    //
    //
    // showNotification = throttling((text) => {
    //     notification.warning({title: text});
    // }, 3000);
    //
    // updateSettings = async (data) => {
    //     clearTimeout(this.timerNotificationId);
    //
    //     try {
    //         await productsServices.updateProductSettings(data);
    //         this.prevItemIndex = null;
    //
    //         clearTimeout(this.timerNotificationId);
    //
    //         this.timerNotificationId = setTimeout(() => {
    //             notification.success({
    //                 title: 'Changes saved'
    //             });
    //         }, 1500)
    //
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };
    //
    // onChangeRow = (value, item, index) => {
    //     const {products} = this.state;
    //     let dataSourceRow;
    //
    //     if (products[index][item] !== value) {
    //         this.prevItemIndex = index;
    //
    //         if (value === '' || value == null) {
    //             dataSourceRow = this.setRowData(null, item, index);
    //
    //             clearTimeout(this.timerId);
    //             this.timerId = setTimeout(() => {
    //                 this.updateSettings(dataSourceRow);
    //             }, delay);
    //         } else if (item !== NET_MARGIN && value > 0.02) {
    //             if ((item === MIN_BID_MANUAL_CAMPING) && (value > products[index][MAX_BID_MANUAL_CAMPING]) && products[index][MAX_BID_MANUAL_CAMPING] != null) {
    //                 notification.warning({
    //                     title: 'Min Bid (Manual Campaign) should be less than Max Bid (Manual Campaign)'
    //                 });
    //                 return;
    //             }
    //             if ((item === MAX_BID_MANUAL_CAMPING) && (value < products[index][MIN_BID_MANUAL_CAMPING]) && products[index][MIN_BID_MANUAL_CAMPING] != null) {
    //                 notification.warning({
    //                     title: 'Max Bid (Manual Campaign) should be greater than Min Bid (Manual Campaign)'
    //                 });
    //                 return;
    //             }
    //             if ((item === MIN_BID_AUTO_CAMPING) && (value > products[index][MAX_BID_AUTO_CAMPING]) && products[index][MAX_BID_AUTO_CAMPING] != null) {
    //                 notification.warning({
    //                     title: 'Min Bid (Auto Campaign) should be less than Max Bid (Auto Campaign)'
    //                 });
    //                 return;
    //             }
    //             if ((item === MAX_BID_AUTO_CAMPING) && (value < products[index][MIN_BID_AUTO_CAMPING]) && products[index][MIN_BID_AUTO_CAMPING] != null) {
    //                 notification.warning({
    //                     title: 'Max Bid (Manual Campaign) should be greater than Min Bid (Manual Campaign)'
    //                 });
    //                 return;
    //             }
    //             dataSourceRow = this.setRowData(value, item, index);
    //
    //             clearTimeout(this.timerId);
    //             this.timerId = setTimeout(() => {
    //                 this.updateSettings(dataSourceRow);
    //             }, delay);
    //         } else if (item === NET_MARGIN && value > 0 && value <= 100) {
    //             dataSourceRow = this.setRowData(value, NET_MARGIN, index);
    //
    //             clearTimeout(this.timerId);
    //             this.timerId = setTimeout(() => {
    //                 this.updateSettings(dataSourceRow);
    //             }, delay);
    //         } else if (item === NET_MARGIN && (value < 0 || value > 100)) {
    //             dataSourceRow = this.setRowData(null, NET_MARGIN, index);
    //             this.showNotification('Product net margin should be greater than 0% and less than 100%');
    //
    //             clearTimeout(this.timerId);
    //             this.timerId = setTimeout(() => {
    //                 this.updateSettings(dataSourceRow);
    //             }, delay);
    //         } else {
    //             this.showNotification(item === NET_MARGIN ? 'Product net margin should be greater than 0% and less than 100%' : 'Bids should be greater than or equal to 0.02$')
    //         }
    //     }
    // };
    //
    // onBlurRow = () => {
    //     const {products} = this.state;
    //
    //     if (this.prevItemIndex !== null) {
    //         clearTimeout(this.timerId);
    //
    //         this.updateSettings({
    //             ...products[this.prevItemIndex],
    //             product_id: products[this.prevItemIndex].id,
    //         });
    //     }
    // };
    //
    // setRowData = (value, item, index) => {
    //     const {products} = this.state;
    //
    //     products[index] = {
    //         ...products[index],
    //         [item]: value ? +value : null,
    //     };
    //     this.setState({
    //         products: [...products],
    //     });
    //
    //     return {
    //         product_id: products[index].id,
    //         [item]: value ? +value : null
    //     };
    // };
    //
    // handleChangeSwitch = (e) => {
    //     this.props.showOnlyOptimized(e);
    //     this.setState({onlyActive: e, page: 1}, this.fetchProducts)
    // };
    //

    //
    // handleOpenChild = (id) => {
    //     this.setState({
    //         openedProduct: id
    //     })
    // };
    //
    // expandedRowRender = (props) => {
    //     const columns = [
    //         {
    //             title: '',
    //             width: '300px',
    //             render: (title, item) => {
    //                 return (<ProductItem
    //                         product={item}
    //                     />
    //                 )
    //             }
    //         },
    //         {
    //             title: '',
    //             width: 150,
    //             render: () => (<span className='value'><SVG id={'percent-icon'}/> {props[NET_MARGIN]}</span>)
    //         },
    //         {
    //             title: '',
    //             width: 150,
    //             render: () => (
    //                 <span className='value'><SVG id={'dollar-icon'}/> {props[MIN_BID_MANUAL_CAMPING]}</span>)
    //         },
    //         {
    //             title: '',
    //             width: 150,
    //             render: () => (
    //                 <span className='value'><SVG id={'dollar-icon'}/> {props[MAX_BID_MANUAL_CAMPING]}</span>)
    //         },
    //         {
    //             title: '',
    //             width: 150,
    //             render: () => (
    //                 <span className='value'><SVG id={'dollar-icon'}/> {props[MIN_BID_AUTO_CAMPING]}</span>)
    //         },
    //         {
    //             title: '',
    //             width: 150,
    //             render: () => (
    //                 <span className='value'><SVG id={'dollar-icon'}/> {props[MAX_BID_AUTO_CAMPING]}</span>)
    //         },
    //         {
    //             title: '',
    //             width: 150,
    //         },
    //         {
    //             title: '',
    //             width: '120px',
    //             render: () => (<span> {props[OPTIMIZATION_STATUS] === ACTIVE ?
    //                 <span style={{color: '#8fd39d'}}>Active</span> : 'Paused'}</span>)
    //         },
    //     ];
    //
    //
    //     return <Table className='child-list' columns={columns} dataSource={props.product.variations}
    //                   pagination={false}/>;
    // };

    const columns = [
        {
            title: 'Product Name',
            dataIndex: PRODUCT,
            key: PRODUCT,
            width: '425px',
            render: (product) => (
                <ProductItem
                    product={product}
                    products={products}
                    // onOpenChild={this.handleOpenChild}
                />
            )
        },

        {
            title: 'Product Price',
            dataIndex: PRICE,
            key: PRICE,
            minWidth: '160px',
            render: (index, item, indexRow) => (
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
                    value={item[PRICE_FROM_USER]}
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
            render: (index, item, indexRow) => (
                <InputCurrency
                    value={item[NET_MARGIN]}
                    typeIcon='percent'
                    data-intercom-target="net-margin-field"
                    onChange={event =>
                        this.onChangeRow(event, NET_MARGIN, indexRow)
                    }
                    onBlur={() => {
                        this.onBlurRow()
                    }}
                />
            )
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
                    onChange={event =>
                        this.onChangeRow(event, MIN_BID_MANUAL_CAMPING, indexRow)
                    }
                    onBlur={() => {
                        this.onBlurRow()
                    }}
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
                    onChange={event =>
                        this.onChangeRow(event, MAX_BID_MANUAL_CAMPING, indexRow)
                    }
                    onBlur={() => {
                        this.onBlurRow()
                    }}
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
                    onChange={event =>
                        this.onChangeRow(event, MIN_BID_AUTO_CAMPING, indexRow)
                    }
                    onBlur={() => {
                        this.onBlurRow()
                    }}
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
                    onChange={event =>
                        this.onChangeRow(event, MAX_BID_AUTO_CAMPING, indexRow)
                    }
                    onBlur={() => {
                        this.onBlurRow()
                    }}
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
                <div style={{fontWeight: 600}}>{item[TOTAL_CHANGES]}</div>
            )
        },
        {
            title: 'Optimization Status',
            dataIndex: OPTIMIZATION_STATUS,
            key: OPTIMIZATION_STATUS,
            width: '135px',
            render: (index, item) => (
                <div
                    className={`settings-status ${
                        item[OPTIMIZATION_STATUS] === ACTIVE ? 'active' : ''
                    }`}
                >
                    {item[OPTIMIZATION_STATUS] === ACTIVE
                        ? 'Active'
                        : 'Paused'}
                </div>
            )
        }
    ];

    return (
        <Fragment>
            <CustomTable
                rowKey="id"
                dataSource={products}
                columns={columns}
                processing={processing}
                // expandIcon={(props) => this.customExpandIcon(props)}

                // expandedRowRender={this.expandedRowRender}
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
//
// ProductsList.propTypes = {
//     onChangeRow: func,
//     dataSource: arrayOf(object)
// };
// ProductsList.defaultProps = {
//     onChangeRow: () => {
//     },
//     dataSource: []
// };
//
// const mapStateToProps = state => ({
//     onlyActiveOnAmazon: state.products.onlyActiveOnAmazon,
// });
//
// const mapDispatchToProps = dispatch => ({
//     showOnlyOptimized: (data) => {
//         dispatch(productsActions.showOnlyActive(data));
//     }
// });

export default ProductsList;

