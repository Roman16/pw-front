import React from "react"
import moment from "moment"
import {numberMask} from "../../../../../../utils/numberMask"
import {round} from "../../../../../../utils/round"

const CreateCampaignOverview = ({createData}) => {
    const targetingsTypeEnum = {
            'automatic_targeting': 'Automatic Targeting',
            'manual_targeting': 'Manual Targeting',
        },
        biddingStrategyEnum = {
            'down': 'Dynamic bids - down only',
            'dynamic': 'Dynamic bids - up and down',
            'fixed': 'Fixed bids'
        },
        TTargetingTypeEnum = {
            'keyword': 'Keyword Targeting',
            'product': 'Product Targeting',
        }

    const fields = {
        campaignType: {
            title: 'Campaign Type',
            fieldKey: 'campaign_type',
            render: (value) => value === 'sponsored_products' && 'Sponsored Products'
        },
        campaignName: {
            title: 'Campaign Name',
            fieldKey: 'campaign_name'
        },
        portfolioName: {
            title: 'Portfolio',
            fieldKey: 'portfolio_name'
        },
        startDate: {
            title: 'Start',
            fieldKey: 'start_date',
            render: value => value && moment(value).format('MM.DD.YYYY')
        },
        endDate: {
            title: 'End',
            fieldKey: 'end_date',
            render: value => value && moment(value).format('MM.DD.YYYY')
        },
        dailyBudget: {
            title: 'Daily Budget',
            fieldKey: 'daily_budget',
            render: value => `${numberMask(value, 2)}$`
        },
        targeting: {
            title: 'Targeting',
            fieldKey: 'targetings_type',
            render: value => targetingsTypeEnum[value]
        },
        biddingStrategy: {
            title: 'Campaign bidding strategy',
            fieldKey: 'bidding_strategy',
            render: value => biddingStrategyEnum[value]
        },
        bidsTopOfSearch: {
            title: 'Bids by placement: Top of Search (first page)',
            fieldKey: 'top_search_bid',
            render: value => `${round(value, 2)}%`
        },
        bidsProductPage: {
            title: 'Bids by placement: Product pages (competitors pages)',
            fieldKey: 'product_pages_bid',
            render: value => `${round(value, 2)}%`
        },
        adGroupName: {
            title: 'Ad Group Name',
            fieldKey: 'ad_group_name'
        },
        adGroupBid: {
            title: 'Default Bid',
            fieldKey: 'ad_group_default_bid',
            render: value => `${numberMask(value, 2)}$`
        },
        productAds: {
            title: 'Product Ads',
            fieldKey: 'selectedProductAds',
            render: value => value.length > 0 && <div
                className={'overflow-text'}
                title={value.map(item => item.asin).join(', ')}
            >
                {value.length} products: {value.map(item => item.asin).join(', ')}
            </div>
        },
        targetCloseMatch: {
            title: 'Targeting Groups: Close match',
            fieldKey: 'target_close_match',
            render: value => `${numberMask(value, 2)}$`
        },
        targetLooseMatch: {
            title: 'Targeting Groups: Loose match',
            fieldKey: 'target_loose_match',
            render: value => `${numberMask(value, 2)}$`
        },
        targetSubstitutes: {
            title: 'Targeting Groups: Substitutes',
            fieldKey: 'target_substitutes',
            render: value => `${numberMask(value, 2)}$`
        },
        targetComplements: {
            title: 'Targeting Groups: Complements',
            fieldKey: 'target_complements',
            render: value => `${numberMask(value, 2)}$`
        },
        negativeKeywords: {
            title: 'Negative Keywords',
            fieldKey: 'negative_keywords',
            render: value => value.length > 0 && `${value.length} keywords`
        },
        negativePATs: {
            title: 'Negative PATs',
            fieldKey: 'negative_pats',
            render: value => value.length > 0 && `${value.length} ASINs`
        },
        targetingType: {
            title: 'Targeting Type',
            fieldKey: 't_targeting_type',
            render: value => TTargetingTypeEnum[value]
        },
        keywordTargeting: {
            title: 'Keyword targeting',
            fieldKey: 'keyword_targetings',
            render: value => value.length > 0 && `${value.length} keywords`
        },
        negativeKeywordTargeting: {
            title: 'Negative Keyword Targeting',
            fieldKey: 'keyword_targetings',
            render: value => value.length > 0 && `${value.length} keywords`
        },
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
