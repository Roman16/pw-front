import React, {Component} from 'react';
import {Icon} from 'antd';
import moment from 'moment';
import {connect} from 'react-redux';

import NetMarginWindow from './NetMarginWindow/NetMarginWindow';
import {productsActions} from '../../../../actions/products.actions';
import ConfirmActionPopup from '../../../../components/ModalWindow/ConfirmActionPopup';
import './OptimizationStatus.less';
import {notification} from "../../../../components/Notification";

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
        showFirstStartConfirmModal: false,
        showAllStartConfirmModal: false,
        showStopConfirmModal: false,
        dontShowStartNotificationAgain: this.props.dontShowStartNotificationAgain,
        dontShowStopNotificationAgain: this.props.dontShowStopNotificationAgain,
    };

    cancelModal = () => this.setState({isShowModal: false});

    handleOk = () => {
        this.setState({
            showFirstStartConfirmModal: false
        })
    };

    handleClickStartOptimization = (status) => {
        const {product: {optimized}, selectedAll} = this.props,
            {dontShowStartNotificationAgain} = this.state;

        if (selectedAll) {
            this.setState({
                showAllStartConfirmModal: true
            })
        } else if (!dontShowStartNotificationAgain || !optimized) {
            this.setState({
                showFirstStartConfirmModal: true
            })
        } else {
            this.toStart(status)
        }
    };

    handleClickStopOptimization = (status) => {
        if (!this.state.dontShowStopNotificationAgain || this.props.selectedAll) {
            this.setState({
                showStopConfirmModal: true
            })
        } else {
            this.toStart(status)
        }
    };

    toStart = (status) => {
        const {onSwitchOptimization, product, selectedAll, optimizationOptions} = this.props;

        if (status === RUNNING && !product.product_margin) {
            this.setState({isShowModal: true});
        } else {
            if (product.id) {
                onSwitchOptimization({
                    ...product,
                    ...optimizationOptions,
                    status: status,
                    product_id: product.product_id,
                })
            } else if (selectedAll) {
                onSwitchOptimization({
                    ...product,
                    ...optimizationOptions,
                    status: status,
                    product_id: 'all'
                })
            }

            this.setState({
                showFirstStartConfirmModal: false,
                showStopConfirmModal: false,
                showAllStartConfirmModal: false
            });

            this.props.switchConfirmWindow({status: this.state.dontShowStartNotificationAgain, windowName: 'START'});
            this.props.switchConfirmWindow({status: this.state.dontShowStopNotificationAgain, windowName: 'STOP'});

            status === RUNNING && notification.start({title: 'Optimization successfully started'});
            status === STOPPED && notification.error({title: 'The optimization is paused'});
        }
    };

    render() {
        const {
            product: {
                status,
                created_at,
                total_changes,
                today_changes,
            },
            selectedAll
        } = this.props;

        const {isShowModal, showFirstStartConfirmModal, showStopConfirmModal, showAllStartConfirmModal} = this.state;
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
                        created_at ? moment(created_at).format('DD/MM/Y') : undefined
                    }
                />

                <StatusInfo caption="Total Changes" value={total_changes}/>

                <StatusInfo caption="Today Changes" value={today_changes}/>

                <div className="control">
                    {!isActive
                        ? (
                            <button className="btn default start"
                                    onClick={() => this.handleClickStartOptimization(RUNNING)}>
                                <div className="control-btn-content">
                                    <Icon type="caret-right" className="btn-icon"/>
                                    <div className="btn-text">
                                        START
                                    </div>
                                </div>
                            </button>
                        ) : (
                            <button className="btn default stop"
                                    onClick={() => this.handleClickStopOptimization(STOPPED)}>
                                <div className="control-btn-content">
                                    <div className="icon-stop"/>
                                    <div className="btn-text">
                                        STOP
                                    </div>
                                </div>
                            </button>
                        )
                    }
                </div>

                {isShowModal && (
                    <NetMarginWindow
                        isShowModal={isShowModal}
                        handleCancel={this.cancelModal}
                        selectedAll={selectedAll}
                        handleOk={this.handleOk}
                    />
                )}

                <ConfirmActionPopup
                    visible={showAllStartConfirmModal}
                    handleOk={() => this.toStart(RUNNING)}
                    handleCancel={() => this.setState({showAllStartConfirmModal: false})}
                    title={'Are you ready to start?'}
                    description={'Are you sure you want to start the same optimization strategy for All Products?'}
                />

                <ConfirmActionPopup
                    visible={showFirstStartConfirmModal}
                    handleOk={() => this.toStart(RUNNING)}
                    handleCancel={() => this.setState({showFirstStartConfirmModal: false})}
                    handleChangeCheckbox={(e) => {
                        this.setState({dontShowStartNotificationAgain: e.target.checked})
                    }}
                    title={'Are you ready to start?'}
                    description={'This action will result in the automatic management of your campaigns by our algorithm.'}
                    checkboxText={`Don't show this message again`}
                />

                <ConfirmActionPopup
                    visible={showStopConfirmModal}
                    handleOk={() => this.toStart(STOPPED)}
                    handleCancel={() => this.setState({showStopConfirmModal: false})}
                    handleChangeCheckbox={(e) => {
                        this.setState({dontShowStopNotificationAgain: e.target.checked})
                    }}
                    title={' Are you sure you want to stop?'}
                    description={'We will stop the optimization of your active Amazon PPC campaigns. You can restart it anytime.'}
                    checkboxText={selectedAll ? null : `Don't show this message again`}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    selectedAll: state.products.selectedAll,
    optimizationOptions: state.products.defaultOptimizationOptions,
    isFirstOptimization: state.products.isFirstOptimization,
    dontShowStartNotificationAgain: state.products.dontShowStartNotificationAgain || false,
    dontShowStopNotificationAgain: state.products.dontShowStopNotificationAgain || false,
});

const mapDispatchToProps = dispatch => ({
    onSwitchOptimization: (product) => {
        dispatch(productsActions.updateProduct(product))
    },
    setNetMargin: (netMargin) => {
        dispatch(productsActions.setNetMargin(netMargin))
    },
    switchConfirmWindow: (status) => {
        dispatch(productsActions.dontShowWindowAgain(status))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(OptimizationStatus);
