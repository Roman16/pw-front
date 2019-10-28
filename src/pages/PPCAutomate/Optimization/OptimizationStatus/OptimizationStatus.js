import React, {Component} from 'react';
import {Icon} from 'antd';
import moment from 'moment';
import {Button} from 'antd';
import {connect} from 'react-redux';

import NetMarginWindow from './NetMarginWindow/NetMarginWindow';
import {productsActions} from '../../../../actions/products.actions';

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

    cancelModal = () => this.setState({isShowModal: false});

    toStart = (status) => {
        const {onSwitchOptimization, product, selectedAll, optimizationOptions} = this.props;

        if (status === RUNNING && !product.product_margin) {
            this.setState({isShowModal: true});
        } else {
            onSwitchOptimization({
                ...product,
                ...optimizationOptions,
                status: status,
                product_id: selectedAll ? 'all' : product.product_id,
            })
        }
    };

    render() {
        const {
            product: {
                status,
                created_at,
                total_changes,
                today_change,
            },
            selectedAll
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
                        created_at ? moment(created_at).format('DD/MM/Y') : undefined
                    }
                />

                <StatusInfo caption="Total Changes" value={total_changes}/>

                <StatusInfo caption="Today Changes" value={today_change}/>

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
                        isShowModal={isShowModal}
                        handleCancel={this.cancelModal}
                        selectedAll={selectedAll}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    selectedAll: state.products.selectedAll,
    optimizationOptions: state.products.defaultOptimizationOptions
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
