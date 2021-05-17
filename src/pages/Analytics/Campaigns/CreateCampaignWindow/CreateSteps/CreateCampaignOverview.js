import React from "react"
import moment from 'moment-timezone'
import {numberMask} from "../../../../../utils/numberMask"
import {round} from "../../../../../utils/round"
import {useSelector} from "react-redux"
import _ from 'lodash'

const CreateCampaignOverview = ({createData}) => {
    const portfolioList = useSelector(state => state.analytics.portfolioList)

    const targetingsTypeEnum = {
            'Auto': 'Automatic Targeting',
            'Manual': 'Manual Targeting',
        },
        biddingStrategyEnum = {
            'legacyForSales': 'Dynamic bids - down only',
            'autoForSales': 'Dynamic bids - up and down',
            'manual': 'Fixed bids'
        },
        TTargetingTypeEnum = {
            'keyword': 'Keyword Targeting',
            'product': 'Product Targeting',
        }

    const fields = {
        campaignType: {
            title: 'Campaign Type',
            fieldKey: 'advertisingType',
            render: (value) => value === 'SponsoredProducts' && 'Sponsored Products'
        },
        campaignName: {
            title: 'Campaign Name',
            fieldKey: 'name'
        },
        portfolioName: {
            title: 'Portfolio',
            fieldKey: 'portfolioId',
            render: value => value == null ? 'No Portfolio' : _.find(portfolioList, {portfolioId: value}).name
        },
        startDate: {
            title: 'Start',
            fieldKey: 'startDate',
            render: value => value && moment(value).tz('America/Los_Angeles').format('MMM DD, YYYY')
        },
        endDate: {
            title: 'End',
            fieldKey: 'endDate',
            render: value => value ? moment(value).tz('America/Los_Angeles').format('MMM DD, YYYY') : 'No end date'
        },
        dailyBudget: {
            title: 'Daily Budget',
            fieldKey: 'calculatedBudget',
            render: value => `${numberMask(value, 2)}$`
        },
        status: {
            title: 'Status',
            fieldKey: 'state',
            render: value => value === 'enabled' ? 'Enabled' : 'Paused'
        },
        targeting: {
            title: 'Targeting',
            fieldKey: 'calculatedCampaignSubType',
            render: value => targetingsTypeEnum[value]
        },
        biddingStrategy: {
            title: 'Campaign bidding strategy',
            fieldKey: 'bidding_strategy',
            render: value => biddingStrategyEnum[value]
        },
        bidsTopOfSearch: {
            title: 'Bids by placement: Top of Search (first page)',
            fieldKey: 'bidding_adjustments',
            render: value => `${round(value[0].percentage, 2)}%`
        },
        bidsProductPage: {
            title: 'Bids by placement: Product pages (competitors pages)',
            fieldKey: 'bidding_adjustments',
            render: value => `${round(value[1].percentage, 2)}%`
        },
        // adGroupName: {
        //     title: 'Ad Group Name',
        //     fieldKey: 'ad_group_name'
        // },
        // adGroupBid: {
        //     title: 'Default Bid',
        //     fieldKey: 'ad_group_default_bid',
        //     render: value => `${numberMask(value, 2)}$`
        // },
        // productAds: {
        //     title: 'Product Ads',
        //     fieldKey: 'selectedProductAds',
        //     render: value => value.length > 0 && <div
        //         className={'overflow-text'}
        //         title={value.map(item => item.asin).join(', ')}
        //     >
        //         {value.length} products: {value.map(item => item.asin).join(', ')}
        //     </div>
        // },
        // targetCloseMatch: {
        //     title: 'Targeting Groups: Close match',
        //     fieldKey: 'target_close_match',
        //     render: value => `${numberMask(value, 2)}$`
        // },
        // targetLooseMatch: {
        //     title: 'Targeting Groups: Loose match',
        //     fieldKey: 'target_loose_match',
        //     render: value => `${numberMask(value, 2)}$`
        // },
        // targetSubstitutes: {
        //     title: 'Targeting Groups: Substitutes',
        //     fieldKey: 'target_substitutes',
        //     render: value => `${numberMask(value, 2)}$`
        // },
        // targetComplements: {
        //     title: 'Targeting Groups: Complements',
        //     fieldKey: 'target_complements',
        //     render: value => `${numberMask(value, 2)}$`
        // },
        // negativeKeywords: {
        //     title: 'Negative Keywords',
        //     fieldKey: 'negative_keywords',
        //     render: value => value.length > 0 && `${value.length} keywords`
        // },
        // negativePATs: {
        //     title: 'Negative PATs',
        //     fieldKey: 'negative_pats',
        //     render: value => value.length > 0 && `${value.length} ASINs`
        // },
        // targetingType: {
        //     title: 'Targeting Type',
        //     fieldKey: 't_targeting_type',
        //     render: value => TTargetingTypeEnum[value]
        // },
        // keywordTargeting: {
        //     title: 'Keyword targeting',
        //     fieldKey: 'keyword_targetings',
        //     render: value => value.length > 0 && `${value.length} keywords`
        // },
        // negativeKeywordTargeting: {
        //     title: 'Negative Keyword Targeting',
        //     fieldKey: 'keyword_targetings',
        //     render: value => value.length > 0 && `${value.length} keywords`
        // },
    }

    const allFields = Object.keys(fields),
        automaticTargetingFields = Object.keys(fields).filter(item => item !== 'targetCloseMatch' || item !== 'targetLooseMatch' || item !== 'targetSubstitutes' || item !== 'targetComplements'),
        fieldsWithoutAdGroup = ['campaignType', 'campaignName', 'portfolioName', 'startDate', 'endDate', 'dailyBudget', 'targeting', 'biddingStrategy', 'bidsTopOfSearch', 'bidsProductPage']


    if (!createData.create_ad_group) {
        return (<div className={'step step-5 campaign-overview-step'}>
            <h3>Overview</h3>

            <div className="campaign-information">
                {allFields.map(key => (
                    <div className="row">
                        <div className="label">{fields[key].title}</div>
                        <div
                            className="value">{fields[key].render ? fields[key].render(createData[fields[key].fieldKey]) : createData[fields[key].fieldKey]}</div>
                    </div>
                ))}
            </div>
        </div>)
    } else if (createData.targetings_type === 'automatic_targeting') {
        return (<div className={'step step-5 campaign-overview-step'}>
            <h3>Overview</h3>

            <div className="campaign-information">
                {automaticTargetingFields.map(key => (
                    <div className="row">
                        <div className="label">{fields[key].title}</div>
                        <div
                            className="value">{fields[key].render ? fields[key].render(createData[fields[key].fieldKey]) : createData[fields[key].fieldKey]}</div>
                    </div>
                ))}
            </div>
        </div>)
    } else if (createData.targetings_type === 'manual_targeting' && createData.t_targeting_type === 'product') {
        return (<div className={'step step-5 campaign-overview-step'}>
            <h3>Overview</h3>

            <div className="campaign-information">
                {fieldsWithoutAdGroup.map(key => (
                    <div className="row">
                        <div className="label">{fields[key].title}</div>
                        <div
                            className="value">{fields[key].render ? fields[key].render(createData[fields[key].fieldKey]) : createData[fields[key].fieldKey]}</div>
                    </div>
                ))}
            </div>
        </div>)
    } else {
        return (<div className={'step step-5 campaign-overview-step'}>
            <h3>Overview</h3>

            <div className="campaign-information">
                {automaticTargetingFields.map(key => (
                    <div className="row">
                        <div className="label">{fields[key].title}</div>
                        <div
                            className="value">{fields[key].render ? fields[key].render(createData[fields[key].fieldKey]) : createData[fields[key].fieldKey]}</div>
                    </div>
                ))}
            </div>
        </div>)
    }
}

export default CreateCampaignOverview
