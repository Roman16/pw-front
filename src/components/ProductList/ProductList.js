import React, {Component} from 'react';
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
        onlyOptimization: false,
        paginationParams: {
            size: 10,
            page: 1,
            searchStr: ''
        }
    };

    getProducts = () => this.props.getAllProducts({
        ...this.state.paginationParams,
        onlyOptimization: this.state.onlyOptimization
    });

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

    handleChangeSwitch = (event) => {
        this.setState(
            {
                ...this.state,
                onlyOptimization: event,
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
                    searchStr: str
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

    componentDidMount() {
        const selectedProductId = window.location.search.split('id=')[1],
            {products} = this.props;

        if (selectedProductId && products.length > 0) {
            const product = products.find(
                item => item.id === +selectedProductId
            );
            this.onSelect(product);
        } else {
            this.getProducts();
        }
    }

    render() {
        const {
                selectedSize,
                isSelectedAll,
                paginationParams: {size, page}
            } = this.state,
            {products, selectedProduct, totalSize} = this.props;

        return (
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
                        />

                        <div className="active-only">
                            <label htmlFor="">On optimization only</label>
                            <Switch
                                onChange={this.handleChangeSwitch}
                            />
                        </div>
                    </div>
                </div>

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
                    />
                ))}

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
        );
    }
}

const mapStateToProps = state => ({
    products: state.products.productList,
    totalSize: state.products.totalSize,
    selectedProduct: state.products.selectedProduct
});

const mapDispatchToProps = dispatch => ({
    getAllProducts: params => {
        dispatch(productsActions.fetchProducts(params));
    },
    selectProduct: product => {
        dispatch(productsActions.fetchProductDetails(product));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductList);
