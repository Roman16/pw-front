import React, {Fragment} from 'react';

import Sidebar from '../components/Sidebar/Sidebar';
import ProductList from "../components/ProductList/ProductList";
import ReportsChangesCountWindow from "../components/ModalWindow/ReportsChangesCountWindow";

const AuthorizedUser = (props) => {
    // console.log(props.children.props.location.pathname === '/ppc/optimization');
    return (
        <Fragment>
            <div className="main-pages">
                <Sidebar/>

                {(props.children.props.location.pathname === '/ppc/optimization' ||
                    props.children.props.location.pathname === '/ppc/report') &&
                <ProductList/>}

                <div className="main-container">{props.children}</div>
            </div>

            <ReportsChangesCountWindow/>
        </Fragment>
    );
};

export default AuthorizedUser;
