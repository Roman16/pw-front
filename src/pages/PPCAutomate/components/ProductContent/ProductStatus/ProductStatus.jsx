import React, { Component } from 'react';
import { Icon } from 'antd';
import Button from '../../../../../components/Buttons';
import './ProductStatus.less';

const StatusInfo = ({ caption, value = '-----' }) => (
    <div className="StatusInfo">
        <div className="caption">{caption}</div>
        <div>{value}</div>
    </div>
);

class ProductStatus extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isStart: true,
        };
    }

    toStart = (status) => {
        this.setState({ isStart: status });
    };

    render() {
        const { isStart } = this.state;


        return (
            <div className="ProductStatus">
                <StatusInfo caption="Status" value="InActive" />
                <StatusInfo caption="Start Date" />
                <StatusInfo caption="Total Changes" />
                <StatusInfo caption="Today Changes" />
                <div className="control">
                    {isStart
                        ? (
                            <Button className="start" onClick={() => this.toStart(false)}>
                                <div className="control-btn-content">
                                    <Icon type="caret-right" className=" btn-icon" />
                                    <div className="btn-text">
                                        START
                                    </div>
                                </div>
                            </Button>
                        ) : (
                            <Button className="stop" onClick={() => this.toStart(true)}>
                                <div className="control-btn-content">
                                    <div className="icon-stop" />
                                    <div className="btn-text">
                                        STOP
                                    </div>
                                </div>
                            </Button>
                        )
                    }
                </div>
            </div>
        );
    }
}

ProductStatus.propTypes = {};

ProductStatus.defaultProps = {};

export default ProductStatus;
