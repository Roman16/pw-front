import React, { Component } from 'react';
import { Input } from 'antd';

import './ProductSearch.less';

const { Search } = Input;

class ProductSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }


    render() {
        return (
            <Search
                className="ProductSearch"
                placeholder="Searcg by product name, ASIN, or SKU"
                onSearch={(value) => console.log(value)}
            />
        );
    }
}

ProductSearch.propTypes = {};

ProductSearch.defaultProps = {};

export default ProductSearch;
