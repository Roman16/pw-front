import React from 'react';
import ProductList from '../../../components/ProductList/ProductList';
import ReportTable from './ReportTable/ReportTable';
import './Report.less';

// delete this comment
function Report() {
    return (
        <div className="product-main basic-container">
            <ProductList />
            <ReportTable />
        </div>
    );
}

export default Report;
