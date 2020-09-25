import React, {Fragment, useEffect, useState} from 'react';
import ProductItem from './ProductItem';
import {useDispatch, useSelector} from 'react-redux';
import {Spin} from 'antd';
import {productsActions} from '../../actions/products.actions';
import './ProductList.less';
import {debounce} from 'throttle-debounce';
import axios from "axios";
import {SVG} from "../../utils/icons";
import ProductFilters from "./ProductFilters";
import Pagination from "../Pagination/Pagination";

const CancelToken = axios.CancelToken;
let source = null;

let prevPathname = '';

const ProductList = ({pathname}) => {
    const [isOpenList, setIsOpenList] = useState(true),
        [ungroupVariations, setUngroupVariations] = useState(0),
        [openedProduct, setOpenedProduct] = useState(null),
        [searchStr, setSearchStr] = useState(''),
        [paginationParams, setPaginationParams] = useState({
            page: 1,
            pageSize: 10
        });

    const {selectedAll, selectedProduct, onlyOptimization, productList, totalSize, fetching} = useSelector(state => ({
        selectedAll: state.products.selectedAll,
        selectedProduct: state.products.selectedProduct,
        onlyOptimization: state.products.onlyOptimization,
        productList: state.products.productList,
        totalSize: state.products.totalSize,
        fetching: state.products.fetching,
    }));

    const dispatch = useDispatch();

    const getProductsList = () => {
        source && source.cancel();
        source = CancelToken.source();

        dispatch(productsActions.fetchProducts({
            ...paginationParams,
            searchStr,
            selectedAll,
            ungroupVariations,

            onlyOptimization: onlyOptimization,
            cancelToken: source.token
        }))
    };

    const openProductHandler = (id) => {
        setOpenedProduct(id === openedProduct ? null : id)
    };

    const changePaginationHandler = params => {
        setPaginationParams(params)
    };

    const changeSwitchHandler = (event) => {
        dispatch(productsActions.showOnlyOptimized(event));
        setPaginationParams({
            ...paginationParams,
            page: 1
        })
    };

    const changeSearchHandler = debounce(500, false, str => {
        setSearchStr(str);
        setPaginationParams({
            ...paginationParams,
            page: 1
        })
    });

    const selectAllHandler = (value) => {
        dispatch(productsActions.selectAll(value));
    };

    const selectLastProductHandler = () => {
        if (productList.find(product => product.id === selectedProduct.id)) {
            selectAllHandler(false);
        } else if (productList[0]) {
            onSelect(productList[0])
            selectAllHandler(false);
        } else {
            onSelect({})
            selectAllHandler(false);
        }
    }

    const onSelect = product => {
        if (selectedProduct.id !== product.id) {
            dispatch(productsActions.fetchProductDetails(product));
        }
    };

    useEffect(() => {
        if(pathname === '/ppc/optimization' && selectedAll) {
            dispatch(productsActions.fetchProductDetails(productList[0]));
            selectAllHandler(false);
        } else if (pathname === '/ppc/scanner') {
            selectAllHandler(false);
            setUngroupVariations(1);
        } else if (prevPathname === '/ppc/scanner' && pathname !== '/ppc/scanner') {
            setUngroupVariations(0);
        }

        prevPathname = pathname;
    }, [pathname])

    useEffect(() => {
        getProductsList();

        return (() => {
            dispatch(productsActions.setProductsList([]))
            dispatch(productsActions.updateProduct({}))
        })
    }, [paginationParams, searchStr, onlyOptimization, ungroupVariations])

    return (
        <Fragment>
            <div className={`${isOpenList ? 'product-list' : 'product-list closed'}`}>

                <ProductFilters
                    selectedAll={selectedAll}
                    selectedProduct={selectedProduct}
                    onlyOptimization={onlyOptimization}
                    totalSize={totalSize}
                    pathname={pathname}

                    onSearch={changeSearchHandler}
                    onSelectAll={selectAllHandler}
                    onSelectLastProduct={selectLastProductHandler}
                    onShowOnlyOnOptimization={changeSwitchHandler}
                />

                {fetching && <div className='fetching-data'><Spin size={'large'}/></div>}


                <div className={`products`}>

                    {productList && productList.map(product => (
                        <ProductItem
                            key={product.id}
                            product={product}
                            isActive={
                                selectedAll ||
                                selectedProduct.id === product.id
                            }
                            onClick={item => onSelect(item)}
                            onOpenChild={openProductHandler}
                            openedProduct={openedProduct}
                            products={productList}
                        />
                    ))}
                </div>

                <Pagination
                    onChange={changePaginationHandler}

                    page={paginationParams.page}
                    pageSizeOptions={[10, 30, 50]}
                    pageSize={paginationParams.pageSize}
                    totalSize={totalSize}
                    processing={fetching}
                    listLength={productList && productList.length}
                />
            </div>

            <div className={`switch-list ${isOpenList ? 'opened' : 'closed'}`}>
                <button onClick={() => setIsOpenList(prevState => !prevState)}>
                    <div className="image">
                        <SVG id='select-icon'/>
                    </div>
                </button>
            </div>
        </Fragment>
    )
}

export default React.memo(ProductList);
