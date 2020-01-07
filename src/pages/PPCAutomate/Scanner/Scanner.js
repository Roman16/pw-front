import React, {Fragment, Component} from 'react';
import SubscriptionNotificationWindow
    from "../../../components/ModalWindow/InformationWindows/SubscriptionNotificationWindow";
import './Scanner.less';

import {Prompt} from 'react-router-dom';
import XLSX from 'xlsx';
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
import ErrorWindow from "./ModalWindows/ErrorWindow";

let fetchingTimeout = null;

let nextProductId = null;

class Scanner extends Component {
    state = {
        productId: this.props.selectedProduct.id,
        visibleStartWindow: false,
        visibleRescanWindow: false,
        visibleSuccessWindow: false,
        visibleErrorWindow: false,

        mistakeList: [],
        totalMistakes: null,
        problemsCount: {},
        fetching: false,
        successFetch: false,

        paginationParams: {
            totalSize: 0,
            page: 1,
            pageSize: 50
        }
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
        if (window === 'all') {
            this.setState({
                visibleStartWindow: false,
                visibleRescanWindow: false,
                visibleSuccessWindow: false,
                visibleErrorWindow: false
            })
        }

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

    downloadFile = () => {
        let data = [...this.state.mistakeList];

        data.forEach(function (v) {
            delete v.mistake_type;
            delete v.id
        });

        data = data.map((item, index) => ({...item, number: index + 1}));

        data = data.map(item => {
            const html = item.message;
            const div = document.createElement("div");
            div.innerHTML = html;
            const text = div.textContent || div.innerText || "";

            return ({
                ...item,
                message: text
            })
        });

        const ws = XLSX.utils.json_to_sheet([{
            number: 'Index',
            type: 'Mistake type',
            general_type: 'General type',
            campaign_name: 'Campaign name',
            ad_group_name: 'Ad Group name',
            kp_text: 'Keyword / Product Attribute Targeting text',
            message: 'Message'
        }, ...data], {skipHeader: 1});
        const wb = {Sheets: {'data': ws}, SheetNames: ['data']};

        XLSX.writeFile(wb, "Problems Report.xlsx")
    };

    getScanStatus = () => {
        scannerServices.getScanStatus(this.state.productId)
            .then(res => {
                if (res.code === 500) {
                    this.setState({
                        successFetch: false,
                        fetching: false,
                        visibleErrorWindow: true
                    });
                    return;
                }

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


    onChangePagination = (params) => {
        this.setState({
            paginationParams: {
                ...this.state.paginationParams,
                ...params
            }
        }, this.getProductMistakes)

    };

    getProductMistakes = () => {
        scannerServices.getProductMistakes({
            productId: this.state.productId,
            page: this.state.paginationParams.page,
            pageSize: this.state.paginationParams.pageSize,
        })
            .then(res => {
                this.setState({
                    mistakeList: res.data,
                    paginationParams: {
                        ...this.state.paginationParams,
                        totalSize: res.recordsTotal
                    }
                })
            })
    };

    renderWindowContent = () => {
        const {visibleStartWindow, visibleRescanWindow, visibleSuccessWindow, visibleErrorWindow} = this.state;

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
        } else if (visibleErrorWindow) {
            return (<ErrorWindow
                onClose={() => this.handleCloseWindow('Error')}
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
            visibleErrorWindow,
            mistakeList,
            problemsCount,
            fetching,
            successFetch,
            paginationParams: {
                totalSize,
                page,
                pageSize
            }
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
                            onDownloadFile={this.downloadFile}
                        />

                        <ProblemGraph
                            problemsCount={problemsCount}
                        />
                    </div>

                    <MistakeTerminal
                        mistakeList={mistakeList}
                        totalSize={totalSize}
                        page={page}
                        pageSize={pageSize}
                        onChangePagination={this.onChangePagination}
                    />
                </div>

                <ModalWindow
                    className={'scanner-window'}
                    mask={true}
                    footer={null}
                    visible={visibleStartWindow || visibleRescanWindow || visibleSuccessWindow || visibleErrorWindow}
                    handleCancel={() => this.handleCloseWindow('all')}
                >
                    {this.renderWindowContent()}
                </ModalWindow>

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
