import React, { Component } from 'react';
import ProductSearch from '../ProductSearch';
import ProductItem from '../ProductItem';
import Pagination from '../../../../components/Pagination';
import './ProductList.less';


// Post :/api/product?page=1&pageSize=10?search='sdsddssd'

// {asin:'sdsdd',
// sku:}

class ProductList extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }


    render() {
        return (
            <div>
                <ProductSearch />
                <ProductItem />
                <Pagination />
            </div>
        );
    }
}

ProductList.propTypes = {};

ProductList.defaultProps = {};

export default ProductList;
