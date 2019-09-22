import React, { Component } from 'react';
import { func, bool, string } from 'prop-types';
import Checkbox from '../../../../components/Checkbox';
import './ProductItem.less';

class ProductItem extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }


    maxText = (text) => {
        if (text && text.length > 40) {
            return `${text.slice(0, 40)}...`;
        }


        return text;
    };


    render() {
        const {
            isActive, onClick,
            asin, captions, sku,
            imageUrl, underOptimization,
        } = this.props;


        return (
            <div
                className={`ProductItem ${isActive ? 'active' : ''}`}
                onClick={onClick}
            >
                <div className="image">
                    <img src={imageUrl} alt="" />
                </div>
                <div className="content">
                    <div className="caption">
                        {this.maxText(captions)}
                    </div>
                    <div className="detail">
                        <span> ASIN: </span>
                        <span>
                            {asin}
                        </span>
                    </div>
                    <div className="detail">
                        <span> SKU: </span>
                        <span>
                            {sku}
                        </span>
                    </div>

                </div>
                <div className="select">
                    {underOptimization ? (
                        <Checkbox checked readOnly />
                    ) : null}

                </div>
            </div>
        );
    }
}

ProductItem.propTypes = {
    isActive: bool,
    onClick: func,
    asin: string,
    captions: string,
    sku: string,
    imageUrl: string,
    underOptimization: string,
};

ProductItem.defaultProps = {
    isActive: false,
    onClick: () => {
    },
    asin: null,
    captions: null,
    sku: null,
    imageUrl: null,
    underOptimization: null,
};

export default ProductItem;
