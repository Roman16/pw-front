import React, { Component } from 'react';
import OptimizeOptions from './ProductOptions';
import ProductStatus from './ProductStatus';
import Terminal from './Terminal';
import './ProductContent.less';


class ProductContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLess: false,

        };
    }

    toLess = () => {
        this.setState(({ isLess }) => ({ isLess: !isLess }));
    };

    render() {
        const { isLess } = this.state;


        return (
            <div>
                <OptimizeOptions isLess={isLess} toLess={this.toLess} />
                <ProductStatus />
                <Terminal isLess={isLess} />
            </div>
        );
    }
}

ProductContent.propTypes = {};

ProductContent.defaultProps = {};

export default ProductContent;
