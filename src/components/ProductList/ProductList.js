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
        products: [],
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
            ({ isSelectedAll }) => ({
                isSelectedAll: !isSelectedAll,
                selectedSize: !isSelectedAll ? totalProduct : 1,
            }),
            () => {
                const { isSelectedAll } = this.state;

                if (activeProductId !== 'all') {
                    this.prevActive = activeProductId;
                }
                const toSelect = isSelectedAll ? 'all' : this.prevActive;

                onSelect(toSelect);
                setActiveProduct(toSelect);
            },
        );
    };

    toActive = (activeItemId) => {
        const { setActiveProduct, onSelect } = this.props;

        setActiveProduct(activeItemId);
        onSelect(activeItemId);

        this.setState({
            isSelectedAll: false,
            selectedSize: 1,
        });
    };

    render() {
        const {
            products,
            selectedSize,
            isSelectedAll
        } = this.state;

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

                {products.map(product => (
                    <ProductItem
                        product={product}
                        onClick={(id) => this.toActive(id)}
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
    state: state,
    products: state.products
});

const mapDispatchToProps = dispatch => ({
    getAllProducts: (params) => {
        dispatch(productsActions.fetchProducts(params));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductList);
