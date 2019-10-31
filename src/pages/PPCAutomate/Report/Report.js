import React from 'react';
import ProductList from '../../../components/ProductList/ProductList';
import ReportTable from './ReportTable/ReportTable';

function Report() {
    return (
        <div className="product-main basic-container reports-page">
            <ProductList />
            <ReportTable />
        </div>
    );
}

export default Report;
