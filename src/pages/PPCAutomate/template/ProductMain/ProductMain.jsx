import React, { Component } from 'react';
import ProductList from '../../containers/ProductListContainer';
import ProductContent from '../../components/ProductContent';
import './ProductMain.less';


class ProductMain extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }


    render() {
        return (
            <div className="ProductMain basic-container">
                <ProductList />
                <ProductContent />
            </div>
        );
    }
}

ProductMain.propTypes = {};

ProductMain.defaultProps = {};

export default ProductMain;
