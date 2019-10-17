import React, {Component} from 'react';
import {Icon} from 'antd';
import moment from 'moment';
import {Button} from 'antd';

import NetMarginWindow from './NetMarginWindow/NetMarginWindow';

import './OptimizationStatus.less';

const StatusInfo = ({caption, value = '-----', statusColor = ''}) => (
    <div className="status-info">
        <div className="caption">{caption}</div>
        <div className={statusColor}>{value}</div>
    </div>
);

const RUNNING = 'RUNNING';
const STOPPED = 'STOPPED';

class OptimizationStatus extends Component {

    state = {
        isShowModal: false,
    };

    cancelModal = () => {
        this.setState({isShowModal: false});
    };

    toStart = (status) => {
        const {onSwitchOptimization, netMargin} = this.props;

        if (status === RUNNING && !netMargin) {
            this.setState({isShowModal: true});
        } else {
            onSwitchOptimization(status);
        }
    };

    setNetMargin = (value) => {
        const {productId, setNetMargin} = this.props;

        setNetMargin(productId, value);
        this.cancelModal();
    };

    render() {
        const {
            status, createdAt, totalChanges, todayChanges,
        } = this.props;
        const {isShowModal} = this.state;
        const isActive = status === RUNNING;

        return (
            <div className="product-status">
                <StatusInfo
                    caption="Status"
                    value={isActive ? 'Active' : 'Inactive'}
                    statusColor={isActive ? 'active' : 'inactive'}
                />

                <StatusInfo
                    caption="Start Date"
                    value={
                        createdAt ? moment(createdAt).format('DD/MM/Y') : undefined
                    }
                />

                <StatusInfo caption="Total Changes" value={totalChanges}/>
                <StatusInfo caption="Today Changes" value={todayChanges}/>

                <div className="control">
                    {!isActive
                        ? (
                            <Button className="start" onClick={() => this.toStart(RUNNING)}>
                                <div className="control-btn-content">
                                    <Icon type="caret-right" className=" btn-icon"/>
                                    <div className="btn-text">
                                        START
                                    </div>
                                </div>
                            </Button>
                        ) : (
                            <Button className="stop" onClick={() => this.toStart(STOPPED)}>
                                <div className="control-btn-content">
                                    <div className="icon-stop"/>
                                    <div className="btn-text">
                                        STOP
                                    </div>
                                </div>
                            </Button>
                        )
                    }
                </div>

                {isShowModal && (
                    <NetMarginWindow
                        onStart={this.setNetMargin}
                        isShowModal={isShowModal}
                        handleCancel={this.cancelModal}
                    />
                )}
            </div>
        );
    }
}

OptimizationStatus.propTypes = {};

OptimizationStatus.defaultProps = {};

export default OptimizationStatus;
