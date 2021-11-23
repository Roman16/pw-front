import React, {Component, Fragment} from 'react';
import ProductItem from './ProductItem';
import {connect} from 'react-redux';
import {Input, Pagination, Switch} from 'antd';
import {productsActions} from '../../actions/products.actions';
import './ProductList.less';
import SelectAllProduct from './SelectAllProducts';
import {debounce} from 'throttle-debounce';

const {Search} = Input;

class ProductList extends Component {
    state = {
        isSelectedAll: false,
        prevProductId: '',
        onlyOptimization: this.props.onlyOptimization || false,
        onlyHasNew: false,
        openedProduct: '',
        paginationParams: {
            size: 10,
            page: 1,
            searchStr: ''
        }
    };

    getProducts = () => this.props.getAllProducts({
        ...this.state.paginationParams,
        onlyOptimization: this.state.onlyOptimization,
        selectedAll: this.state.isSelectedAll,
        onlyHasNew: this.props.pathname === '/ppc/report' ? this.state.onlyHasNew : false
    });

    changeOpenedProduct = (id) => {
        this.setState({
            openedProduct: id === this.state.openedProduct ? null : id
        })
    };

    handleChangePagination = page => {
        this.setState(
            {
                ...this.state,
                paginationParams: {
                    ...this.state.paginationParams,
                    page
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
        if (selectedProduct.id !== product.id) selectProduct(product);

        this.setState({
            isSelectedAll: false
        });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.pathname !== prevProps.pathname) {
            if (this.props.pathname === '/ppc/automation' && this.state.onlyHasNew) {
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
                paginationParams: {size, page}
            } = this.state,
            {products, selectedProduct, totalSize, onlyOptimization, pathname} = this.props;


        return (
            <Fragment>
                <div className="product-list">
                    <div className="search-product">
                        <Search
                            placeholder="Search by product name, ASIN, or SKU"
                            onChange={e => this.handleSearch(e.target.value)}
                        />

                        <div className="select-all-products">
                            <SelectAllProduct
                                onSelectAll={this.selectAll}
                                selectedSize={selectedSize}
                                isSelectedAll={isSelectedAll}
                                disabled={(products && products.length === 0) || this.props.pathname === '/ppc/scanner'}
                            />

                            <div className="active-only">
                                <label htmlFor="">On optimization only</label>
                                <Switch
                                    checked={onlyOptimization}
                                    onChange={e => this.handleChangeSwitch(e, 'onlyOptimization')}
                                />
                            </div>
                        </div>
                    </div>

                    {/*{pathname === '/ppc/report' && <div className='has-new-reports-only'>*/}
                    {/*    <label htmlFor="">Has new reports only</label>*/}
                    {/*    <Switch*/}
                    {/*        checked={onlyHasNew}*/}
                    {/*        onChange={e => this.handleChangeSwitch(e, 'onlyHasNew')}*/}
                    {/*    />*/}
                    {/*</div>}*/}

                    <div className='products'>
                        {products &&
                        products.map(product => (
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

                    {totalSize > size && (
                        <Pagination
                            defaultCurrent={1}
                            pageSize={size}
                            total={totalSize}
                            current={page}
                            onChange={this.handleChangePagination}
                        />
                    )}
                </div>

                <div>
                    {this.props.children}
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
});

const mapDispatchToProps = dispatch => ({
    getAllProducts: params => {
        dispatch(productsActions.fetchProducts(params));
    },
    selectProduct: product => {
        dispatch(productsActions.fetchProductDetails(product));
    },
    showOnlyOptimized: (data) => {
        dispatch(productsActions.showOnlyOptimized(data));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductList);
