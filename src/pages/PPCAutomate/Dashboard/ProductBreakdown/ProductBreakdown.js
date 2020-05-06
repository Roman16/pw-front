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

    console.log(selectedProduct);

    return (
        <div className='product-breakdown'>
            <div className="title">
                Product Breakdown
            </div>

            <div className="filters">
                <div className="form-group">
                    <Search
                        className="search-field"
                        placeholder={'Search'}
                        // onChange={e => onSearch(e.target.value)}
                        data-intercom-target='search-field'
                        suffix={<SVG id={'search'}/>}
                    />
                </div>

                <div className='switch-block'>
                    <Switch
                        checked={onlyOptimization}
                        onChange={handleChangeSwitch}
                    />

                    On optimization only
                </div>

                <div className="product-selected">
                    <span>
                       <b>{selectedProduct == null ? fetchParams.totalSize : '1'}</b> selected
                    </span>

                    <div className="select-switch">
                        <button className={selectedProduct == null && 'active'}>
                            <SVG id={'all-selected-icon'}/>
                        </button>

                        <button className={selectedProduct !== null && 'active'}>
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
                    onSearchChange={onSearchChange}
                    handlePaginationChange={handlePaginationChange}
                    onSelect={handleSelectProduct}

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