import React, {Component} from 'react';
import {func, arrayOf, object} from 'prop-types';
import {Input} from 'antd';
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

    onChangeRow = (...args) => {
        const dataSourceRow = this.setRowData(...args);

        clearTimeout(this.timerId);
        this.timerId = setTimeout(() => {
            this.updateSettings(dataSourceRow);
        }, delay);
    };

    onBlurRow = (...args) => {
        const dataSourceRow = this.setRowData(...args);

        clearTimeout(this.timerId);
        this.updateSettings(dataSourceRow);
    };

    setRowData = (value, item, index) => {
        const {products} = this.state;
        // const {target: {value}} = event;

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

    // onSearchBlur = (event) => {
    //     const {target: {value}} = event;
    //
    //     clearTimeout(this.timerIdSearch);
    //     this.fetchProducts(value);
    // };

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
                    width: 300,
                    render: (product) => (
                        <ProductItem
                            product={product}
                        />
                    )
                },

                {
                    title: 'Net Margin',
                    dataIndex: NET_MARGIN,
                    key: NET_MARGIN,
                    width: 150,
                    render: (index, item, indexRow) => (
                        <InputCurrency
                            value={item[NET_MARGIN]}
                            onChange={event =>
                                this.onChangeRow(event, NET_MARGIN, indexRow)
                            }
                            onBlur={event => this.onBlurRow(event, NET_MARGIN, indexRow)}
                        />
                    )
                },
                {
                    title: 'Min Bid (Manual Campaign)',
                    dataIndex: MIN_BID_MANUAL_CAMPING,
                    key: MIN_BID_MANUAL_CAMPING,
                    width: 150,
                    render: (index, item, indexRow) => (
                        <InputCurrency
                            value={item[MIN_BID_MANUAL_CAMPING]}
                            onChange={event =>
                                this.onChangeRow(event, MIN_BID_MANUAL_CAMPING, indexRow)
                            }
                            onBlur={event => this.onBlurRow(event, MIN_BID_MANUAL_CAMPING, indexRow)}
                        />
                    )
                },
                {
                    title: 'Max Bid (Manual Campaign)',
                    dataIndex: MAX_BID_MANUAL_CAMPING,
                    key: MAX_BID_MANUAL_CAMPING,
                    width: 150,
                    render: (index, item, indexRow) => (
                        <InputCurrency
                            value={item[MAX_BID_MANUAL_CAMPING]}
                            onChange={event =>
                                this.onChangeRow(event, MAX_BID_MANUAL_CAMPING, indexRow)
                            }
                            onBlur={event => this.onBlurRow(event, MAX_BID_MANUAL_CAMPING, indexRow)}
                        />
                    )
                },
                {
                    title: 'Min Bid (Auto Campaign)',
                    dataIndex: MIN_BID_AUTO_CAMPING,
                    key: MIN_BID_AUTO_CAMPING,
                    width: 150,
                    render: (index, item, indexRow) => (
                        <InputCurrency
                            value={item[MIN_BID_AUTO_CAMPING]}
                            onChange={event =>
                                this.onChangeRow(event, MIN_BID_AUTO_CAMPING, indexRow)
                            }
                            onBlur={event => this.onBlurRow(event, MIN_BID_AUTO_CAMPING, indexRow)}
                        />
                    )
                },
                {
                    title: 'Max Bid (Auto Campaign)',
                    dataIndex: MAX_BID_AUTO_CAMPING,
                    key: MAX_BID_AUTO_CAMPING,
                    width: 150,
                    render: (index, item, indexRow) => (
                        <InputCurrency
                            value={item[MAX_BID_AUTO_CAMPING]}
                            onChange={event =>
                                this.onChangeRow(event, MAX_BID_AUTO_CAMPING, indexRow)
                            }
                            onBlur={event => this.onBlurRow(event, MAX_BID_AUTO_CAMPING, indexRow)}
                        />
                    )
                },
                {
                    title: 'Total Changes',
                    dataIndex: TOTAL_CHANGES,
                    key: TOTAL_CHANGES,
                    width: 100,
                    render: (index, item) => (
                        <div style={{fontWeight: 600}}>{item[TOTAL_CHANGES]}</div>
                    )
                },
                {
                    title: 'Optimization Status',
                    dataIndex: OPTIMIZATION_STATUS,
                    key: OPTIMIZATION_STATUS,
                    width: 100,
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
