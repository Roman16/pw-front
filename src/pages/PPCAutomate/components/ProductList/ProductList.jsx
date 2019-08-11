import React, { Component } from 'react';
import ProductSearch from '../ProductSearch';
import ProductItem from '../ProductItem';
import Button from '../../../../components/Buttons';
import Pagination from '../../../../components/Pagination';
import './ProductList.less';


// Post :/api/product?page=1&pageSize=10?search='sdsddssd'

// {asin:'sdsdd',
// sku:}

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
        console.log(props);
        this.state = { activeItem: 1 };
    }

    componentDidMount() {
        const { fetchProductList } = this.props;

        fetchProductList(1, 2);
    }

    toActive = (activeItem) => {
        console.log(activeItem);
        this.setState({ activeItem });
    };

    render() {
        const { activeItem } = this.state;
        const { productList } = this.props;


        return (
            <div className="ProductList">
                <ProductSearch />
                <SelectProduct />
                <div className="product-list-wrapper">
                    <div className="product-list">
                        {productList.map((item) => (
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
