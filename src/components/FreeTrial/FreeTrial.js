import React from 'react';
import {useSelector} from 'react-redux';
import moment from 'moment';

import './FreeTrial.less';

const FreeTrial = ({product}) => {
    const {trialEndsDate, onTrial} = useSelector(state => ({
        trialEndsDate: state.user.subscriptions[Object.keys(state.user.subscriptions)[0]] && state.user.subscriptions[Object.keys(state.user.subscriptions)[0]].trial_ends_at,
        onTrial: state.user.subscriptions[Object.keys(state.user.subscriptions)[0]] && state.user.subscriptions[Object.keys(state.user.subscriptions)[0]].on_trial,
    }));

    const todayDate = moment(new Date());
    const freeTrial = Math.round(moment(trialEndsDate).diff(todayDate, 'hours') / 24);

    if (onTrial) {
        return (
            <div className="additional">
                <p className="free-trial">
                    Free Trial
                    <span>{freeTrial >= 0 ? freeTrial : 0}</span>
                    Days Left
                </p>
            </div>
        );
    } else {
        return ('')
    }
};


export default FreeTrial;
