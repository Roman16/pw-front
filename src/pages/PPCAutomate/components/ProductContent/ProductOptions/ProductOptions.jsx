import React, { Component } from 'react';
import './ProductOptions.less';
import { Icon } from 'antd';
import OptimizeOptions from './OptimizeOptions';
import OptimizeStrategy from './OptimizeStrategy';
import OptimizeCaption from './OptimizeCaption';
import { OptionInfo, StrategyInfo } from './InfoItem';
import Button from '../../../../../components/Buttons';
import SideInfo from '../../../template/SideInfo';


const OPTIONS = 'options';
const STRATEGY = 'strategy';

const info = {
    [OPTIONS]: {
        caption: 'Did you know that you can pause your ProfitWhales account?',
        content: <OptionInfo />,
    },
    [STRATEGY]: {
        caption: 'Did you know that you can pause your ProfitWhales account?',
        content: <StrategyInfo />,
    },
};

class ProductOptions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showInfo: false,
            typeInfo: OPTIONS,
        };
    }

    toShowInfo = (typeInfo) => {
        this.setState({
            showInfo: true,
            typeInfo,
        });
    };

    onClose = () => {
        this.setState({ showInfo: false });
    };

    render() {
        const { showInfo, typeInfo } = this.state;
        const { isLess, toLess } = this.props;
        const { caption = '', content = null } = info[typeInfo];

        console.log(isLess);


        return (
            <>
                <div className="ProductOptions">
                    <div className={`options ${!isLess ? 'more' : 'less'}`}>
                        <div className="optimize-options">
                            <OptimizeCaption
                                text="What do you want to automate"
                                onClick={() =>  this.toShowInfo(OPTIONS)}
                            />
                            <div className="options-content">
                                <OptimizeOptions />
                            </div>
                        </div>
                        <div className="optimize-strategy">
                            <OptimizeCaption
                                text="Select which optimize Strategy"
                                onClick={() => this.toShowInfo(STRATEGY)}
                            >
                                <div className="info">
                                    <div className="additional">
                                        <div>
                                            Free Trial
                                            <span className="free-trial">7</span>
                                            Days Left
                                        </div>
                                        <div>
                                            <Button>Upgrade Now</Button>
                                        </div>
                                    </div>
                                </div>
                            </OptimizeCaption>

                            <div className="options-content">
                                <OptimizeStrategy />
                            </div>
                        </div>
                        <div className="descriptions options-content">
                            {` Mistake: Duplicate Keywords. Keyword in ad group in campaign
                        'duplicateCampaignName' is a duplicate of keyword 'originKeywordText' in ad
                        group 'originAdGroupName' in campaign`}
                        </div>
                    </div>
                    <div className="less-more-control">
                        <div className={`icon ${isLess ? 'more' : 'less'}`} onClick={toLess}>
                            <Icon type="up" />
                        </div>

                    </div>
                </div>
                <SideInfo
                    caption={caption}
                    show={showInfo}
                    content={content}
                    onClose={this.onClose}
                />
            </>
        );
    }
}

ProductOptions.propTypes = {};

ProductOptions.defaultProps = {};

export default ProductOptions;
