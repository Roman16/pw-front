import React from "react"
import moment from 'moment-timezone'
import {numberMask} from "../../../../../utils/numberMask"
import {round} from "../../../../../utils/round"
import {useSelector} from "react-redux"
import _ from 'lodash'
import {activeTimezone} from "../../../../index"
import {currencyWithCode} from "../../../../../components/CurrencyCode/CurrencyCode"

const CreateCampaignOverview = ({createData, overviewType = 'campaigns'}) => {
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

    const keywordTargetingField = {
            title: 'Keyword Targeting',
            fieldKey: 'keywords',
            render: value => value.length > 0 ? value.length === 1 ? `${value.length} keyword` : `${value.length} keywords` : '-'
        },
        productTargetingField = {
            title: 'Product Targeting',
            fieldKey: 'targets',
            render: value => value.length > 0 ? value.length === 1 ? `${value.length} keyword` : `${value.length} keywords` : '-'
        },
        productAdsField = {
            title: 'Product Ads',
            fieldKey: 'selectedProductAds',
            render: () => <div className={'overflow-text'}>SKU: {createData.selectedProductAds[0].sku}</div>
        }

    let fields = {
        'campaigns': [
            {
                title: 'Campaign Type',
                fieldKey: 'advertisingType',
                render: (value) => value === 'SponsoredProducts' ? 'Sponsored Products' : 'Sponsored Display'
            },
            {
                title: 'Campaign Name',
                fieldKey: 'name'
            },
            {
                title: 'Portfolio',
                fieldKey: 'portfolioId',
                render: value => value == null ? 'No Portfolio' : _.find(portfolioList, {portfolioId: value}).name
            },
            {
                title: 'Start',
                fieldKey: 'startDate',
                render: value => value && moment(value).tz(activeTimezone).format('MMM DD, YYYY')
            },
            {
                title: 'End',
                fieldKey: 'endDate',
                render: value => value ? moment(value).tz(activeTimezone).format('MMM DD, YYYY') : 'No end date'
            },
            {
                title: 'Daily Budget',
                fieldKey: 'calculatedBudget',
                render: value => currencyWithCode(numberMask(value, 2))
            },
            {
                title: 'Status',
                fieldKey: 'state',
                render: value => value === 'enabled' ? 'Enabled' : 'Paused'
            },
            {
                title: 'Targeting',
                fieldKey: 'calculatedCampaignSubType',
                render: value => targetingsTypeEnum[value]
            },
            {
                title: 'Campaign bidding strategy',
                fieldKey: 'bidding_strategy',
                render: value => biddingStrategyEnum[value]
            },
            {
                title: 'Bids by placement: Top of Search (first page)',
                fieldKey: 'bidding_adjustments',
                render: value => value && value[0] ? `${round(value[0].percentage, 2)}%` : '-'
            },
            productAdsField,
        ],
        'product-ads': [
            {
                title: 'Campaign Type',
                fieldKey: 'advertisingType',
                render: (value) => value === 'SponsoredProducts' && 'Sponsored Products'
            },
            {
                title: 'Campaign Name',
                fieldKey: 'campaignName'
            },
            {
                title: 'Ad Group Name',
                fieldKey: 'adGroupName'
            },
            productAdsField,
            ...createData.create_targetings ? [createData.targetingType === 'keywords' ? keywordTargetingField :
                productTargetingField] : []
        ],
        'adGroups': [
            {
                title: 'Campaign Type',
                fieldKey: 'advertisingType',
                render: (value) => value === 'SponsoredProducts' && 'Sponsored Products'
            },
            {
                title: 'Campaign Name',
                fieldKey: 'campaignName'
            },
            {
                title: 'Ad Group Name',
                fieldKey: 'name'
            },
            {
                title: 'Default Bid',
                fieldKey: 'defaultBid',
                render: value => currencyWithCode(numberMask(value, 2))
            },
            ...createData.create_product_ads ? [productAdsField] : [],
            ...createData.create_targetings ? [createData.targetingType === 'keywords' ? keywordTargetingField :
                productTargetingField] : []
        ]
    }
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


    fields = fields[overviewType]


    return (<div className={'step step-5 campaign-overview-step'}>
        <h3>Overview</h3>

        <div className="campaign-information">
            {fields.map(field => (
                <div className="row">
                    <div className="label">{field.title}</div>
                    <div
                        className="value">{field.render ? field.render(createData[field.fieldKey]) : createData[field.fieldKey]}</div>
                </div>
            ))}
        </div>
    </div>)
}

export default CreateCampaignOverview
