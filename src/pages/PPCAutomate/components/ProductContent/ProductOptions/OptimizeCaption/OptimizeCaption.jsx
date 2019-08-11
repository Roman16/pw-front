import React, { Component } from 'react';
import { Icon } from 'antd';
import Button from '../../../../../../components/Buttons';
import SideInfo from '../../../../template/SideInfo';
import { OptionInfo, StrategyInfo } from './InfoItem';
import './OptimizeCaption.less';

const ProductInfo = ({ text, className, onClick }) => (
    <div className={`ProductInfo ${className}`}>
        <span>{text}</span>
        <Icon type="info-circle" theme="filled" onClick={onClick} />
    </div>
);

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

class OptimizeCaption extends Component {
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
        const { caption = '', content = null } = info[typeInfo];


        return (
            <>
                <div className="OptimizeCaption">
                    <ProductInfo
                        className="basic-container"
                        text="What do you want to automate?"
                        onClick={() => this.toShowInfo(OPTIONS)}
                    />

                    <div className="info">
                        <ProductInfo
                            text="Select which optimize Strategy"
                            onClick={() => this.toShowInfo([STRATEGY])}
                        />
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

OptimizeCaption.propTypes = {};

OptimizeCaption.defaultProps = {};

export default OptimizeCaption;
