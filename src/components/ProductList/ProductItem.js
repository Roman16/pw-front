import React from 'react';
import { func, bool, string } from 'prop-types';
import { Checkbox } from 'antd';

const maxText = text => {
    if (text && text.length > 40) {
        return `${text.slice(0, 40)}...`;
    }

    return text;
};

const ProductItem = ({
    product: { id, asin, name, sku, image_url, under_optimization },
    onClick,
    product,
    isActive
}) => {
    return (
        <div
            className={`product-item ${isActive ? 'active' : ''}`}
            onClick={() => onClick(product)}
        >
            <div className="image">
                <img src={image_url} alt="" />
            </div>

            <div className="product-item-content">
                <div className="caption">{maxText(name)}</div>

                <div className="detail">
                    <span> ASIN: </span>
                    <span>{asin}</span>
                </div>

                <div className="detail">
                    <span> SKU: </span>
                    <span>{sku}</span>
                </div>
            </div>

            <div className="select">
                {under_optimization ? <Checkbox checked readOnly /> : null}
            </div>
        </div>
    );
};

ProductItem.propTypes = {
    isActive: bool,
    onClick: func,
    asin: string,
    captions: string,
    sku: string,
    imageUrl: string,
    underOptimization: bool
};

ProductItem.defaultProps = {
    isActive: false,
    onClick: () => {},
    asin: null,
    captions: null,
    sku: null,
    imageUrl: null,
    underOptimization: false
};

export default ProductItem;
