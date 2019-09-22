import React, { Component } from 'react';
import ProductMain from './containers/ProductMainContainer';
import MainContent from "../../templates/MainContent";

class PPCAutomate extends Component {
    render() {
        return (
            <MainContent>
                <ProductMain />
            </MainContent>
        );
    }
}


export default PPCAutomate;
