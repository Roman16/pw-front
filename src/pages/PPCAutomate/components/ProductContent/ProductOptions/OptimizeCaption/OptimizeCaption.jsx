import React, { Component } from 'react';
import { Icon } from 'antd';
import './OptimizeCaption.less';

const ProductInfo = ({ text, onClick }) => (
    <div className="ProductInfo ">
        <span>{text}</span>
        <Icon type="info-circle" theme="filled" onClick={onClick} />
    </div>
);


class OptimizeCaption extends Component {
    render() {
        const {
            text, onClick, children,
        } = this.props;

        return (
            <>
                <div className="OptimizeCaption">
                    <ProductInfo
                        text={text}
                        onClick={onClick}
                    />

                    <div className="children">
                        {children}
                    </div>
                </div>
            </>
        );
    }
}

OptimizeCaption.propTypes = {};

OptimizeCaption.defaultProps = {};

export default OptimizeCaption;
