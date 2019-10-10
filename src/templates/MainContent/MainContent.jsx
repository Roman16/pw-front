import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import './MainContent.less';

class MainContent extends Component {
    render() {
        const { children } = this.props;

        return (
            <div className="Main">
                <Sidebar />
                <div className="MainContent">
                    <main className="content">
                        {children}
                    </main>
                </div>
            </div>
        );
    }
}


MainContent.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};
MainContent.defaultProps = {
    children: null,
};

export default MainContent;
