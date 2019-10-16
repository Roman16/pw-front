import React, {Component} from "react";

import ProductList from '../../../components/ProductList/ProductList';

import './Optimization.less';

class Optimization extends Component {
    state = {};

    onSelectProduct = (product) => {
        console.log(product);
    };

    render() {
        return (
            <div className='optimization-page'>
                <ProductList
                    onSelectProduct={this.onSelectProduct}
                />



            </div>
        )
    }
}

export default Optimization;