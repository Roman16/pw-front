import React, {useState, useEffect} from "react";
import {Switch} from "antd";
import {useDispatch, useSelector} from 'react-redux';
import {dashboardServices} from '../../../../services/dashboard.services';
import './ProductBreakdown.less';
import ProductsList from "./ProductsList";
import {dashboardActions} from "../../../../actions/dashboard.actions";
import moment from "moment";

const initialFetchParams = {
    page: 1,
    size: 4,
    totalSize: 0,
    onlyOptimization: false,
    searchText: ''
};


const ProductBreakdown = () => {
    const dispatch = useDispatch();
    const {selectedProduct, selectedRangeDate} = useSelector(state => ({
        selectedProduct: state.dashboard.selectedProduct,
        selectedRangeDate: state.dashboard.selectedRangeDate,
    }));
    const [fetchParams, changeFetchParams] = useState(initialFetchParams),
        [products, updateProductsList] = useState([]);

    let timerIdSearch = null;

    const getProducts = () => {
        dashboardServices.fetchProducts({
            ...fetchParams,
            startDate: moment(selectedRangeDate.startDate),
            endDate: moment(selectedRangeDate.endDate),
        })
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

    const handleSelectProduct = (id) => {
        dispatch(dashboardActions.selectProduct(id))
    };

    useEffect(getProducts, [fetchParams.page, fetchParams.searchText, fetchParams.onlyOptimization, selectedRangeDate]);

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
                    onSelect={handleSelectProduct}
                    selectedProduct={selectedProduct}
                />
            </div>
        </div>
    )
};

export default ProductBreakdown;