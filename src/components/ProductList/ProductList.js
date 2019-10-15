import React, {Component} from "react";
import PropTypes from 'prop-types';
import ProductItem from "./ProductItem";
import {Input, Button} from 'antd';

import './ProductList.less';

const {Search} = Input;

class ProductList extends Component {
    state = {
        products: [],
        searchValue: ''
    };

    render() {
        const {
            products,
        } = this.state;

        return (
            <div className='product-list'>
                <div className='search-product'>
                    <Search
                        placeholder="Search by product name, ASIN, or SKU"
                        onSearch={value => console.log(value)}
                    />

                    <div className="select-all-products">
                        <Button type="primary">Select All Products</Button>

                        <div className='selected-count'>
                            Selected All Products
                        </div>
                    </div>
                </div>

                {products.map(product => (
                    <ProductItem
                        product={product}
                    />
                ))}
            </div>
        )
    }
}

ProductList.propTypes = {
    onSelectProduct: PropTypes.func,
};

export default ProductList;