import React, {Fragment, Component} from 'react';
import SubscriptionNotificationWindow
    from "../../../components/ModalWindow/InformationWindows/SubscriptionNotificationWindow";
import './Scanner.less';

import {Prompt} from 'react-router-dom';
import {history} from "../../../utils/history";
import {connect} from "react-redux";
import ProblemList from "./ProblemList";
import ProblemGraph from "./ProblemGraph";
import MistakeTerminal from "./MistakeTerminal";
import ModalWindow from "../../../components/ModalWindow/ModalWindow";
import AfterStartWindow from "./ModalWindows/AfterStartWindow";
import RescanWindow from "./ModalWindows/RescanWindow";
import SuccessWindow from "./ModalWindows/SuccessWindow";
import {scannerServices} from "../../../services/scanner.services";
import {productsActions} from "../../../actions/products.actions";

let fetchingTimeout = null;

let nextProductId = null;

class Scanner extends Component {
    state = {
        productId: this.props.selectedProduct.id,
        visibleStartWindow: false,
        visibleRescanWindow: false,
        visibleSuccessWindow: false,

        mistakeList: [],
        problemsCount: {},
        fetching: false,
        successFetch: false,
    };

    handleConfirm = () => {
        this.setState({
            productId: nextProductId,
            mistakeList: [],
            problemsCount: {},
            fetching: false,
            successFetch: false,
            visibleRescanWindow: false
        });

        clearTimeout(fetchingTimeout);
    };

    handleCloseWindow = (window) => {
        if (window === 'Rescan') {
            this.props.selectProduct(this.props.products.find(item => item.id === this.state.productId));
        }

        this.setState({
            [`visible${window}Window`]: false
        })
    };

    handleStopScanning = () => {
        this.setState({fetching: false, successFetch: true});
        clearInterval(fetchingTimeout)
    };

    handleScan = async ({pausedCampaigns, netMargin}) => {
        try {
            await scannerServices.scanningProduct({
                productId: this.state.productId,
                paused: pausedCampaigns,
                cogs: netMargin
            });

            this.setState({
                problemsCount: {},
                mistakeList: [],
                visibleStartWindow: true,
                fetching: true
            });

            this.getScanStatus();
        } catch (e) {

        }
    };

    getScanStatus = () => {
        scannerServices.getScanStatus(this.state.productId)
            .then(res => {
                if (res.result && (Object.keys(res.result).length > Object.keys(this.state.problemsCount).length)) {
                    this.getProductMistakes();
                }

                this.setState({
                    problemsCount: res.msg === 'ok' ? res.result : {}
                });

                if (res.result && Object.keys(res.result).length === 5) {
                    clearTimeout(fetchingTimeout);

                    this.getProductMistakes();

                    this.setState({
                        successFetch: true,
                        fetching: false,
                        visibleSuccessWindow: true
                    })
                } else {
                    fetchingTimeout = setTimeout(this.getScanStatus, 1000);
                }
            })
    };

    getProductMistakes = () => {
        scannerServices.getProductMistakes({
            productId: this.state.productId,
        })
            .then(res => {
                this.setState({
                    mistakeList: res.data,
                })
            })
    };

    renderWindowContent = () => {
        const {visibleStartWindow, visibleRescanWindow, visibleSuccessWindow} = this.state;

        if (visibleStartWindow) {
            return (<AfterStartWindow
                onClose={() => this.handleCloseWindow('Start')}
            />)
        } else if (visibleRescanWindow) {
            return (<RescanWindow
                onClose={() => this.handleCloseWindow('Rescan')}
                onConfirm={this.handleConfirm}
            />)
        } else if (visibleSuccessWindow) {
            return (<SuccessWindow
                onClose={() => this.handleCloseWindow('Success')}
            />)
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.selectedProduct.id !== this.props.selectedProduct.id && this.state.fetching && this.props.selectedProduct.id !== this.state.productId) {
            this.setState({
                visibleRescanWindow: true,
            });
            nextProductId = this.props.selectedProduct.id
        } else if (prevProps.selectedProduct.id !== this.props.selectedProduct.id) {
            this.setState({
                productId: this.props.selectedProduct.id
            })
        }
    }

    componentWillUnmount() {
        clearTimeout(fetchingTimeout);

        this.setState({
            mistakeList: [],
            problemsCount: {},
            fetching: false,
            successFetch: false,
        })
    }

    render() {
        const {
            visibleStartWindow,
            visibleRescanWindow,
            visibleSuccessWindow,
            mistakeList,
            problemsCount,
            fetching,
            successFetch
        } = this.state;

        return (
            <Fragment>
                <div className="scanner-page">
                    <div className="col">
                        <ProblemList
                            onScanning={this.handleScan}
                            problemsCount={problemsCount}
                            fetching={fetching}
                            successFetch={successFetch}
                            stopScanning={this.handleStopScanning}
                            onChangeCheckbox={this.handleChangeCheckbox}
                        />

                        <ProblemGraph
                            problemsCount={problemsCount}
                        />
                    </div>

                    <MistakeTerminal
                        mistakeList={mistakeList}
                    />
                </div>

                <ModalWindow
                    className={'scanner-window'}
                    mask={true}
                    footer={null}
                    visible={visibleStartWindow || visibleRescanWindow || visibleSuccessWindow}
                    handleCancel={() => this.handleCloseWindow(visibleStartWindow ? 'Start' : (visibleRescanWindow ? 'Rescan' : 'Success'))}
                >
                    {this.renderWindowContent()}
                </ModalWindow>

                <SubscriptionNotificationWindow product={'ppc'}/>

                <Prompt
                    when={fetching}
                    message="Are you sure? The current scanning results will be lost"
                />
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    selectedProduct: state.products.selectedProduct,
    products: state.products.productList,
});

const mapDispatchToProps = dispatch => ({
    selectProduct: product => {
        dispatch(productsActions.fetchProductDetails(product));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Scanner);
