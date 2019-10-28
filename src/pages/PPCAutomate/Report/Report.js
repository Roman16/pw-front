import React, {useState} from 'react';
import ProductList from '../../../components/ProductList/ProductList';
import ReportTable from './ReportTable/ReportTable';
import {useDispatch, useSelector} from "react-redux";
import {productsActions} from '../../../actions/products.actions';

import './Report.less';

const Report = () => {
    const dispatch = useDispatch();
    const onSelectProduct = (product) => {
        dispatch(productsActions.selectProduct(product));
    };

    return (
        <div className="product-main basic-container">
            <ProductList
                onSelect={onSelectProduct}
            />
            <ReportTable/>
        </div>
    );
};

export default Report;
