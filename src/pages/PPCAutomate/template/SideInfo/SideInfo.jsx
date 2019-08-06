import React, { Component } from 'react';
import { Icon } from 'antd';
import './SideInfo.less';


class SideInfo extends Component {
    render() {
        const {
            content, show, onClose, caption,
        } = this.props;


        return (

            <div className={`SideInfo ${show ? 'show' : ''}`}>
                <div className="side-info-bg" onClick={onClose} />
                <div
                    className="side-info-content"
                >
                    <div onClick={onClose} className="close">
                        <Icon type="close" />
                    </div>
                    <div className="caption">
                        {caption}
                    </div>
                    <div className="info">
                        {content}
                    </div>
                </div>

            </div>

        );
    }
}

SideInfo.propTypes = {};

SideInfo.defaultProps = {};

export default SideInfo;
