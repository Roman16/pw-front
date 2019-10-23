import React, {Component} from 'react';
import {func, arrayOf, object} from 'prop-types';
import {Input} from 'antd';
import InputCurrency from '../../../../components/Inputs/InputCurrency';
import Table from '../../../../components/Table/Table';
import ProductItem from '../../../../components/ProductList/ProductItem';
import TableSettings from './TableSettings';
import {productsServices} from '../../../../services/products.services';

import './TableSettings.less';
import axios from "axios";

const ACTIVE = 'active';
const PRODUCT = 'product';
const NET_MARGIN = 'net-margin';
const MIN_BID_MANUAL_CAMPING = 'min-bid-manual-campaign';
const MAX_BID_MANUAL_CAMPING = 'max-bid-manual-campaign';
const MIN_BID_AUTO_CAMPING = 'min-bid-auto-campaign';
const MAX_BID_AUTO_CAMPING = 'max-bid-auto-campaign';
const TOTAL_CHANGES = 'total-changes';
const OPTIMIZATION_STATUS = 'optimization-status';
const delay = 500; // ms

class ProductsList extends Component {
    state = {
        products: [],
        page: 1,
        size: 10
    };

    timerId = null;
    timerIdSearch = null;

    fetchProducts = async (searchText = '') => {
        const {page, size} = this.state;

        const data = await productsServices.getProducts({search_query: searchText, page: page, size: size});
        this.setState({products: data});
    };

    updateProduct = async (data) => {
         await productsServices.updateProductById(data);
    };

    onChangeRow = (...args) => {
        const dataSourceRow = this.setRowData(...args);

        clearTimeout(this.timerId);
        this.timerId = setTimeout(() => {
            this.updateData(dataSourceRow);
        }, delay);
    };

    setRowData = (event, item, index) => {
        const {products} = this.state;
        const {target: {value}} = event;

        products[index] = {
            ...products[index],
            [item]: +value,
        };
        this.setState({
            dataSource: [...products],
        });

        return products[index];
    };

    onSearchChange = ({target: {value}}) => {
        clearTimeout(this.timerIdSearch);
        this.timerIdSearch = setTimeout(() => {
            this.fetchProducts(value);
        }, delay);
    };


    componentDidMount() {
        this.fetchProducts()
    }

    render() {
        const {dataSource, onBlurRow, onSearchBlur} = this.props,

            columns = [
                {
                    title: () => (
                        <div className="input-search">
                            <Input.Search
                                onChange={this.onSearchChange}
                                onBlur={onSearchBlur}
                            />
                        </div>
                    ),
                    dataIndex: PRODUCT,
                    key: PRODUCT,
                    width: 300,
                    render: ({id, asin, product_name, sku, product_image}) => (
                        <ProductItem
                            asin={asin}
                            captions={product_name}
                            imageUrl={product_image}
                            sku={sku}
                            key={id}
                        />
                    )
                },

                {
                    title: 'Net Margin',
                    dataIndex: NET_MARGIN,
                    key: NET_MARGIN,
                    render: (index, item, indexRow) => (
                        <InputCurrency
                            value={item[NET_MARGIN]}
                            onChange={event =>
                                this.onChangeRow(event, NET_MARGIN, indexRow)
                            }
                            onBlur={event => onBlurRow(event, NET_MARGIN, indexRow)}
                        />
                    )
                },
                {
                    title: 'Min Bid (Manual Campaign)',
                    dataIndex: MIN_BID_MANUAL_CAMPING,
                    key: MIN_BID_MANUAL_CAMPING,
                    render: (index, item, indexRow) => (
                        <InputCurrency
                            value={item[MIN_BID_MANUAL_CAMPING]}
                            onChange={event =>
                                this.onChangeRow(event, MIN_BID_MANUAL_CAMPING, indexRow)
                            }
                            onBlur={event =>
                                onBlurRow(event, MIN_BID_MANUAL_CAMPING, indexRow)
                            }
                        />
                    )
                },
                {
                    title: 'Max Bid (Manual Campaign)',
                    dataIndex: MAX_BID_MANUAL_CAMPING,
                    key: MAX_BID_MANUAL_CAMPING,
                    render: (index, item, indexRow) => (
                        <InputCurrency
                            value={item[MAX_BID_MANUAL_CAMPING]}
                            onChange={event =>
                                this.onChangeRow(event, MAX_BID_MANUAL_CAMPING, indexRow)
                            }
                            onBlur={event =>
                                onBlurRow(event, MAX_BID_MANUAL_CAMPING, indexRow)
                            }
                        />
                    )
                },
                {
                    title: 'Min Bid (Auto Campaign)',
                    dataIndex: MIN_BID_AUTO_CAMPING,
                    key: MIN_BID_AUTO_CAMPING,
                    render: (index, item, indexRow) => (
                        <InputCurrency
                            value={item[MIN_BID_AUTO_CAMPING]}
                            onChange={event =>
                                this.onChangeRow(event, MIN_BID_AUTO_CAMPING, indexRow)
                            }
                            onBlur={event =>
                                onBlurRow(event, MIN_BID_AUTO_CAMPING, indexRow)
                            }
                        />
                    )
                },
                {
                    title: 'Max Bid (Auto Campaign)',
                    dataIndex: MAX_BID_AUTO_CAMPING,
                    key: MAX_BID_AUTO_CAMPING,
                    render: (index, item, indexRow) => (
                        <InputCurrency
                            value={item[MAX_BID_AUTO_CAMPING]}
                            onChange={event =>
                                this.onChangeRow(event, MAX_BID_AUTO_CAMPING, indexRow)
                            }
                            onBlur={event =>
                                onBlurRow(event, MAX_BID_AUTO_CAMPING, indexRow)
                            }
                        />
                    )
                },
                {
                    title: 'Total Changes',
                    dataIndex: TOTAL_CHANGES,
                    key: TOTAL_CHANGES,
                    render: (index, item) => (
                        <div style={{fontWeight: 600}}>{item[TOTAL_CHANGES]}</div>
                    )
                },
                {
                    title: 'Optimization Status',
                    dataIndex: OPTIMIZATION_STATUS,
                    key: OPTIMIZATION_STATUS,
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
                defaultPageSize: 10,
                page: 0,
            };

        return (
            <div className="table-settings">
                <Table
                    rowKey="id"
                    dataSource={dataSource}
                    columns={columns}
                    pagination={paginationOption}
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

export default TableSettings(ProductsList);
