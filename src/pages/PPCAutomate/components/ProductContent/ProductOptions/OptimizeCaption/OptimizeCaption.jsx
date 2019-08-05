import React, { Component } from 'react';
import { Icon } from 'antd';
import Button from '../../../../../../components/Buttons';
import SideInfo from '../../../../template/SideInfo';
import './OptimizeCaption.less';

const ProductInfo = ({ text, className, onClick }) => (
    <div className={`ProductInfo ${className}`}>
        <span>{text}</span>
        <Icon type="info-circle" theme="filled" onClick={onClick} />
    </div>
);

class OptimizeCaption extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showInfo: false,
        };
    }

    toShowInfo = () => {
        this.setState({ showInfo: true });
    };

    onClose = () => {
        this.setState({ showInfo: false });
    };

    render() {
        const { showInfo } = this.state;


        return (
            <>
                <div className="OptimizeCaption">
                    <ProductInfo
                        className="basic-container"
                        text="What do you want to automate?"
                        onClick={this.toShowInfo}
                    />

                    <div className="info">
                        <ProductInfo text="Select which optimize Strategy" />
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
                <SideInfo show={showInfo} onClose={this.onClose} />
            </>
        );
    }
}

OptimizeCaption.propTypes = {};

OptimizeCaption.defaultProps = {};

export default OptimizeCaption;
