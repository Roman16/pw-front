import React, {useEffect} from "react";
import './ErrorBar.less';
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {SVG} from "../../utils/icons";
import {userActions} from "../../actions/user.actions";
import moment from "moment";

// const accountLinks = {
//     amazon_mws: {
//         status: 'FAILED'
//     },
//     amazon_ppc: {
//         status: 'UNAUTHORIZED'
//     }
// };

let intervalId = null;

const ErrorBar = () => {
    const dispatch = useDispatch();

    const {accountLinks, trialEndsDate, onTrial} = useSelector(state => ({
        accountLinks: state.user.account_links[0],
        trialEndsDate: state.user.subscriptions[Object.keys(state.user.subscriptions)[0]] && state.user.subscriptions[Object.keys(state.user.subscriptions)[0]].trial_ends_at,
        onTrial: state.user.subscriptions[Object.keys(state.user.subscriptions)[0]] && state.user.subscriptions[Object.keys(state.user.subscriptions)[0]].on_trial,
    }));

    const freeTrialDays = Math.round(moment(trialEndsDate).diff(moment(new Date()), 'hours') / 24);


    useEffect(() => {
        intervalId = setInterval(() => {
            if (accountLinks.amazon_mws.status !== 'SUCCESS' || accountLinks.amazon_ppc.status !== 'SUCCESS') {
                dispatch(userActions.getPersonalUserInfo());
            } else {
                clearInterval(intervalId);
            }
        }, 60000);


        return (() => {
            clearInterval(intervalId);
        })
    }, [accountLinks]);

    return (
        <div className='errors-bar'>
            {onTrial && <div className={'on-trial'}>
                <SVG id={'attention-bar-icon'}/>
                Free Trial
                <span>{freeTrialDays >= 0 ? freeTrialDays : 0}</span>
                Days Left
            </div>}

            {(accountLinks.amazon_mws.status === 'IN_PROGRESS' || accountLinks.amazon_ppc.status === 'IN_PROGRESS') &&
            <div className={'in-progress'}>
                <SVG id={'attention-bar-icon'}/>
                We are currently checking your Seller Central API connection.
            </div>}

            {accountLinks.amazon_mws.status === 'FAILED' &&
            <div className={'error'}>
                <SVG id={'error-bar-icon'}/>
                <p><strong> Attention!</strong> Looks like your MWS access was revoked. Please go to your Seller Central
                    account under settings, then user permissions, reinstate access, copy your new authorization token,
                    and
                    enter it on your Profit Whales Account page. This will then reinstate access and your account synced
                    again.</p>

                <Link to={'/api-connections'}>Edit Credentials</Link>
            </div>}

            {accountLinks.amazon_ppc.status === 'FAILED' &&
            <div className={'error'}>
                <SVG id={'error-bar-icon'}/>
                <p><strong>Attention!</strong> Looks like we don’t have permission for your Advertising Campaigns. It
                    usually happens
                    because of the wrong marketplace, wrong Amazon account, or you don’t have Amazon Advertising. Please
                    update your Amazon Advertising credentials in your account or contact support.</p>

                <Link to={'/api-connections'}>Edit Credentials</Link>
            </div>}

            {(accountLinks.amazon_mws.status === 'UNAUTHORIZED' && accountLinks.amazon_ppc.status === 'UNAUTHORIZED') ?
                <div className={'unauthorized'}><SVG id={'attention-bar-icon'}/>
                    Attention, we have some problems with Seller Central connection, please
                    go to your account and update your credentials or contact support.</div>
                :
                accountLinks.amazon_mws.status === 'UNAUTHORIZED' ?
                    <div className={'unauthorized'}><SVG id={'attention-bar-icon'}/>
                        Attention, we have some problems with MWS API connection, please go
                        to your account and update your credentials or contact support.</div>
                    :
                    accountLinks.amazon_ppc.status === 'UNAUTHORIZED' &&
                    <div className={'unauthorized'}><SVG id={'attention-bar-icon'}/>
                        Attention, we have some problems with your Amazon Advertising
                        connection, please go to your account and update your credentials or contact support.</div>
            }
        </div>
    )
};

export default ErrorBar;

//possible status
//----------------
//SUCCESS
//FAILED
//UNAUTHORIZED
//IN_PROGRESS
//----------------
