import React, { Component } from 'react';
import ProductItem from './ProductItem';
import { connect } from 'react-redux';
import { Input, Pagination } from 'antd';
import { productsActions } from '../../actions/products.actions';
import './ProductList.less';
import SelectAllProduct from './SelectAllProducts';
import { debounce } from 'throttle-debounce';

const { Search } = Input;

class ProductList extends Component {
    state = {
        isSelectedAll: false,
        paginationParams: {
            size: 2,
            page: 1,
            searchStr: ''
        }
    };

    getProducts = () => this.props.getAllProducts(this.state.paginationParams);

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
        const { selectProduct, selectedProduct } = this.props;

        this.setState(
            ({ isSelectedAll }) => ({
                isSelectedAll: !isSelectedAll
            }),
            () => {
                if (this.state.isSelectedAll) selectProduct('all');
                else selectProduct(selectedProduct);
            }
        );
    };

    onSelect = product => {
        const { selectProduct, selectedProduct } = this.props;

        if (selectedProduct.id !== product.id) selectProduct(product);

        this.setState({
            isSelectedAll: false
        });
    };

    componentDidMount() {
        this.getProducts();
    }

    render() {
        const {
                selectedSize,
                isSelectedAll,
                paginationParams: { size }
            } = this.state,
            { products, selectedProduct, totalSize } = this.props;

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
