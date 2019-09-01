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

const RUNNING = 'RUNNING';
const STOPPED = 'STOPPED';

class ProductStatus extends Component {
    toStart = (status) => {
        const { saveProductIdData } = this.props;

        saveProductIdData(status);
    };

    render() {
        const { status } = this.props;


        return (
            <div className="ProductStatus">
                <StatusInfo caption="Status" value="InActive" />
                <StatusInfo caption="Start Date" />
                <StatusInfo caption="Total Changes" />
                <StatusInfo caption="Today Changes" />
                <div className="control">
                    {status !== RUNNING
                        ? (
                            <Button className="start" onClick={() => this.toStart(RUNNING)}>
                                <div className="control-btn-content">
                                    <Icon type="caret-right" className=" btn-icon" />
                                    <div className="btn-text">
                                        START
                                    </div>
                                </div>
                            </Button>
                        ) : (
                            <Button className="stop" onClick={() => this.toStart(STOPPED)}>
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
