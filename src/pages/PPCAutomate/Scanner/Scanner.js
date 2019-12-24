import React, {Fragment, Component} from 'react';
import SubscriptionNotificationWindow
    from "../../../components/ModalWindow/InformationWindows/SubscriptionNotificationWindow";
import './Scanner.less';
import {connect} from "react-redux";
import ProblemList from "./ProblemList";
import ProblemGraph from "./ProblemGraph";
import MistakeTerminal from "./MistakeTerminal";
import ModalWindow from "../../../components/ModalWindow/ModalWindow";
import AfterStartWindow from "./ModalWindows/AfterStartWindow";
import RescanWindow from "./ModalWindows/RescanWindow";
import SuccessWindow from "./ModalWindows/SuccessWindow";
import {scannerServices} from "../../../services/scanner.services";

class Scanner extends Component {
    state = {
        visibleStartWindow: false,
        visibleRescanWindow: false,
        visibleSuccessWindow: false,
        mistakeList: []
    };

    handleCloseWindow = (window) => {
        this.setState({
            [`visible${window}Window`]: false
        })
    };

    handleScan = () => {
        scannerServices.getProductMistakes(this.props.selectedProduct.id)
            .then(res => {
                console.log(res);
                this.setState({
                    mistakeList: res.data
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
                onConfirm={this.handleScan}
            />)
        } else if (visibleSuccessWindow) {
            return (<SuccessWindow
                onClose={() => this.handleCloseWindow('Success')}
            />)
        }
    };

    render() {
        const {visibleStartWindow, visibleRescanWindow, visibleSuccessWindow, mistakeList} = this.state;

        return (
            <Fragment>
                <div className="scanner-page">
                    <div className="col">
                        <ProblemList
                            onScanning={this.handleScan}
                        />

                        <ProblemGraph/>
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
                    handleCancel={() => this.handleCloseWindow('Start')}
                >
                    {this.renderWindowContent()}
                </ModalWindow>

                <SubscriptionNotificationWindow product={'ppc'}/>
            </Fragment>
        )
    }
}


const mapStateToProps = state => ({
    selectedProduct: state.products.selectedProduct,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Scanner);
