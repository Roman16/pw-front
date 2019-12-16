import React, {Component} from 'react';
import {Icon} from 'antd';
import moment from 'moment';
import {Button} from 'antd';
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
        showStopConfirmModal: false
    };

    cancelModal = () => this.setState({isShowModal: false});

    handleOk = () => {
        this.setState({
            showFirstStartConfirmModal: false
        })
    };

    handleClickStartOptimization = (status) => {
        const {product: {optimized}, selectedAll} = this.props;
        if (!optimized || selectedAll) {
            this.setState({
                showFirstStartConfirmModal: true
            })
        } else {
            this.toStart(status)
        }
    };


    handleClickStopOptimization = () => {
        this.setState({
            showStopConfirmModal: true
        })
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
                showStopConfirmModal: false
            });

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

        const {isShowModal, showFirstStartConfirmModal, showStopConfirmModal} = this.state;
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
                            <button className="btn default stop" onClick={() => this.handleClickStopOptimization()}>
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
                    visible={showFirstStartConfirmModal}
                    handleOk={() => this.toStart(RUNNING)}
                    handleCancel={() => this.setState({showFirstStartConfirmModal: false})}
                    title={'Are you ready to start?'}
                    description={selectedAll ?
                        'Are you sure you want to start the same optimization strategy for All Products?'
                        :
                        'This action will result in the starting management of your active Amazon PPC campaigns.'}
                />

                <ConfirmActionPopup
                    visible={showStopConfirmModal}
                    handleOk={() => this.toStart(STOPPED)}
                    handleCancel={() => this.setState({showStopConfirmModal: false})}
                    title={' Are you sure you want to stop?'}
                    description={'We will stop the optimization of your active Amazon PPC campaigns. You can restart it anytime.'}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    selectedAll: state.products.selectedAll,
    optimizationOptions: state.products.defaultOptimizationOptions,
    isFirstOptimization: state.products.isFirstOptimization
});

const mapDispatchToProps = dispatch => ({
    onSwitchOptimization: (product) => {
        dispatch(productsActions.updateProduct(product))
    },
    setNetMargin: (netMargin) => {
        dispatch(productsActions.setNetMargin(netMargin))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(OptimizationStatus);
