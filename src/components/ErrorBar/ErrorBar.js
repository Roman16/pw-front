import React from "react"
import './ErrorBar.less'
import {useSelector, useDispatch} from "react-redux"
import {SVG} from "../../utils/icons"
import InformationTooltip from "../Tooltip/Tooltip"
import {Link} from "react-router-dom"

// const accountLinks = {
//     amazon_mws: {
//         status: 'FAILED'
//     },
//     amazon_ppc: {
//         status: 'UNAUTHORIZED'
//     }
// };

let intervalId = null


const ErrorBar = () => {
    const trialLeftDays = useSelector(state => state.user.subscription.trial.days_before_trial_end_date)
    const onTrial = useSelector(state => state.user.subscription.trial.trial_active),
        marketplace = useSelector(state => state.user.activeAmazonMarketplace),
        region = useSelector(state => state.user.activeAmazonRegion),
        importStatus = useSelector(state => state.user.importStatus)


    return (
        <div className='errors-bar'>
            {onTrial && <div className={'on-trial'}>
                <InformationTooltip
                    position={'bottomRight'}
                    type={'custom'}
                    className={'trial-tooltip'}
                    description={'Hey there, to make sure the software will continue to work after the free trial ends, please make sure that you have a valid credit card attached to the account.'}>
                    <SVG id={'attention-bar-icon'}/>
                </InformationTooltip>
                Free Trial
                <span> {trialLeftDays >= 0 ? ` ${trialLeftDays} ` : 0} </span>
                Days Left
            </div>}

            {marketplace && marketplace.profile_id === null && importStatus.common_resources?.required_parts_details.profiles.part_ready &&
            <div className={'error'}>
                <SVG id={'error-bar-icon'}/>
                <p><strong> Attention!</strong> profile_id = null </p>
            </div>}

            {/*{(accountLinks.amazon_mws.status === 'IN_PROGRESS' || accountLinks.amazon_ppc.status === 'IN_PROGRESS') &&*/}
            {/*<div className={'in-progress'}>*/}
            {/*    <SVG id={'attention-bar-icon'}/>*/}
            {/*    We are currently checking your Seller Central API connection.*/}
            {/*</div>}*/}

            {region.mws_access_status === 'CREDENTIALS_SERVICE_ERROR' &&
            <div className={'error'}>
                <SVG id={'error-bar-icon'}/>
                <p><strong> Attention!</strong> Looks like your MWS access was revoked. Please go to your Seller Central
                    account under settings, then user permissions, reinstate access, copy your new authorization token,
                    and
                    enter it on your Sponsoreds Account page. This will then reinstate access and your account synced
                    again.</p>

                <Link to={'/account/api-connections'} className={'btn white'}>Edit Credentials</Link>
            </div>}


            {region.amazon_ads_api_access_status === 'CREDENTIALS_SERVICE_ERROR' &&
            <div className={'error'}>
                <SVG id={'error-bar-icon'}/>
                <p><strong>Attention!</strong> Looks like we don’t have permission for your Advertising Campaigns. It
                    usually happens
                    because of the wrong marketplace, wrong Amazon account, or you don’t have Amazon Advertising. Please
                    update your Amazon Advertising credentials in your account or contact support.</p>

                <Link to={'/account/api-connections'} className={'btn white'}>Edit Credentials</Link>
            </div>}

            {/*{(accountLinks.amazon_mws.status === 'UNAUTHORIZED' && accountLinks.amazon_ppc.status === 'UNAUTHORIZED') ?*/}
            {/*    <div className={'unauthorized'}><SVG id={'attention-bar-icon'}/>*/}
            {/*        Attention, we have some problems with Seller Central connection, please*/}
            {/*        go to your account and update your credentials or contact support.</div>*/}
            {/*    :*/}
            {/*    accountLinks.amazon_mws.status === 'UNAUTHORIZED' ?*/}
            {/*        <div className={'unauthorized'}><SVG id={'attention-bar-icon'}/>*/}
            {/*            Attention, we have some problems with MWS API connection, please go*/}
            {/*            to your account and update your credentials or contact support.</div>*/}
            {/*        :*/}
            {/*        accountLinks.amazon_ppc.status === 'UNAUTHORIZED' &&*/}
            {/*        <div className={'unauthorized'}><SVG id={'attention-bar-icon'}/>*/}
            {/*            Attention, we have some problems with your Amazon Advertising*/}
            {/*            connection, please go to your account and update your credentials or contact support.</div>*/}
            {/*}*/}
        </div>
    )
}

export default ErrorBar

//possible status
//----------------
//SUCCESS
//FAILED
//UNAUTHORIZED
//IN_PROGRESS
//----------------
