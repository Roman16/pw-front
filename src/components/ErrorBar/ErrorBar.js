import React from "react"
import './ErrorBar.less'
import {useSelector, useDispatch} from "react-redux"
import {SVG} from "../../utils/icons"
import InformationTooltip from "../Tooltip/Tooltip"
import {Link} from "react-router-dom"
import {marketplaceIdValues} from "../../constans/amazonMarketplaceIdValues"

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
        importStatus = useSelector(state => state.user.importStatus),
        isAgencyClient = useSelector(state => state.user?.is_agency_client === 1)

    const marketplaceName = marketplaceIdValues[marketplace?.marketplace_id]?.countryName || ''

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
                {!isAgencyClient ? <>Contract with Agency expires in <span> {trialLeftDays && trialLeftDays >= 0 ? ` ${trialLeftDays} ` : 0} </span> days</> :
                <>Free Trial <span> {trialLeftDays && trialLeftDays >= 0 ? ` ${trialLeftDays} ` : 0} </span> Days Left</> }
            </div>}

            {marketplace && marketplace.profile_id === null && importStatus.common_resources?.required_parts_details.profiles.part_ready &&
            <div className={'error'}>
                <SVG id={'error-bar-icon'}/>
                <p>No Advertising account exists for {marketplaceName} marketplace for current Seller account. We are
                    unable to provide Sponsoreds services for {marketplaceName} marketplace without an existing
                    Advertising account. Please select another marketplace or create an Advertising account
                    for {marketplaceName} marketplace.</p>
            </div>}

            {/*{(accountLinks.amazon_mws.status === 'IN_PROGRESS' || accountLinks.amazon_ppc.status === 'IN_PROGRESS') &&*/}
            {/*<div className={'in-progress'}>*/}
            {/*    <SVG id={'attention-bar-icon'}/>*/}
            {/*    We are currently checking your Seller Central API connection.*/}
            {/*</div>}*/}

            {region != null && region.is_amazon_ads_api_attached !== true &&
            <div className={'error'}>
                <SVG id={'error-bar-icon'}/>
                <p><strong>Attention!</strong> Amazon Ads API access is not granted or was revoked for this Amazon
                    account. Please go to your <b>Account -> Amazon Accounts</b> page and connect Amazon Ads API for
                    this account.</p>

                <Link to={'/account/api-connections'} className={'btn white'}>Edit Credentials</Link>
            </div>}

            {region != null && region.is_amazon_sp_api_attached !== true &&
            <div className={'error'}>
                <SVG id={'error-bar-icon'}/>
                <p><strong>Attention!</strong> Amazon SP API access is not granted or was revoked for this Amazon
                    account. Please go to your <b>Account -> Amazon Accounts</b> page and connect Amazon SP API for
                    this account.</p>

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
