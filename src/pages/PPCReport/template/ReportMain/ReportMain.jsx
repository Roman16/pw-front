import React, { Component } from 'react';
import ProductList from '../../../PPCAutomate/containers/ProductListContainer';
import ReportTable from '../../components/ReportTable';
import './ReportMain.less';


class ReportMain extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }


    render() {
        return (
            <div className="ProductMain basic-container">
                <ProductList />
                <ReportTable />
            </div>
        );
    }
}

ReportMain.propTypes = {};

ReportMain.defaultProps = {};

export default ReportMain;
