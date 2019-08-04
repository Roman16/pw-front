import React, { Component } from 'react';
import Button from '../../../../../../components/Buttons';
import './OptimizeCaption.less';

const ProductInfo = ({ text }) => (
    <div className="ProductInfo">
        {text}
    </div>
);

class OptimizeCaption extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }


    render() {
        return (
            <div className="OptimizeCaption">
                <ProductInfo text="What do you want to automate?" />

                <div className="info">
                    <ProductInfo text="Select which optimize Strategy" />
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
        );
    }
}

OptimizeCaption.propTypes = {};

OptimizeCaption.defaultProps = {};

export default OptimizeCaption;
