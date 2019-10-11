import React, { Component } from 'react';
import ProductList from '../../containers/ProductListContainer';
import ProductContent from '../../containers/ProductContentContainer';
import './ProductMain.less';

class ProductMain extends Component {
    state = {};

    onSelectProduct = (productId) => {
        const { fetchProductIdData } = this.props;

        fetchProductIdData(productId);
    };

    render() {
        return (
            <div className="ProductMain basic-container">
                <ProductList onSelect={this.onSelectProduct} />
                <ProductContent />
            </div>
        );
    }
}

ProductMain.propTypes = {};

ProductMain.defaultProps = {};

export default ProductMain;
