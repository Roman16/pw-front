import React, { Component } from 'react';
import { Icon } from 'antd';
import moment from 'moment';
import Button from '../../../../../components/Buttons';
import './ProductStatus.less';
import NetMargin from '../NetMargin';

const StatusInfo = ({ caption, value = '-----', statusColor = '' }) => (
    <div className="StatusInfo">
        <div className="caption">{caption}</div>
        <div className={statusColor}>{value}</div>
    </div>
);

const RUNNING = 'RUNNING';
const STOPPED = 'STOPPED';

class ProductStatus extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isShowModal: false,

        };
    }

    toStart = (status) => {
        const { saveProductIdData, netMargin } = this.props;

        console.log(status === RUNNING && !netMargin);
        if (status === RUNNING && !netMargin) {
            console.log('sdsdd');
            this.setState({ isShowModal: true });
        } else {
            saveProductIdData(status);
        }
    };

    cancelModal = () => {
        this.setState({ isShowModal: false });
    };

    setNetMargin = (value) => {
        const { productId, setNetMargin } = this.props;

        console.log(value);
        setNetMargin(productId, value);
        this.cancelModal();
    };

    render() {
        const {
            status, createdAt, totalChanges, todayChanges,
            netMargin,
        } = this.props;
        const { isShowModal } = this.state;
        const isActive = status === RUNNING;

        console.log(netMargin);


        return (
            <div className="ProductStatus">
                <StatusInfo
                    caption="Status"
                    value={isActive ? 'Active' : 'Inactive'}
                    statusColor={isActive ? 'active' : 'inactive'}
                />
                <StatusInfo
                    caption="Start Date"
                    value={
                        createdAt ? moment(createdAt)
                            .format('DD/MM/Y') : null
                    }
                />
                <StatusInfo caption="Total Changes" value={totalChanges} />
                <StatusInfo caption="Today Changes" value={todayChanges} />
                <div className="control">
                    {!isActive
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
                {isShowModal && (
                    <NetMargin
                        onStart={this.setNetMargin}
                        isShowModal={isShowModal}
                        handleCancel={this.cancelModal}
                    />
                )}
            </div>
        );
    }
}

ProductStatus.propTypes = {};

ProductStatus.defaultProps = {};

export default ProductStatus;
