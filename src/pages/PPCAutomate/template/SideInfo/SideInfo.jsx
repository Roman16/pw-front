import React, { Component } from 'react';

import './SideInfo.less';


class SideInfo extends Component {
    render() {
        const { children, show, onClose } = this.props;

        console.log(show);


        return (

            <div className={`SideInfo ${show ? 'show' : ''}`}>
                <div className="side-info-bg" onClick={onClose} />
                <div
                    className="side-info-content"
                >
                    {children}
                </div>

            </div>

        );
    }
}

SideInfo.propTypes = {};

SideInfo.defaultProps = {};

export default SideInfo;
