import React, { Component } from 'react';
import ProductSearch from '../ProductSearch';
import ProductItem from '../ProductItem';
import Button from '../../../../components/Buttons';
import Pagination from '../../../../components/Pagination';
import './ProductList.less';


// Post :/api/product?page=1&pageSize=10?search='sdsddssd'

// {asin:'sdsdd',
// sku:}
const productItemList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const SelectProduct = () => (
    <div className="SelectProduct">
        <Button>Select All Products</Button>
        <div className="selected-products">
            Selected Products
            <span className="product">7</span>
        </div>
    </div>
);

class ProductList extends Component {
    constructor(props) {
        super(props);

        this.state = { activeItem: 1 };
    }

    toActive = (activeItem) => {
        console.log(activeItem);
        this.setState({ activeItem });
    };

    render() {
        const { activeItem } = this.state;


        return (
            <div className="ProductList">
                <ProductSearch />
                <SelectProduct />
                <div className="product-list-wrapper">
                    <div className="product-list">
                        {productItemList.map((item) => (
                            <ProductItem
                                key={item}
                                isActive={item === activeItem}
                                onClick={() => this.toActive(item)}
                            />
                        ))}
                    </div>
                </div>
                <Pagination />
            </div>
        );
    }
}

ProductList.propTypes = {};

ProductList.defaultProps = {};

export default ProductList;
