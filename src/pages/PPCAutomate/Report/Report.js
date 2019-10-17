import React from 'react';
import ProductList from '../../../components/ProductList/ProductList';
import ReportTable from './ReportTable/ReportTable';
import './Report.less';

// delete this coment
function Report() {
    return (
        <div className="ProductMain basic-container">
            <ProductList />
            <ReportTable />
        </div>
    );
}

export default Report;
