import React, { Component } from 'react';
import './ProductOptions.less';
import { Icon } from 'antd';
import OptimizeOptions from './OptimizeOptions';
import OptimizeStrategy from './OptimizeStrategy';
import OptimizeCaption from './OptimizeCaption';

class ProductOptions extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        const { isLess, toLess } = this.props;

        console.log(isLess);


        return (
            <div className="ProductOptions">
                <OptimizeCaption />
                <div className={`options ${!isLess ? 'more' : 'less'}`}>
                    <OptimizeOptions />
                    <OptimizeStrategy />
                </div>
                <div className="less-more-control">
                    <div className={`icon ${isLess ? 'more' : 'less'}`} onClick={toLess}>
                        <Icon type="up" />
                    </div>

                </div>
            </div>

        );
    }
}

ProductOptions.propTypes = {};

ProductOptions.defaultProps = {};

export default ProductOptions;
