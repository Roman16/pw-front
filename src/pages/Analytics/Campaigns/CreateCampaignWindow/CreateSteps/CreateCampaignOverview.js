import React from "react"

const CreateCampaignOverview = ({campaignData}) => {

    const fields = {
        campaignType: {
            title: 'Campaign Type',
            fieldKey: 'campaign_type'
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
            fieldKey: 'start_date'
        },
        endDate: {
            title: 'End',
            fieldKey: 'end_date'
        },
        dailyBudget: {
            title: 'Daily Budget',
            fieldKey: 'daily_budget'
        },
        targeting: {
            title: 'Targeting',
            fieldKey: 'targetings_type'
        },
        biddingStrategy: {
            title: 'Campaign bidding strategy',
            fieldKey: 'bidding_strategy'
        },
        bidsTopOfSearch: {
            title: 'Bids by placement: Top of Search (first page)',
            fieldKey: 'bids_top_of_search'
        },
        bidsProductPage: {
            title: 'Bids by placement: Product pages (competitors pages)',
            fieldKey: 'bids_product_page'
        },
        adGroupName: {
            title: 'Ad Group Name',
            fieldKey: 'ad_group_name'
        },
        adGroupBid: {
            title: 'Default Bid',
            fieldKey: 'ad_group_default_bid'
        },
        productAds: {
            title: 'Product Ads',
            fieldKey: 'selectedProductAds'
        },
        targetCloseMatch: {
            title: 'Targeting Groups: Close match',
            fieldKey: 'target_close_match'
        },
        targetLooseMatch: {
            title: 'Targeting Groups: Loose match',
            fieldKey: 'target_loose_match'
        },
        targetSubstitutes: {
            title: 'Targeting Groups: Substitutes',
            fieldKey: 'target_substitutes'
        },
        targetComplements: {
            title: 'Targeting Groups: Complements',
            fieldKey: 'target_complements'
        },
        negativeKeywords: {
            title: 'Negative Keywords',
            fieldKey: 'negative_keywords'
        },
        negativePATs: {
            title: 'Negative PATs',
            fieldKey: 'negative_pats'
        },
        targetingType: {
            title: 'Targeting Type',
            fieldKey: 't_targeting_type'
        },
        keywordTargeting: {
            title: 'Keyword targeting',
            fieldKey: 'keyword_targetings'
        },
        negativeKeywordTargeting: {
            title: 'Negative Keyword Targeting',
            fieldKey: 'keyword_targetings'
        },
    }

    const allFields = Object.keys(fields),
        automaticTargetingFields = Object.keys(fields).filter(item => item !== 'targetCloseMatch' || item !== 'targetLooseMatch' || item !== 'targetSubstitutes' || item !== 'targetComplements'),
        fieldsWithoutAdGroup = ['campaignType', 'campaignName', 'portfolioName', 'startDate', 'endDate', 'dailyBudget', 'targeting', 'biddingStrategy', 'bidsTopOfSearch', 'bidsProductPage']

    if (!campaignData.create_ad_group) {
        return (<div className={'step step-5 campaign-overview-step'}>
            <h3>Overview</h3>

            <div className="campaign-information">
                {allFields.map(key => (
                    <div className="row">
                        <div className="label">{fields[key].title}</div>
                        <div className="value">{campaignData[fields[key].fieldKey]}</div>
                    </div>
                ))}
            </div>
        </div>)
    } else if (campaignData.targetings_type === 'automatic_targeting') {
        return (<div className={'step step-5 campaign-overview-step'}>
            <h3>Overview</h3>

            <div className="campaign-information">
                {automaticTargetingFields.map(key => (
                    <div className="row">
                        <div className="label">{fields[key].title}</div>
                        <div className="value">{campaignData[fields[key].fieldKey]}</div>
                    </div>
                ))}
            </div>
        </div>)
    } else if (campaignData.targetings_type === 'manual_targeting') {
        return (<div className={'step step-5 campaign-overview-step'}>
            <h3>Overview</h3>

            <div className="campaign-information">
                {automaticTargetingFields.map(key => (
                    <div className="row">
                        <div className="label">{fields[key].title}</div>
                        <div className="value">{campaignData[fields[key].fieldKey]}</div>
                    </div>
                ))}
            </div>
        </div>)
    } else if (campaignData.targetings_type === 'manual_targeting' && campaignData.t_targeting_type === 'product') {
        return (<div className={'step step-5 campaign-overview-step'}>
            <h3>Overview</h3>

            <div className="campaign-information">
                {fieldsWithoutAdGroup.map(key => (
                    <div className="row">
                        <div className="label">{fields[key].title}</div>
                        <div className="value">{campaignData[fields[key].fieldKey]}</div>
                    </div>
                ))}
            </div>
        </div>)
    }
}

export default CreateCampaignOverview
