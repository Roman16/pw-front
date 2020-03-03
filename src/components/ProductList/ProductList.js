import React, {Component, Fragment} from 'react';
import ProductItem from './ProductItem';
import {connect} from 'react-redux';
import {Select, Spin} from 'antd';
import {productsActions} from '../../actions/products.actions';
import './ProductList.less';
import {debounce} from 'throttle-debounce';
import FilterFields from "./FilterFields";
import CustomSelect from "../Select/Select";
import ProductPagination from "./ProductPagination";
import selectIcon from "../../assets/img/icons/select-icon.svg";
import axios from "axios";
import InformationTooltip from "../Tooltip/Tooltip";

const CancelToken = axios.CancelToken;
let source = null;
const Option = Select.Option;

class ProductList extends Component {
    state = {
        isSelectedAll: false,
        prevProductId: '',
        onlyOptimization: this.props.onlyOptimization || false,
        onlyHasNew: false,
        closedList: false,
        campaign_type: 'all',
        campaign_status: 'all',
        openedProduct: '',
        ungroupVariations: this.props.pathname === '/ppc/scanner' ? 1 : 0,
        paginationParams: {
            size: 10,
            page: 1,
            searchStr: ''
        }
    };

    getProducts = () => {
        source && source.cancel();

        source = CancelToken.source();

        this.props.getAllProducts({
            ...this.state.paginationParams,
            onlyOptimization: this.props.pathname !== '/ppc/scanner' ? this.state.onlyOptimization : false,
            selectedAll: this.state.isSelectedAll,
            onlyHasNew: this.props.pathname === '/ppc/report' ? this.state.onlyHasNew : false,
            ungroupVariations: this.state.ungroupVariations,
            pathname: this.props.pathname,
            type: this.props.pathname === '/ppc/dayparting' ? 'campaigns' : 'products',
            campaign_type: this.state.campaign_type,
            campaign_status: this.state.campaign_status,
            cancelToken: source.token
        });
    };

    selectChangeHandler = ({name, value}) => {
        this.setState({
            [name]: value
        }, this.getProducts)
    };

    changeOpenedProduct = (id) => {
        this.setState({
            openedProduct: id === this.state.openedProduct ? null : id
        })
    };

    handleChangePagination = page => {
        if (+page !== this.state.paginationParams.page) {
            this.setState(
                {
                    ...this.state,
                    paginationParams: {
                        ...this.state.paginationParams,
                        page: page ? +page : 1
                    }
                },
                this.getProducts
            );
        }
    };

    handleChangePageSize = (pageSize) => {
        this.setState(
            {
                ...this.state,
                paginationParams: {
                    ...this.state.paginationParams,
                    page: 1,
                    size: pageSize
                }
            },
            this.getProducts
        );
    };

    handleChangeSwitch = (event, type) => {
        type === 'onlyOptimization' && this.props.showOnlyOptimized(event);

        this.setState(
            {
                [type]: event,
                isSelectedAll: false,
                paginationParams: {
                    ...this.state.paginationParams,
                    page: 1
                }
            },
            this.getProducts
        );
    };

    handleSearch = debounce(500, false, str => {
        this.setState(
            {
                ...this.state,
                paginationParams: {
                    ...this.state.paginationParams,
                    searchStr: str,
                    page: 1
                }
            },
            this.getProducts
        );
    });

    selectAll = () => {
        const {selectProduct, selectedProduct, products} = this.props;
        selectedProduct.id &&
        this.setState({prevProductId: selectedProduct.id});

        this.setState(
            ({isSelectedAll}) => ({
                isSelectedAll: !isSelectedAll
            }),
            () => {
                if (this.state.isSelectedAll) selectProduct('all');
                else {
                    selectProduct(
                        products.find(
                            item => item.id === this.state.prevProductId
                        )
                    );
                }
            }
        );
    };

    onSelect = product => {
        const {selectProduct, selectedProduct} = this.props;
        if (selectedProduct.id !== product.id) selectProduct(product, this.props.pathname);

        this.setState({
            isSelectedAll: false
        });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.pathname !== prevProps.pathname) {
            if (this.props.pathname === '/ppc/optimization' && this.state.onlyHasNew) {
                this.setState({
                    paginationParams: {
                        ...this.state.paginationParams,
                        page: 1,
                        searchStr: ''
                    }
                }, this.getProducts);
            } else if (this.props.pathname === '/ppc/report' && this.state.onlyHasNew) {
                this.setState({
                    paginationParams: {
                        ...this.state.paginationParams,
                        page: 1,
                        searchStr: ''
                    }
                }, this.getProducts);
            }

            if (this.props.pathname === '/ppc/scanner') {
                this.setState({
                    paginationParams: {
                        ...this.state.paginationParams,
                        page: 1,
                        searchStr: ''
                    },
                    ungroupVariations: 1
                }, this.getProducts)
            } else if (this.props.pathname !== '/ppc/scanner' && this.state.ungroupVariations === 1) {
                this.setState({
                    paginationParams: {
                        ...this.state.paginationParams,
                        page: 1,
                        searchStr: ''
                    },
                    ungroupVariations: 0
                }, this.getProducts)
            }

            if (this.props.pathname === '/ppc/dayparting') {
                this.setState({
                    paginationParams: {
                        ...this.state.paginationParams,
                        page: 1,
                        searchStr: ''
                    }
                }, this.getProducts);

            } else if (prevProps.pathname === '/ppc/dayparting' && this.props.pathname !== '/ppc/dayparting') {
                this.setState({
                    paginationParams: {
                        ...this.state.paginationParams,
                        page: 1,
                        searchStr: ''
                    }
                }, this.getProducts);

            }
        }
    }

    componentDidMount() {
        this.getProducts();
    }

    render() {
        const {
                selectedSize,
                isSelectedAll,
                openedProduct,
                onlyHasNew,
                closedList,
                paginationParams: {size, page}
            } = this.state,
            {products, selectedProduct, totalSize, onlyOptimization, pathname, fetching} = this.props;

        return (
            <Fragment>
                <div
                    className={`${closedList ? 'product-list closed' : 'product-list'}`}>
                    <div className="switch-list">
                        <div className="image" onClick={() => this.setState({closedList: !closedList})}>
                            <img src={selectIcon} alt=""/>
                        </div>
                    </div>

                    <FilterFields
                        onSearch={this.handleSearch}
                        onSelectAll={this.selectAll}
                        onChangeSwitch={this.handleChangeSwitch}
                        onChangeSelect={this.selectChangeHandler}

                        pathname={pathname}
                        selectedSize={selectedSize}
                        isSelectedAll={isSelectedAll}
                        onlyHasNew={onlyHasNew}
                        disabled={!products || (products && products.length === 0) || this.props.pathname === '/ppc/scanner'}
                    />

                    <div className='page-items-block'>
                        <div className='page-size-select'>
                            <span>Items per page:</span>
                            <CustomSelect
                                defaultValue="clicks"
                                dropdownClassName={'full-width-menu'}
                                onChange={this.handleChangePageSize}
                                value={size}
                            >
                                <Option value={10}>10</Option>
                                <Option value={50}>50</Option>
                                <Option value={100}>100</Option>
                            </CustomSelect>
                        </div>

                        {products && <div className='all-items'>
                            {page * size - size + 1} - {products.length && page * size - size + products.length} of {totalSize} items
                        </div>}
                    </div>

                    {fetching && <div className='fetching-data'><Spin size={'large'}/></div>}

                    {pathname !== '/ppc/dayparting' ?
                        <div className='products'>
                            {products && products.map(product => (
                                <ProductItem
                                    key={product.id}
                                    product={product}
                                    isActive={
                                        isSelectedAll ||
                                        selectedProduct.id === product.id
                                    }
                                    onClick={item => this.onSelect(item)}
                                    onOpenChild={this.changeOpenedProduct}
                                    openedProduct={openedProduct}
                                    products={products}
                                    pathname={pathname}
                                />
                            ))}
                        </div>
                        :
                        <div className='campaigns-list'>
                            {products && products.map(item => (
                                <div
                                    key={item.id}
                                    className={isSelectedAll || selectedProduct.id === item.id ? 'active' : ''}
                                    onClick={() => this.onSelect(item)}
                                >
                                    {true && <InformationTooltip
                                        arrowPointAtCenter={true}
                                        type={'custom'}
                                        description={'Campaign on day-parting'}
                                        position={'topRight'}
                                    >
                                        <div className='on-optimization'/>
                                    </InformationTooltip>}

                                    <span className={'name'}>{item.name}</span>

                                    {/*<div className="full-name">*/}
                                    {/*    {item.name}*/}
                                    {/*</div>*/}
                                </div>
                            ))}
                        </div>
                    }

                    <ProductPagination
                        page={page}
                        totalSize={totalSize}
                        size={size}
                        onChangePagination={this.handleChangePagination}
                    />
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    products: state.products.productList,
    totalSize: state.products.totalSize,
    selectedProduct: state.products.selectedProduct,
    onlyOptimization: state.products.onlyOptimization,
    fetching: state.products.fetching
});

const mapDispatchToProps = dispatch => ({
    getAllProducts: params => {
        dispatch(productsActions.fetchProducts(params));
    },
    selectProduct: (product, pathname) => {
        dispatch(productsActions.fetchProductDetails(product, pathname));
    },
    showOnlyOptimized: (data) => {
        dispatch(productsActions.showOnlyOptimized(data));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductList);
