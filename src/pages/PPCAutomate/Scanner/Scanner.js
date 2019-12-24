import React, {Fragment} from 'react';
import SubscriptionNotificationWindow
    from "../../../components/ModalWindow/InformationWindows/SubscriptionNotificationWindow";
import './Scanner.less';
import ProblemList from "./ProblemList";
import ProblemGraph from "./ProblemGraph";


const Scanner = () => {

    return (
        <Fragment>
            <div className="scanner-page">
                <div className="col">
                    <ProblemList />

                    <ProblemGraph />
                </div>

                <div className="col"></div>
            </div>

            <SubscriptionNotificationWindow product={'ppc'}/>
        </Fragment>
    )
};

export default Scanner;