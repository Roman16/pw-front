import React, {useState, useEffect} from "react";
import {Switch} from "antd";
import {dashboardServices} from '../../../../services/dashboard.services';
import './ProductBreakdown.less';
import ProductsList from "./ProductsList";

const initialFetchParams = {
    page: 1,
    size: 4,
    totalSize: 0,
    onlyOptimization: false,
    searchText: ''
};


const ProductBreakdown = () => {
    const [fetchParams, changeFetchParams] = useState(initialFetchParams),
        [products, updateProductsList] = useState([]);

    let timerIdSearch = null;

    const getProducts = () => {
        dashboardServices.fetchProducts(fetchParams)
            .then(res => {
                updateProductsList(res.result);
                changeFetchParams({
                    ...fetchParams,
                    totalSize: res.totalSize
                });
            })
    };

    const handleChangeSwitch = e => {
        changeFetchParams({
            ...fetchParams,
            page: 1,
            onlyOptimization: e
        });

    };

    const onSearchChange = ({target: {value}}) => {
        clearTimeout(timerIdSearch);
        timerIdSearch = setTimeout(() => {
            changeFetchParams({
                ...fetchParams,
                searchText: value,
                page: 1
            });
        }, 500);
    };

    const handlePaginationChange = page => changeFetchParams({...fetchParams, page: page});


    useEffect(getProducts, [fetchParams.page, fetchParams.searchText, fetchParams.onlyOptimization]);

    return (
        <div className='product-breakdown'>
            <div className="title">
                <span> Product Breakdown</span>

                <div className='switch-block'>
                    On optimization only

                    <Switch
                        onChange={handleChangeSwitch}
                    />
                </div>
            </div>

            <div className='products-table'>
                <ProductsList
                    fetchParams={fetchParams}
                    products={products}
                    onSearchChange={onSearchChange}
                    handlePaginationChange={handlePaginationChange}
                />
            </div>
        </div>
    )
};

export default ProductBreakdown;