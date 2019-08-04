import React, { Component } from 'react';
import ProductSearch from '../ProductSearch';
import ProductItem from '../ProductItem';
import Pagination from '../../../../components/Pagination';
import './ProductList.less';


// Post :/api/product?page=1&pageSize=10?search='sdsddssd'

// {asin:'sdsdd',
// sku:}
const productItemList = [1, 2, 3, 4, 5, 6, 7, 8];

class ProductList extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }


    render() {
        return (
            <div className="ProductList">
                <ProductSearch />
                {productItemList.map((item) => (
                    <ProductItem key={item} />
                ))}
                <Pagination />
            </div>
        );
    }
}

ProductList.propTypes = {};

ProductList.defaultProps = {};

export default ProductList;
