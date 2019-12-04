import React from 'react';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {history} from "../../utils/history";

import './FreeTrial.less';
import {subscriptionProducts} from "../../constans/subscription.products.name";

const FreeTrial = ({product}) => {
    const {trialEndsDate, onTrial} = useSelector(state => ({
        trialEndsDate: state.user.subscriptions[subscriptionProducts.find(item => item.key === product).productId] && state.user.subscriptions[subscriptionProducts.find(item => item.key === product).productId].trial_ends_at,
        onTrial: state.user.subscriptions[subscriptionProducts.find(item => item.key === product).productId] && state.user.subscriptions[subscriptionProducts.find(item => item.key === product).productId].on_trial,
    }));

    const todayDate = moment(new Date());
    const freeTrial = moment(trialEndsDate).diff(todayDate, 'days');

    if (!onTrial) {
        return (
            <div className="additional">
                <p className="free-trial">
                    Free Trial
                    <span>{freeTrial >= 0 ? freeTrial : 0}</span>
                    Days Left
                </p>

                {/*<div className="btn-upgrade">*/}
                {/*    <Button*/}
                {/*        onClick={() => {*/}
                {/*            history.push(`/account-subscription`);*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        Upgrade Now*/}
                {/*        <Icon type="arrow-up" style={{color: '#8fd39d'}}/>*/}
                {/*    </Button>*/}
                {/*</div>*/}
            </div>
        );
    } else {
        return ('')
    }
};


export default FreeTrial;
