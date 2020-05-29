import React, {useState, useEffect} from "react";
import {Input, Spin, Switch} from "antd";
import {useDispatch, useSelector} from 'react-redux';
import {dashboardServices} from '../../../../services/dashboard.services';
import './ProductBreakdown.less';
import ProductsList from "./ProductsList";
import {dashboardActions} from "../../../../actions/dashboard.actions";
import {productsActions} from "../../../../actions/products.actions";
import axios from "axios";
import {SVG} from "../../../../utils/icons";

const CancelToken = axios.CancelToken;
let source = null;
const Search = Input.Search;

let prevProductId;

const ProductBreakdown = () => {
    const dispatch = useDispatch();
    const {selectedProduct, selectedRangeDate, onlyOptimization, hasMargin} = useSelector(state => ({
        selectedProduct: state.dashboard.selectedProduct,
        selectedRangeDate: state.dashboard.selectedRangeDate,
        onlyOptimization: state.products.onlyOptimization,
        hasMargin: state.dashboard.hasMargin || false
    }));
    const [fetchParams, changeFetchParams] = useState({
            page: 1,
            pageSize: 10,
            totalSize: 0,
            searchText: '',
            onlyOptimization: onlyOptimization || false,
            onlyActive: false
        }),
        [products, updateProductsList] = useState([]);
    const [fetching, switchFetch] = useState(false);
    const [fetchingError, setFetchingError] = useState(false);

    let timerIdSearch = null;

    const getProducts = () => {
        switchFetch(true);
        setFetchingError(false);
        source = CancelToken.source();

        dashboardServices.fetchProducts({
            ...fetchParams,
            startDate: selectedRangeDate.startDate,
            endDate: selectedRangeDate.endDate,
            cancelToken: source.token
        })
            .then(res => {
                switchFetch(false);

                if (res.result.length === 1) {
                    handleSelectProduct(res.result[0].product.id)
                }

                updateProductsList(res.result);
                dispatch(dashboardActions.setProductsMarginStatus(res.all_products_has_margin));
                changeFetchParams({
                    ...fetchParams,
                    totalSize: res.totalSize
                });

            })
            .catch(error => {
                switchFetch(false);
                setFetchingError(true)
            })
    };

    const handleChangeSwitch = (type, value) => {
        if (type === 'onlyOptimization') {
            dispatch(productsActions.showOnlyOptimized(value));
        }

        changeFetchParams({
            ...fetchParams,
            [type]: value,
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

    const handlePaginationChange = params => changeFetchParams({...fetchParams, ...params});

    const handleSelectProduct = (id) => {
        dispatch(dashboardActions.selectProduct(id))
    };

    const selectAllProduct = () => {
        prevProductId = selectedProduct;
        dispatch(dashboardActions.selectProduct(null))
    }

    const selectPrevProduct = () => {
        if (products) {
            if (!prevProductId) {
                handleSelectProduct(products[0].product.id)
            } else if (products.find(product => product.product.id === prevProductId)) {
                handleSelectProduct(prevProductId)
            } else if (products.length > 0) {
                handleSelectProduct(products[0].product.id)
            }
        } else {
            handleSelectProduct(null)
        }
    }

    useEffect(() => {
        source && source.cancel();
        getProducts();
    }, [fetchParams.page, fetchParams.pageSize, fetchParams.searchText, fetchParams.onlyOptimization,fetchParams.onlyActive, selectedRangeDate]);


    return (
        <div className='product-breakdown'>
            <div className="title">
                Product Breakdown
            </div>

            <div className="filters">
                <div className="form-group">
                    <Search
                        className="search-field"
                        placeholder={'Search by product name, ASIN or SKU'}
                        onChange={onSearchChange}
                        data-intercom-target='search-field'
                        suffix={<SVG id={'search'}/>}
                    />
                </div>

                <div className='switch-block'>
                    <Switch
                        checked={onlyOptimization}
                        onChange={(e) => handleChangeSwitch('onlyOptimization', e)}
                    />

                    On optimization only
                </div>

                <div className='switch-block'>
                    <Switch
                        checked={fetchParams.onlyActive}
                        onChange={(e) => handleChangeSwitch('onlyActive', e)}
                    />

                    Only active on Amazon
                </div>

                <div className="product-selected">
                    <span>
                       <b>{(!products || products.length === 0) ? '0' : selectedProduct == null ? fetchParams.totalSize || 0 : '1'}</b> selected
                    </span>

                    <div className="select-switch">
                        <button className={selectedProduct == null && 'active'} onClick={selectAllProduct}>
                            <SVG id={'all-selected-icon'}/>
                        </button>

                        <button className={selectedProduct !== null && 'active'} onClick={selectPrevProduct}>
                            <SVG id={'one-selected-icon'}/>
                        </button>
                    </div>
                </div>
            </div>

            <div className='products-table'>
                <ProductsList
                    fetchParams={fetchParams}
                    products={products}
                    selectedProduct={selectedProduct}
                    hasMargin={hasMargin}
                    handlePaginationChange={handlePaginationChange}
                    onSelect={handleSelectProduct}
                    fetching={fetching}
                />
            </div>

            {fetching && <div className="loading">
                <Spin size="large"/>
            </div>}

            {fetchingError && <div className="loading">
                <button className='btn default' onClick={getProducts}>reload</button>
            </div>}
        </div>
    )
};

export default ProductBreakdown;