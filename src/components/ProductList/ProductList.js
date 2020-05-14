import React, {Component, Fragment, useEffect, useState} from 'react';
import ProductItem from './ProductItem';
import {connect, useDispatch, useSelector} from 'react-redux';
import {Input, Select, Spin, Switch} from 'antd';
import {productsActions} from '../../actions/products.actions';
import './ProductList.less';
import {debounce} from 'throttle-debounce';
import FilterFields from "./ProductFilters";
import CustomSelect from "../Select/Select";
import ProductPagination from "./ProductPagination";
import axios from "axios";
import InformationTooltip from "../Tooltip/Tooltip";
import {SVG} from "../../utils/icons";
import ProductFilters from "./ProductFilters";
import Pagination from "../Pagination/Pagination";

const CancelToken = axios.CancelToken;
let source = null;
const Option = Select.Option;
const {Search} = Input;

const ProductList = () => {
    const [isOpenList, setIsOpenList] = useState(true),
        [processing, setProcessing] = useState(false),
        [openedProduct, setOpenedProduct] = useState(null),
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

    // state = {
    //     isSelectedAll: false,
    //     prevProductId: '',
    //     onlyHasNew: false,
    //     closedList: false,
    //     campaign_type: 'all',
    //     campaign_status: 'all',
    //     openedProduct: '',
    //     onlyOptimization: this.props.onlyOptimization || false,
    //     onlyOnDayparting: this.props.onlyOnDayparting || false,
    //     ungroupVariations: this.props.pathname === '/ppc/scanner' ? 1 : 0,
    //     paginationParams: {
    //         size: 10,
    //         page: 1,
    //         searchStr: ''
    //     }
    // };
    //
    const getProductsList = () => {
        source && source.cancel();

        source = CancelToken.source();

        dispatch(productsActions.fetchProducts({
            ...paginationParams,
            // onlyOptimization: this.props.pathname !== '/ppc/scanner' ? this.state.onlyOptimization : false,
            // selectedAll: this.state.isSelectedAll,
            // ungroupVariations: this.state.ungroupVariations,
            // onlyOndayparting: this.state.onlyOnDayparting,
            cancelToken: source.token
        }))

        // this.props.getAllProducts({
        //     ...this.state.paginationParams,
        //     onlyOptimization: this.props.pathname !== '/ppc/scanner' ? this.state.onlyOptimization : false,
        //     selectedAll: this.state.isSelectedAll,
        //     onlyHasNew: this.props.pathname === '/ppc/report' ? this.state.onlyHasNew : false,
        //     ungroupVariations: this.state.ungroupVariations,
        //     pathname: this.props.pathname,
        //     type: this.props.pathname === '/ppc/dayparting' ? 'campaigns' : 'products',
        //     campaign_type: this.state.campaign_type,
        //     campaign_status: this.state.campaign_status,
        //     onlyOndayparting: this.state.onlyOnDayparting,
        //     cancelToken: source.token
        // });
    };
    //
    // selectChangeHandler = ({name, value}) => {
    //     this.setState({
    //         [name]: value,
    //         paginationParams: {
    //             ...this.state.paginationParams,
    //             page: 1
    //         }
    //     }, this.getProducts)
    // };
    //
    const openProductHandler = (id) => {
        setOpenedProduct(id === openedProduct ? null : id)
    };
    //
    // handleChangePagination = page => {
    //     if (+page !== this.state.paginationParams.page) {
    //         this.setState(
    //             {
    //                 ...this.state,
    //                 paginationParams: {
    //                     ...this.state.paginationParams,
    //                     page: page ? +page : 1
    //                 }
    //             },
    //             this.getProducts
    //         );
    //     }
    // };
    //
    // handleChangePageSize = (pageSize) => {
    //     this.setState(
    //         {
    //             ...this.state,
    //             paginationParams: {
    //                 ...this.state.paginationParams,
    //                 page: 1,
    //                 size: pageSize
    //             }
    //         },
    //         this.getProducts
    //     );
    // };
    //
    // handleChangeSwitch = (event, type) => {
    //     type === 'onlyOptimization' && this.props.showOnlyOptimized(event);
    //     type === 'onlyOnDayparting' && this.props.showOnlyOnDayparting(event);
    //
    //     this.setState(
    //         {
    //             [type]: event,
    //             isSelectedAll: false,
    //             paginationParams: {
    //                 ...this.state.paginationParams,
    //                 page: 1
    //             }
    //         },
    //         this.getProducts
    //     );
    // };
    //
    // handleSearch = debounce(500, false, str => {
    //     this.setState(
    //         {
    //             ...this.state,
    //             paginationParams: {
    //                 ...this.state.paginationParams,
    //                 searchStr: str,
    //                 page: 1
    //             }
    //         },
    //         this.getProducts
    //     );
    // });
    //
    const selectAllHandler = (value) => {
        dispatch(productsActions.selectAll(value));
    };

    const selectLastProductHandler = () => {
        if (productList.find(product => product.id === selectedProduct.id)) {
            selectAllHandler(false);
        } else {
            onSelect(productList[0])
            selectAllHandler(false);
        }
    }

    const onSelect = product => {
        if (selectedProduct.id !== product.id) {
            dispatch(productsActions.fetchProductDetails(product));
        }
    };

    //
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if (this.props.pathname !== prevProps.pathname) {
    //         if (this.props.pathname === '/ppc/optimization' && this.state.onlyHasNew) {
    //             this.setState({
    //                 paginationParams: {
    //                     ...this.state.paginationParams,
    //                     page: 1,
    //                     searchStr: ''
    //                 }
    //             }, this.getProducts);
    //         } else if (this.props.pathname === '/ppc/report' && this.state.onlyHasNew) {
    //             this.setState({
    //                 paginationParams: {
    //                     ...this.state.paginationParams,
    //                     page: 1,
    //                     searchStr: ''
    //                 }
    //             }, this.getProducts);
    //         }
    //
    //         if (this.props.pathname === '/ppc/scanner') {
    //             this.setState({
    //                 paginationParams: {
    //                     ...this.state.paginationParams,
    //                     page: 1,
    //                     searchStr: ''
    //                 },
    //                 ungroupVariations: 1
    //             }, this.getProducts)
    //         } else if (this.props.pathname !== '/ppc/scanner' && this.state.ungroupVariations === 1) {
    //             this.setState({
    //                 paginationParams: {
    //                     ...this.state.paginationParams,
    //                     page: 1,
    //                     searchStr: ''
    //                 },
    //                 ungroupVariations: 0
    //             }, this.getProducts)
    //         }
    //
    //         if (this.props.pathname === '/ppc/dayparting') {
    //             this.props.selectAllProducts(false);
    //             this.props.showOnlyOptimized(false);
    //
    //             this.setState({
    //                 paginationParams: {
    //                     ...this.state.paginationParams,
    //                     page: 1,
    //                     searchStr: ''
    //                 },
    //                 isSelectedAll: false,
    //                 onlyOptimization: false,
    //             }, this.getProducts);
    //
    //         } else if (prevProps.pathname === '/ppc/dayparting' && this.props.pathname !== '/ppc/dayparting') {
    //             this.setState({
    //                 paginationParams: {
    //                     ...this.state.paginationParams,
    //                     page: 1,
    //                     searchStr: ''
    //                 }
    //             }, this.getProducts);
    //
    //         }
    //     }
    // }
    //
    // componentDidMount() {
    //     this.getProducts();
    // }

    useEffect(() => {
        getProductsList();
    }, [])

    return (
        <Fragment>
            <div className={`${isOpenList ? 'product-list' : 'product-list closed'}`}>

                <ProductFilters
                    selectedAll={selectedAll}
                    selectedProduct={selectedProduct}
                    onlyOptimization={onlyOptimization}
                    totalSize={totalSize}

                    onSelectAll={selectAllHandler}
                    onSelectLastProduct={selectLastProductHandler}
                />

                {processing && <div className='fetching-data'><Spin size={'large'}/></div>}

                <div className='products-list'>
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
                    page={paginationParams.page}
                    pageSizeOptions={[10, 30, 50]}
                    pageSize={paginationParams.pageSize}
                    totalSize={totalSize}
                    processing={fetching}
                    listLength={productList && productList.length}
                />

                {/*{pathname !== '/ppc/dayparting' ?*/}
                {/*    :*/}
                {/*    <div className='campaigns-list'>*/}
                {/*        {products && products.map(item => (*/}
                {/*            <div*/}
                {/*                key={item.id}*/}
                {/*                className={selectedProduct.id === item.id ? 'campaign-item active' : 'campaign-item'}*/}
                {/*                onClick={() => this.onSelect(item)}*/}
                {/*                title={item.name}*/}
                {/*            >*/}
                {/*                {item.hasEnabledDayparting && <InformationTooltip*/}
                {/*                    arrowPointAtCenter={true}*/}
                {/*                    type={'custom'}*/}
                {/*                    description={'Campaign on day-parting'}*/}
                {/*                    position={'topRight'}*/}
                {/*                >*/}
                {/*                    <div className='on-optimization'/>*/}
                {/*                </InformationTooltip>}*/}


                {/*                <span className={'short-name'}>{item.name}</span>*/}
                {/*            </div>*/}
                {/*        ))}*/}
                {/*    </div>*/}
                {/*}*/}


                {/*<ProductPagination*/}
                {/*    page={page}*/}
                {/*    totalSize={totalSize}*/}
                {/*    size={size}*/}
                {/*    onChangePagination={this.handleChangePagination}*/}
                {/*/>*/}

                <div className={`switch-list ${isOpenList ? 'opened' : 'closed'}`}>
                    <div className="image" onClick={() => this.setState({closedList: !isOpenList})}>
                        <SVG id='select-icon'/>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
//
// const mapStateToProps = state => ({
//     products: state.products.productList,
//     totalSize: state.products.totalSize,
//     selectedProduct: state.products.selectedProduct,
//     onlyOptimization: state.products.onlyOptimization,
//     onlyOnDayparting: state.products.onlyOnDayparting,
//     fetching: state.products.fetching
// });
//
// const mapDispatchToProps = dispatch => ({
//     getAllProducts: params => {
//         dispatch(productsActions.fetchProducts(params));
//     },
//     selectProduct: (product, pathname) => {
//         dispatch(productsActions.fetchProductDetails(product, pathname));
//     },
//     showOnlyOptimized: (data) => {
//         dispatch(productsActions.showOnlyOptimized(data));
//     },
//     showOnlyOnDayparting: (data) => {
//         dispatch(productsActions.showOnlyOnDayparting(data));
//     },
//     selectAllProducts: (data) => {
//         dispatch(productsActions.selectAll(data));
//     },
// });

export default React.memo(ProductList);
