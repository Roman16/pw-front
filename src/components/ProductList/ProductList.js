import React, {Component} from "react";
import PropTypes from 'prop-types';
import ProductItem from "./ProductItem";
import {connect} from 'react-redux';
import {Input} from 'antd';
import {productsActions} from '../../actions/products.actions';
import './ProductList.less';
import SelectAllProduct from "./SelectAllProducts";

const {Search} = Input;

class ProductList extends Component {
    state = {
        params: {
            size: 8,
            page: 1,
            searchStr: ''
        }
    };

    componentDidMount() {
        this.getProducts();
    }

    getProducts = () => {
        const {params} = this.state;
        this.props.getAllProducts(params)
    };

    selectAll = () => {
        const {
            totalProduct,
            activeProductId,
            setActiveProduct,
            onSelect,
        } = this.props;

        this.setState(
            ({isSelectedAll}) => ({
                isSelectedAll: !isSelectedAll,
                selectedSize: !isSelectedAll ? totalProduct : 1,
            }),
            () => {
                const {isSelectedAll} = this.state;

                if (activeProductId !== 'all') {
                    this.prevActive = activeProductId;
                }
                const toSelect = isSelectedAll ? 'all' : this.prevActive;

                onSelect(toSelect);
                setActiveProduct(toSelect);
            },
        );
    };

    toActive = (product) => {
        const {selectProduct} = this.props;

        selectProduct(product);

        this.setState({
            isSelectedAll: false,
            selectedSize: 1,
        });
    };

    render() {
        const {
                selectedSize,
                isSelectedAll
            } = this.state,
            {
                products,
                selectedProduct
            } = this.props;

        return (
            <div className='product-list'>
                <div className='search-product'>
                    <Search
                        placeholder="Search by product name, ASIN, or SKU"
                        onSearch={value => console.log(value)}
                    />

                    <div className="select-all-products">
                        <SelectAllProduct
                            onSelectAll={this.selectAll}
                            selectedSize={selectedSize}
                            isSelectedAll={isSelectedAll}
                        />

                        {/*<div className='selected-count'>*/}
                        {/*    Selected All Products*/}
                        {/*</div>*/}
                    </div>
                </div>

                {products && products.map(product => (
                    <ProductItem
                        key={product.id}
                        product={product}
                        selectedProduct={selectedProduct}
                        onClick={(item) => this.toActive(item)}
                    />
                ))}
            </div>
        )
    }
}

ProductList.propTypes = {
    onSelectProduct: PropTypes.func,
};


const mapStateToProps = state => ({
    products: state.products.productList,
    totalSize: state.products.totalSize,
    selectedProduct: state.products.selectedProduct && state.products.selectedProduct.id
});

const mapDispatchToProps = dispatch => ({
    getAllProducts: (params) => {
        dispatch(productsActions.fetchProducts(params));
    },
    selectProduct: (product) =>{
        dispatch(productsActions.selectProduct(product))
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductList);
