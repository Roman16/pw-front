import React, {Fragment} from 'react';

import Sidebar from '../components/Sidebar/Sidebar';
import ProductList from "../components/ProductList/ProductList";
import ReportsChangesCountWindow from "../components/ModalWindow/ReportsChangesCountWindow";

const AuthorizedUser = (props) => {
    return (
        <Fragment>
            <div className="main-pages">
                <Sidebar/>

                {(props.children.props.location.pathname === '/ppc/optimization' ||
                    props.children.props.location.pathname === '/ppc/report') &&
                <ProductList
                    pathname={props.children.props.location.pathname}
                />}

                <div className="main-container">{props.children}</div>
            </div>

            <ReportsChangesCountWindow/>
        </Fragment>
    );
};

export default AuthorizedUser;
