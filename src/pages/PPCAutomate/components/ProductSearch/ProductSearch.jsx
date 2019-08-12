import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

import './ProductSearch.less';

const { Search } = Input;

class ProductSearch extends Component {
    render() {
        const { onChange } = this.props;


        return (
            <Search
                maxLength={100}
                className="ProductSearch"
                placeholder="Searcg by product name, ASIN, or SKU"
                onChange={onChange}
            />
        );
    }
}

ProductSearch.propTypes = {
    onChange: PropTypes.func,
};

ProductSearch.defaultProps = {
    onChange: () => {
    },
};

export default ProductSearch;
