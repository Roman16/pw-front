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
        },
        advertisingTypeEnum = {
            'SponsoredProducts': 'Sponsored Products',
            'SponsoredDisplay': 'Sponsored Display',
            'SponsoredBrands': 'Sponsored Brands',
        }

    const targetingField = (key = '', title = '') => ({
            title: title,
            fieldKey: key,
            render: value => value.length > 0 ? value.length === 1 ? `${value.length} keyword` : `${value.length} keywords` : '-'
        }),
        productAdsField = {
            title: 'Product Ads',
            fieldKey: 'selectedProductAds',
            render: () => <div className={'overflow-text'}>SKU: {createData.selectedProductAds[0].sku}</div>
        },
        advertisingTypeField = {
            title: 'Campaign Type',
            fieldKey: 'advertisingType',
            render: type => advertisingTypeEnum[type]
        }

    let fields = {
        'campaigns': [
            advertisingTypeField,
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
            ...createData.createAdGroup ? [ {
                title: 'Ad Group Name',
                fieldKey: 'name'
            },
                {
                    title: 'Default Bid',
                    fieldKey: 'adGroupBid',
                    render: value => currencyWithCode(numberMask(value, 2))
                }] : [],
            ...createData.createProductAds ? [productAdsField] : [],
            ...createData.createTargetings ? [{...targetingField(createData.targetingType, createData.targetingType === 'keywords' ? 'Keywords' : 'Targetings')}] : [],
            ...createData.createNegativeTargetings ? [targetingField(createData.negativeTargetingType === 'keywords' ? 'negativeKeywords' : 'negativeTargets', createData.negativeTargetingType === 'keywords' ? 'Negative Keywords' : 'Negative Targetings'), targetingField('negativeCampaignKeywords',  'Negative Campaign Keywords')] : []
        ],
        'adGroups': [
            advertisingTypeField,
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
                fieldKey: 'adGroupBid',
                render: value => currencyWithCode(numberMask(value, 2))
            },
            ...createData.createProductAds ? [productAdsField] : [],
            ...createData.createTargetings ? [{...targetingField(createData.targetingType, createData.targetingType === 'keywords' ? 'Keywords' : 'Targetings')}] : [],
            ...createData.createNegativeTargetings ? [targetingField(createData.negativeTargetingType === 'keywords' ? 'negativeKeywords' : 'negativeTargets', createData.negativeTargetingType === 'keywords' ? 'Negative Keywords' : 'Negative Targetings'), targetingField( 'negativeCampaignKeywords', 'Negative Campaign Keywords')] : []
        ],
        'product-ads': [
            advertisingTypeField,
            {
                title: 'Campaign Name',
                fieldKey: 'campaignName'
            },
            {
                title: 'Ad Group Name',
                fieldKey: 'adGroupName'
            },
            productAdsField,
            ...createData.createTargetings ? [{...targetingField(createData.targetingType, createData.targetingType === 'keywords' ? 'Keywords' : 'Targetings')}] : [],
            ...createData.createNegativeTargetings ? [targetingField(createData.negativeTargetingType === 'keywords' ? 'negativeKeywords' : 'negativeTargets', createData.negativeTargetingType === 'keywords' ? 'Negative Keywords' : 'Negative Targetings'), targetingField('negativeCampaignKeywords',  'Negative Campaign Keywords')] : []
        ],
        'targetings': [
            advertisingTypeField,
            {
                title: 'Campaign Name',
                fieldKey: 'campaignName'
            },
            {
                title: 'Ad Group Name',
                fieldKey: 'adGroupName'
            },
            targetingField(createData.targetingType, createData.targetingType === 'keywords' ? 'Keywords' : 'Targetings'),
            ...createData.createNegativeTargetings ? [targetingField(createData.negativeTargetingType === 'keywords' ? 'negativeKeywords' : 'negativeTargets', createData.negativeTargetingType === 'keywords' ? 'Negative Keywords' : 'Negative Targetings'), targetingField( 'negativeCampaignKeywords',  'Negative Campaign Keywords')] : []
        ]
    }


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
