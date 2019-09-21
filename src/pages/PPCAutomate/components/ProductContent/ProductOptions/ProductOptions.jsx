import React, { Component } from 'react';
import './ProductOptions.less';
import { Icon, Alert } from 'antd';
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

    onChangeOptions = (e) => {
        const {
            updateProductIdData,
        } = this.props;
        const localSaveData = { [e.target.name]: e.target.checked };

        updateProductIdData(localSaveData);
    };

    onSelectStrategy = (optimizationStrategy) => {
        const { updateProductIdData } = this.props;
        const localSaveData = { optimization_strategy: optimizationStrategy };

        updateProductIdData(localSaveData);
    };

    render() {
        const { showInfo, typeInfo } = this.state;
        const {
            isLess, toLess, inValidError,
            productIdData: {
                create_new_keywords = false,
                add_negative_keywords = false,
                add_negative_pats = false,
                create_new_pats = false,
                optimize_keywords = false,
                optimize_pats = false,
                optimization_strategy = '',
            },
        } = this.props;
        const { caption = '', content = null } = info[typeInfo];


        const optionsValue = {
            create_new_keywords,
            add_negative_keywords,
            add_negative_pats,
            create_new_pats,
            optimize_keywords,
            optimize_pats,
        };


        return (
            <>
                <div className="ProductOptions">
                    <div className={`options ${!isLess ? 'more' : 'less'}`}>
                        <div className="optimize-options">
                            <OptimizeCaption
                                text="What do you want to automate"
                                onClick={() => this.toShowInfo(OPTIONS)}
                            />
                            <div className="options-content">
                                <OptimizeOptions
                                    optionsValue={optionsValue}
                                    onChange={this.onChangeOptions}
                                />
                                {inValidError && (
                                    <Alert message="select at least one option" type="error" />
                                )}

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
                                <OptimizeStrategy
                                    optimizationStrategy={optimization_strategy}
                                    onSelect={this.onSelectStrategy}
                                />
                            </div>
                        </div>
                        <div className="descriptions options-content">
                            {` What is PAT? Product Attribute Targeting is
                            a powerful new way to target manual Amazon Sponsored Product campaigns.
                             It allows sellers to target ads by either
                             ASIN or Category (brands, prices, and ratings).`}
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
