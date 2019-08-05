import React, { Component } from 'react';
import Checkbox from '../../../../components/Checkbox';
import Rectangle from '../../../../assets/img/Rectangle.svg';

import './ProductItem.less';

class ProductItem extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };

    render() {
        const { isActive, onClick } = this.props;

        console.log(isActive);


        return (
            <div
                className={`ProductItem ${isActive ? 'active' : ''}`}
                onClick={onClick}
            >
                <div className="image">
                    <img src={Rectangle} alt="" />
                </div>
                <div className="content">
                    <div className="caption">
                        LETSCOM Bluetooth Headphones
                        IPX7 Waterproof, Wireless Sport
                    </div>
                    <div className="detail">
                        <span> ASIN: </span>
                        <span> B0799RPPS2</span>
                    </div>
                    <div className="detail">
                        <span> SKU: </span>
                        <span> MY-2FTM-0MM</span>
                    </div>

                </div>
                <div className="select">
                    <Checkbox checked readOnly />
                </div>
            </div>
        );
    }
}

ProductItem.propTypes = {};

ProductItem.defaultProps = {};

export default ProductItem;
