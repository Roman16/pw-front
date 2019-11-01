import React, {Component} from 'react';
import {func, arrayOf, object} from 'prop-types';
import {Input, notification} from 'antd';
import InputCurrency from '../../../../components/Inputs/InputCurrency';
import Table from '../../../../components/Table/Table';
import ProductItem from '../../../../components/ProductList/ProductItem';
import {productsServices} from '../../../../services/products.services';

import './TableSettings.less';

const ACTIVE = 'RUNNING';
const PRODUCT = 'product';
const NET_MARGIN = 'product_margin_value';
const MIN_BID_MANUAL_CAMPING = 'min_bid_manual_campaign';
const MAX_BID_MANUAL_CAMPING = 'max_bid_manual_campaign';
const MIN_BID_AUTO_CAMPING = 'min_bid_auto_campaign';
const MAX_BID_AUTO_CAMPING = 'max_bid_auto_campaign';
const TOTAL_CHANGES = 'total_changes';
const OPTIMIZATION_STATUS = 'optimization_status';

const delay = 500; // ms

class ProductsList extends Component {
    state = {
        products: [],

        totalSize: 0,
        page: 1,
        size: 10
    };

    timerId = null;
    timerIdSearch = null;
    prevItem = 0;

    fetchProducts = async (searchText = '') => {
        const {page, size} = this.state;

        const {result, totalSize} = await productsServices.getProductsSettingsList({
            searchStr: searchText,
            page: page,
            size: size
        });
        this.setState({products: result, totalSize});
    };

    updateSettings = async (data) => {
        await productsServices.updateProductSettings(data);
    };

    onChangeRow = (value, item, index) => {
        const {products} = this.state;
        if (value > 0) {
            if ((item === MIN_BID_MANUAL_CAMPING) && (value > products[index][MAX_BID_MANUAL_CAMPING])) {
                notification.warning({
                    message: 'Min Bid (Manual Campaign) should be less than Max Bid (Manual Campaign)'
                });
                return;
            }
            if ((item === MAX_BID_MANUAL_CAMPING) && (value < products[index][MIN_BID_MANUAL_CAMPING])) {
                notification.warning({
                    message: 'Max Bid (Manual Campaign) should be greater than Min Bid (Manual Campaign)'
                });
                return;
            }
            if ((item === MIN_BID_AUTO_CAMPING) && (value > products[index][MAX_BID_AUTO_CAMPING])) {
                notification.warning({
                    message: 'Min Bid (Auto Campaign) should be less than Max Bid (Auto Campaign)'
                });
                return;
            }
            if ((item === MAX_BID_AUTO_CAMPING) && (value < products[index][MIN_BID_AUTO_CAMPING])) {
                notification.warning({
                    message: 'Max Bid (Manual Campaign) should be greater than Min Bid (Manual Campaign)'
                });
                return;
            }

            const dataSourceRow = this.setRowData(value, item, index);
            if (item !== this.prevItem) {
                this.prevItem = item;
                this.updateSettings(dataSourceRow);
            } else {
                this.prevItem = item;
                clearTimeout(this.timerId);
                this.timerId = setTimeout(() => {
                    this.updateSettings(dataSourceRow);
                }, delay);
            }
        } else {
            notification.warning({
                message: item === NET_MARGIN ?
                    'Product net margin should be greater than 0%'
                    :
                    'Bids should be greater than or equal to 0.02$'
            });
        }
    };

    setRowData = (value, item, index) => {
        const {products} = this.state;

        products[index] = {
            ...products[index],
            [item]: +value,
        };
        this.setState({
            products: [...products],
        });

        return {
            product_id: products[index].id,
            [item]: +value
        };
    };

    onSearchChange = ({target: {value}}) => {
        clearTimeout(this.timerIdSearch);
        this.timerIdSearch = setTimeout(() => {
            this.setState({page: 1}, () => this.fetchProducts(value))
        }, delay);
    };

    changePagination = (page) => {
        this.setState({page}, this.fetchProducts)
    };

    componentDidMount() {
        this.fetchProducts()
    }

    render() {
        const {products, page, totalSize, size} = this.state,

            columns = [
                {
                    title: () => (
                        <div className="input-search">
                            <Input.Search
                                onChange={this.onSearchChange}
                                // onBlur={onSearchBlur}
                            />
                        </div>
                    ),
                    dataIndex: PRODUCT,
                    key: PRODUCT,
                    width: '350px',
                    render: (product) => (
                        <ProductItem
                            product={product}
                        />
                    )
                },

                {
                    title: 'Net Margin*',
                    dataIndex: NET_MARGIN,
                    key: NET_MARGIN,
                    width: 150,
                    render: (index, item, indexRow) => (
                        <InputCurrency
                            value={item[NET_MARGIN]}
                            typeIcon='margin'
                            onChange={event =>
                                this.onChangeRow(event, NET_MARGIN, indexRow)
                            }
                        />
                    )
                },
                {
                    title: () => (<span>Min Bid <br/> (Manual Campaign)</span>),
                    dataIndex: MIN_BID_MANUAL_CAMPING,
                    key: MIN_BID_MANUAL_CAMPING,
                    width: 150,
                    render: (index, item, indexRow) => (
                        <InputCurrency
                            value={item[MIN_BID_MANUAL_CAMPING]}
                            min={0.02}
                            max={item[MAX_BID_MANUAL_CAMPING] || 999999999}
                            onChange={event =>
                                this.onChangeRow(event, MIN_BID_MANUAL_CAMPING, indexRow)
                            }
                        />
                    )
                },
                {
                    title: () => (<span>Max Bid <br/> (Manual Campaign)</span>),
                    dataIndex: MAX_BID_MANUAL_CAMPING,
                    key: MAX_BID_MANUAL_CAMPING,
                    width: 150,
                    render: (index, item, indexRow) => (
                        <InputCurrency
                            value={item[MAX_BID_MANUAL_CAMPING]}
                            min={item[MIN_BID_MANUAL_CAMPING] || 0.02}
                            onChange={event =>
                                this.onChangeRow(event, MAX_BID_MANUAL_CAMPING, indexRow)
                            }
                        />
                    )
                },
                {
                    title: () => (<span>Min Bid <br/> (Auto Campaign)</span>),
                    dataIndex: MIN_BID_AUTO_CAMPING,
                    key: MIN_BID_AUTO_CAMPING,
                    width: 150,
                    render: (index, item, indexRow) => (
                        <InputCurrency
                            value={item[MIN_BID_AUTO_CAMPING]}
                            min={0.02}
                            max={item[MAX_BID_AUTO_CAMPING] || 999999999}
                            onChange={event =>
                                this.onChangeRow(event, MIN_BID_AUTO_CAMPING, indexRow)
                            }
                        />
                    )
                },
                {
                    title: () => (<span>Max Bid <br/> (Auto Campaign)</span>),
                    dataIndex: MAX_BID_AUTO_CAMPING,
                    key: MAX_BID_AUTO_CAMPING,
                    width: 150,
                    render: (index, item, indexRow) => (
                        <InputCurrency
                            value={item[MAX_BID_AUTO_CAMPING]}
                            min={item[MAX_BID_AUTO_CAMPING] || 0.02}
                            onChange={event =>
                                this.onChangeRow(event, MAX_BID_AUTO_CAMPING, indexRow)
                            }
                        />
                    )
                },
                {
                    title: 'Total Changes',
                    dataIndex: TOTAL_CHANGES,
                    key: TOTAL_CHANGES,
                    width: '130px',
                    render: (index, item) => (
                        <div style={{fontWeight: 600}}>{item[TOTAL_CHANGES]}</div>
                    )
                },
                {
                    title: 'Optimization Status',
                    dataIndex: OPTIMIZATION_STATUS,
                    key: OPTIMIZATION_STATUS,
                    width: '150px',
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
            ],

            paginationOption = {
                pageSize: size,
                currentPage: page,
                totalSize: totalSize,
                onChangePagination: this.changePagination,
                showPagination: true
            },
            windowHeight = window.innerHeight;

        return (
            <div className="table-settings">
                <Table
                    rowKey="id"
                    dataSource={products}
                    columns={columns}
                    scroll={{y: paginationOption.totalSize > paginationOption.pageSize ? windowHeight - 350 : windowHeight - 300}}
                    {...paginationOption}
                />
            </div>
        );
    }
}

ProductsList.propTypes = {
    onChangeRow: func,
    dataSource: arrayOf(object)
};
ProductsList.defaultProps = {
    onChangeRow: () => {
    },
    dataSource: []
};

export default ProductsList;
