import React, { Component } from 'react';
import './ProductOptions.less';
import { Icon } from 'antd';
import OptimizeOptions from './OptimizeOptions';
import OptimizeStrategy from './OptimizeStrategy';
import OptimizeCaption from './OptimizeCaption';

class ProductOptions extends Component {

    render() {
        const { isLess, toLess } = this.props;

        console.log(isLess);


        return (
            <div className="ProductOptions">
                <OptimizeCaption />
                <div className={`options ${!isLess ? 'more' : 'less'}`}>
                    <div className="optimize-options">
                        <OptimizeOptions />
                    </div>
                    <div className="optimize-strategy">
                        <OptimizeStrategy />
                    </div>
                    <div className="descriptions">
                        Mistake: Duplicate Keywords. Keyword in ad group in campaign
                        'duplicateCampaignName' is a duplicate of keyword 'originKeywordText' in ad
                        group 'originAdGroupName' in campaign
                    </div>
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
