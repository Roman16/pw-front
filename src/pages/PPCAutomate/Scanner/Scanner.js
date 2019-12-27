import React, {Fragment, Component} from 'react';
import SubscriptionNotificationWindow
    from "../../../components/ModalWindow/InformationWindows/SubscriptionNotificationWindow";
import './Scanner.less';
import {Prompt} from 'react-router-dom';
import {connect} from "react-redux";
import ProblemList from "./ProblemList";
import ProblemGraph from "./ProblemGraph";
import MistakeTerminal from "./MistakeTerminal";
import ModalWindow from "../../../components/ModalWindow/ModalWindow";
import AfterStartWindow from "./ModalWindows/AfterStartWindow";
import RescanWindow from "./ModalWindows/RescanWindow";
import SuccessWindow from "./ModalWindows/SuccessWindow";
import {scannerServices} from "../../../services/scanner.services";


const defaultData = [
    {
        id: 0,
        number: 0,
        type: "DuplicateKeywords",
        message: `<span style="color: #343a40;">Mistake: Duplicate Keywords.</span> <span style="">Exact</span> keyword <span style="color: #6610F2;">some customer search term 1</span> in ad group <span class="mistake adGroupName">Exact Medium Acos (ema)</span> in campaign <span style="color: #82BB79;">FM Foot Massager B07P9K167V (ST Exact / Phrase)</span> is a duplicate of <span style="">exact</span> keyword <span style="color: #6610F2;">some customer search term 1</span> in ad group <span class="mistake adGroupName">Exact Low Acos (ela)</span> in campaign <span style="color: #82BB79;">FM Foot Massager B07P9K167V (ST Exact / Phrase)</span>`
    },
    {
        id: 1,
        number: 1,
        type: "DuplicateKeywords",
        message: `<span style="color: #343a40;">Mistake: Duplicate Keywords.</span> <span style="">Exact</span> keyword <span style="color: #6610F2;">some customer search term 1</span> in ad group <span class="mistake adGroupName">Exact Medium Acos (ema)</span> in campaign <span style="color: #82BB79;">FM Foot Massager B07P9K167V (ST Exact / Phrase)</span> is a duplicate of <span style="">exact</span> keyword <span style="color: #6610F2;">some customer search term 1</span> in ad group <span class="mistake adGroupName">Exact Low Acos (ela)</span> in campaign <span style="color: #82BB79;">FM Foot Massager B07P9K167V (ST Exact / Phrase)</span>`
    },
    {
        id: 2,
        number: 2,
        type: "DuplicateKeywords",
        message: `<span style="color: #343a40;">Mistake: Duplicate Keywords.</span> <span style="">Exact</span> keyword <span style="color: #6610F2;">some customer search term 1</span> in ad group <span class="mistake adGroupName">Exact Medium Acos (ema)</span> in campaign <span style="color: #82BB79;">FM Foot Massager B07P9K167V (ST Exact / Phrase)</span> is a duplicate of <span style="">exact</span> keyword <span style="color: #6610F2;">some customer search term 1</span> in ad group <span class="mistake adGroupName">Exact Low Acos (ela)</span> in campaign <span style="color: #82BB79;">FM Foot Massager B07P9K167V (ST Exact / Phrase)</span>`
    },
    {
        id: 3,
        number: 3,
        type: "DuplicateKeywords",
        message: `<span style="color: #343a40;">Mistake: Duplicate Keywords.</span> <span style="">Exact</span> keyword <span style="color: #6610F2;">some customer search term 1</span> in ad group <span class="mistake adGroupName">Exact Medium Acos (ema)</span> in campaign <span style="color: #82BB79;">FM Foot Massager B07P9K167V (ST Exact / Phrase)</span> is a duplicate of <span style="">exact</span> keyword <span style="color: #6610F2;">some customer search term 1</span> in ad group <span class="mistake adGroupName">Exact Low Acos (ela)</span> in campaign <span style="color: #82BB79;">FM Foot Massager B07P9K167V (ST Exact / Phrase)</span>`
    },
];

const defaultResults = {
    DuplicateKeywords: 9,
    BadPerformingKeywords: 4,
    KeywordsHarvesting: 21,
    PoorSemanticCore: 7,
    PATs: 2
};

let fetchingInterval = null;

const shouldBlockNavigation = true;

class Scanner extends Component {
    state = {
        visibleStartWindow: false,
        visibleRescanWindow: false,
        visibleSuccessWindow: false,

        mistakeList: [],
        problemsCount: {},
        fetching: false,
        successFetch: false
    };

    handleCloseWindow = (window) => {
        this.setState({
            [`visible${window}Window`]: false
        })
    };

    handleStopScanning = () => {
        this.setState({fetching: false})
    };

    handleScan = () => {
        this.setState({
            visibleStartWindow: true,
            fetching: true
        });

        // fetchingInterval = setInterval(this.getScanStatus, 1000);
        this.getScanStatus();

        this.setState({
            mistakeList: defaultData
        });
    };

    getScanStatus = () => {
        this.setState({
            problemsCount: defaultResults
        });

        scannerServices.getScanStatus(this.props.selectedProduct.id)
            .then(res => {
                this.setState({
                    problemsCount: res.result
                });

                if (res.result.PATs) {
                    clearInterval(fetchingInterval);

                    scannerServices.getProductMistakes(this.props.selectedProduct.id)
                        .then(res => {
                            this.setState({
                                mistakeList: res.data,
                                successFetch: true
                            })
                        })
                }
            })
    };

    componentDidMount() {
        // this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave)
    }

    routerWillLeave(nextLocation) {
        // return false to prevent a transition w/o prompting the user,
        // or return a string to allow the user to decide:
        // return `null` or nothing to let other hooks to be executed
        //
        // NOTE: if you return true, other hooks will not be executed!
        if (!this.state.isSaved)
            return 'Your work is not saved! Are you sure you want to leave?'
    }

    renderWindowContent = () => {
        const {visibleStartWindow, visibleRescanWindow, visibleSuccessWindow} = this.state;

        if (visibleStartWindow) {
            return (<AfterStartWindow
                onClose={() => this.handleCloseWindow('Start')}
            />)
        } else if (visibleRescanWindow) {
            return (<RescanWindow
                onClose={() => this.handleCloseWindow('Rescan')}
                onConfirm={this.handleScan}
            />)
        } else if (visibleSuccessWindow) {
            return (<SuccessWindow
                onClose={() => this.handleCloseWindow('Success')}
            />)
        }
    };

    // componentDidUpdate = () => {
    //     if (shouldBlockNavigation) {
    //         window.onbeforeunload = () => true
    //     } else {
    //         window.onbeforeunload = undefined
    //     }
    // };


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
                    handleCancel={() => this.handleCloseWindow(visibleStartWindow ? 'Start' : visibleRescanWindow ? 'Rescan' : 'Success')}
                >
                    {this.renderWindowContent()}
                </ModalWindow>

                <SubscriptionNotificationWindow product={'ppc'}/>

                {/*<Prompt*/}
                {/*    when={shouldBlockNavigation}*/}
                {/*    message='You have unsaved changes, are you sure you want to leave?'*/}
                {/*/>*/}
            </Fragment>
        )
    }
}


const mapStateToProps = state => ({
    selectedProduct: state.products.selectedProduct,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Scanner);
