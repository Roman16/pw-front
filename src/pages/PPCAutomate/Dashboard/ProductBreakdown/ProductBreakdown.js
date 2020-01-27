import React, {useState, useEffect} from "react";
import {Spin, Switch} from "antd";
import {useDispatch, useSelector} from 'react-redux';
import {dashboardServices} from '../../../../services/dashboard.services';
import './ProductBreakdown.less';
import ProductsList from "./ProductsList";
import {dashboardActions} from "../../../../actions/dashboard.actions";
import {productsActions} from "../../../../actions/products.actions";
import axios from "axios";

const CancelToken = axios.CancelToken;
let source = null;

const initialFetchParams = {
    page: 1,
    size: 4,
    totalSize: 0,
    searchText: ''
};


const ProductBreakdown = () => {
    const dispatch = useDispatch();
    const {selectedProduct, selectedRangeDate, onlyOptimization, hasMargin} = useSelector(state => ({
        selectedProduct: state.dashboard.selectedProduct,
        selectedRangeDate: state.dashboard.selectedRangeDate,
        onlyOptimization: state.products.onlyOptimization,
        hasMargin: state.dashboard.hasMargin || false
    }));
    const [fetchParams, changeFetchParams] = useState({
            ...initialFetchParams,
            onlyOptimization: onlyOptimization || false
        }),
        [products, updateProductsList] = useState([]);
    const [fetching, switchFetch] = useState(false);

    let timerIdSearch = null;

    const getProducts = () => {
        switchFetch(true);
        source = CancelToken.source();

        dashboardServices.fetchProducts({
            ...fetchParams,
            startDate: selectedRangeDate.startDate,
            endDate: selectedRangeDate.endDate,
            cancelToken: source.token
        })
            .then(res => {
                switchFetch(false);

                updateProductsList(res.result);
                dispatch(dashboardActions.setProductsMarginStatus(res.all_products_has_margin));
                changeFetchParams({
                    ...fetchParams,
                    totalSize: res.totalSize
                });

            })
            .catch(error => {
                console.log(error);
            })
    };

    const handleChangeSwitch = e => {
        dispatch(productsActions.showOnlyOptimized(e));

        changeFetchParams({
            ...fetchParams,
            onlyOptimization: e,
            page: 1,
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
        }, 1000);
    };

    const handlePaginationChange = page => changeFetchParams({...fetchParams, page: page});

    const handleSelectProduct = (id) => {
        dispatch(dashboardActions.selectProduct(id))
    };

    useEffect(() => {
        source && source.cancel();
        getProducts();
    }, [fetchParams.page, fetchParams.searchText, fetchParams.onlyOptimization, selectedRangeDate]);

    return (
        <div className='product-breakdown'>
            <div className="title">
                <span> Product Breakdown</span>

                <div className='switch-block'>
                    On optimization only

                    <Switch
                        checked={onlyOptimization}
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
                    hasMargin={hasMargin}
                />
            </div>

            {fetching && <div className="loading">
                <Spin size="large"/>
            </div>}
        </div>
    )
};

export default ProductBreakdown;