import React, { Component } from 'react';
import OptimizeOptions from './ProductOptions';
import ProductStatus from './ProductStatus';
import Terminal from './Terminal';
import './ProductContent.less';


class ProductContent extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }


    render() {
        return (
            <div>
                <OptimizeOptions />
                <ProductStatus />
                <Terminal />
            </div>
        );
    }
}

ProductContent.propTypes = {};

ProductContent.defaultProps = {};

export default ProductContent;
