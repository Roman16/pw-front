import React, { Component } from 'react';
import ProductList from './components/ProductList';
import ProductContent from './components/ProductContent';

class PPCAutomate extends Component {
    render() {
        return (
            <div>
                <ProductList />
                <ProductContent />
            </div>
        );
    }
}


export default PPCAutomate;
