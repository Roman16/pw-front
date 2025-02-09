import React, {useEffect, useRef, useState} from "react"
import CustomSelect from "../../../../components/Select/Select"
import DatePicker from "../../../../components/DatePicker/DatePickerRange"
import TreeSelect from "../../../../components/TreeSelect/TreeSelect"
import {Input, Select} from "antd"
import InputCurrency from "../../../../components/Inputs/InputCurrency"
import {metricKeys} from "../../componentsV2/MainMetrics/metricsList"

const Option = Select.Option

const numberVariations = [
    {label: 'Greater than', key: 'gt'},
    {label: 'Equals', key: 'eq'},
    {label: 'Less than', key: 'lt'},
    {label: 'Greater than or equal to', key: 'gte'},
    {label: 'Less than or equal to', key: 'lte'},
    {label: 'Not equals', key: 'neq'}
]

export const stringVariations = [
    {label: 'Contains', key: 'contains'},
    {label: 'Matches', key: 'matches'},
    {label: 'Not contains', key: 'not_contains'},
    {label: 'Not matches', key: 'not_matches'}
]

const reasonList = [
    {
        label: 'Added Created Keyword As Negative',
        value: 'AddedCreatedKeywordAsNegative'
    },
    {
        label: 'Added Created PAT As Negative',
        value: 'AddedCreatedPATAsNegative'
    },
    {
        label: 'Changed Keyword Bid ACoS',
        value: 'ChangedKeywordBidACoS'
    },
    {
        label: 'Changed Keyword Bid Impressions',
        value: 'ChangedKeywordBidImpressions'
    },
    {
        label: 'Changed PAT Bid ACoS',
        value: 'ChangedPATBidACoS'
    },
    {
        label: 'Changed PAT Bid Impressions',
        value: 'ChangedPATBidImpressions'
    },
    {
        label: 'Created Ad Group',
        value: 'CreatedAdGroup'
    },
    {
        label: 'Created Campaign',
        value: 'CreatedCampaign'
    },
    {
        label: 'Created Keyword From CST',
        value: 'CreatedKeywordFromCST'
    },
    {
        label: 'Created Negative Keyword From CST High ACoS',
        value: 'CreatedNegativeKeywordFromCSTHighACoS'
    },
    {
        label: 'Created Negative Keyword From CST No Sales',
        value: 'CreatedNegativeKeywordFromCSTNoSales'
    },
    {
        label: 'Created Negative PAT From CST High ACoS',
        value: 'CreatedNegativePATFromCSTHighACoS'
    },
    {
        label: 'Created Negative PAT From CST No Sales',
        value: 'CreatedNegativePATFromCSTNoSales'
    },
    {
        label: 'Created PAT From CST',
        value: 'CreatedPATFromCST'
    },
    {
        label: 'Created Product Ad',
        value: 'CreatedProductAd'
    },
    {
        label: 'Paused Keyword Duplicate From Customer Search Term',
        value: 'PausedKeywordDuplicateFromCustomerSearchTerm'
    },
    {
        label: 'Paused Keyword Duplicate Of PAT',
        value: 'PausedKeywordDuplicateOfPAT'
    },
    {
        label: 'Paused Keyword Duplicate',
        value: 'PausedKeywordDuplicate'
    },
    {
        label: 'Paused Keyword High ACoS',
        value: 'PausedKeywordHighACoS'
    },
    {
        label: 'Paused Keyword No Sales',
        value: 'PausedKeywordNoSales'
    },
    {
        label: 'Paused PAT High ACoS',
        value: 'PausedPATHighACoS'
    },
    {
        label: 'Paused PAT No Sales',
        value: 'PausedPATNoSales'
    },
    {
        label: 'Paused PAT Duplicate',
        value: 'PausedPATDuplicate'
    },
    {
        label: 'Revert Last Change Keyword No Sales',
        value: 'RevertLastChangeKeywordNoSales'
    },
    {
        label: 'Revert Las tChange PAT No Sales',
        value: 'RevertLastChangePATNoSales'
    }
]


const containsVariations = {
    'datetime': [{label: 'In', key: 'in'}],

    'object': stringVariations,
    'keyword_pt': stringVariations,
    'campaignName': stringVariations,
    'adGroupName': stringVariations,
    'campaign_name': stringVariations,
    'portfolioName': stringVariations,
    'ad_group_name': stringVariations,

    'name': stringVariations,
    'product_name_sku_asin': stringVariations,
    'calculatedTargetingText': stringVariations,
    'query': stringVariations,

    'impressions': numberVariations,
    'clicks': numberVariations,
    'spend': numberVariations,
    'sales': numberVariations,
    'acos': numberVariations,
    'profit': numberVariations,
    'organic_profit': numberVariations,
    'organic_profit_gross': numberVariations,
    'ad_profit': numberVariations,
    'budget_allocation': numberVariations,
    'ordered_quantity': numberVariations,
    'attributedConversions': numberVariations,
    'organic_sales': numberVariations,
    'total_ordered_quantity': numberVariations,
    'sales_share': numberVariations,
    'total_ordered_quantity_cleared': numberVariations,
    'total_orders_count': numberVariations,
    'cpa': numberVariations,
    'conversion_rate': numberVariations,
    'cpc': numberVariations,
    'campaigns_count': numberVariations,
    'ctr': numberVariations,
    'dailyBudget': numberVariations,
    'total_orders_count_cleared': numberVariations,
    'organic_orders_count': numberVariations,
    'total_returns_quantity': numberVariations,
    'total_sales': numberVariations,
    'macos': numberVariations,
    'cost': numberVariations,
    'roas': numberVariations,
    'defaultBid': numberVariations,
    'attributedUnitsOrdered': numberVariations,
    'attributedSales': numberVariations,
    'total_sales_avg_price': numberVariations,
    'total_profit_gross': numberVariations,
    'total_profit': numberVariations,
    'targetings_count': numberVariations,
    'product_ads_count': numberVariations,
    'calculatedBid': numberVariations,
    'calculatedBudget': numberVariations,
    'total_returns_count': numberVariations,
    'margin_percent': numberVariations,
    [metricKeys['icvr']]: numberVariations,
    [metricKeys['rpc']]: numberVariations,
    [metricKeys['rpi']]: numberVariations,
    [metricKeys['organicRate']]: numberVariations,
    [metricKeys['organicRate']]: numberVariations,
    [metricKeys['SPAdSales']]: numberVariations,
    [metricKeys['SDAdSales']]: numberVariations,
    [metricKeys['SBAdSales']]: numberVariations,
    [metricKeys['adSalesSameSKU']]: numberVariations,
    [metricKeys['adSalesOtherSKU']]: numberVariations,
    [metricKeys['cpm']]: numberVariations,
    [metricKeys['bidCPC']]: numberVariations,
    [metricKeys['organicUnits']]: numberVariations,
    [metricKeys['margin']]: numberVariations,

    'type': [{label: 'Is one of', key: 'one_of'}, {label: 'Except', key: 'except'}],
    'severity': [{label: 'Is one of', key: 'one_of'}, {label: 'Except', key: 'except'}],
    'group': [{label: 'Is one of', key: 'one_of'}, {label: 'Except', key: 'except'}],
    'issueObjectType': [{label: 'Is one of', key: 'one_of'}, {label: 'Except', key: 'except'}],
    'issueType': [{label: 'Is one of', key: 'one_of'}, {label: 'Except', key: 'except'}],
    'state': [{label: 'Is one of', key: 'one_of'}, {label: 'Except', key: 'except'}],
    'campaignState': [{label: 'Is one of', key: 'one_of'}, {label: 'Except', key: 'except'}],
    'adGroupState': [{label: 'Is one of', key: 'one_of'}, {label: 'Except', key: 'except'}],
    'bidding_strategy': [{label: 'Is one of', key: 'one_of'}, {label: 'Except', key: 'except'}],
    'object_type': [{label: 'Is one of', key: 'one_of'}, {label: 'Except', key: 'except'}],
    'match_type': [{label: 'Is one of', key: 'one_of'}, {label: 'Except', key: 'except'}],
    'targetingType': [{label: 'Is one of', key: 'one_of'}, {label: 'Except', key: 'except'}],
    'calculatedTargetingMatchType': [{label: 'Is one of', key: 'one_of'}, {label: 'Except', key: 'except'}],
    'placementName': [{label: 'Is one of', key: 'one_of'}, {label: 'Except', key: 'except'}],
    'advertisingType': [{label: 'Is one of', key: 'one_of'}, {label: 'Except', key: 'except'}],
    'calculatedTargetingType': [{label: 'Is one of', key: 'one_of'}, {label: 'Except', key: 'except'}],
    'calculatedCampaignSubType': [{label: 'Is one of', key: 'one_of'}, {label: 'Except', key: 'except'}],

    'campaign': [{label: 'Contains', key: 'contains'}, {label: 'Matches', key: 'matches'}]
}

const FilterWindow = ({columns, onClose, onAddFilter, filters, currentTab, editFilter, locationKey}) => {
    const [filterBy, setFilterBy] = useState(),
        [filterType, setFilterType] = useState(),
        [filterValue, setFilterValue] = useState()

    const wrapperRef = useRef(null)


    useEffect(() => {
        if (editFilter && editFilter.filterBy) {
            setFilterBy(editFilter.filterBy)
            setFilterType(editFilter.type)
            setFilterValue(editFilter.value)
        }
    }, [editFilter])

    useEffect(() => {
        function handleClickOutside({target}) {
            if (target.className === 'icon' || target.parentNode.className === 'ant-popover-open' || target.parentNode.parentNode.className === 'ant-popover-open' || target.parentNode.parentNode.parentNode.className === 'ant-popover-open') {

            } else if (wrapperRef.current && !wrapperRef.current.contains(target)) {
                onClose()
            }
        }

        document.addEventListener("click", handleClickOutside, true)
        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [wrapperRef])


    const multiSelectVariations = {
        'object_type': [
            {title: 'Keyword', key: 'keyword', value: 'keyword'},
            {title: 'PT', key: 'pt', value: 'pt'},
            {title: 'Campaign', key: 'campaign', value: 'campaign'},
            {title: 'Ad Group', key: 'ad_group', value: 'ad_group'},
            {title: 'Product Ad', key: 'product_ad', value: 'product_ad'},
        ],
        'match_type': [
            {title: 'Keyword', key: 'keyword', value: 'keyword'},
            {title: 'PT', key: 'pt', value: 'pt'},
        ],
        'targetingType': [
            {title: 'Manual', key: 'manual', value: 'manual'},
            {title: 'Auto', key: 'auto', value: 'auto'},
        ],
        'state': [
            {title: 'Enabled', key: 'enabled', value: 'enabled'},
            {title: 'Paused', key: 'paused', value: 'paused'},
            {title: 'Archived', key: 'archived', value: 'archived'},
        ],
        'campaignState': [
            {title: 'Enabled', key: 'enabled', value: 'enabled'},
            {title: 'Paused', key: 'paused', value: 'paused'},
            {title: 'Archived', key: 'archived', value: 'archived'},
        ],
        'adGroupState': [
            {title: 'Enabled', key: 'enabled', value: 'enabled'},
            {title: 'Paused', key: 'paused', value: 'paused'},
            {title: 'Archived', key: 'archived', value: 'archived'},
        ],
        'severity': [
            {title: 'Critical', key: 'Critical', value: 'Critical'},
            {title: 'Major', key: 'Major', value: 'Major'},
            {title: 'Minor', key: 'Minor', value: 'Minor'},
        ],
        'group': [
            {title: 'Poor Performing Targetings', key: 'PoorPerformingTargetings', value: 'PoorPerformingTargetings'},
            {title: 'Duplicate Targetings', key: 'DuplicateTargetings', value: 'DuplicateTargetings'},
            {title: 'Poor Semantic Core', key: 'PoorSemanticCore', value: 'PoorSemanticCore'},
            {title: 'Targetings Harvesting', key: 'TargetingsHarvesting', value: 'TargetingsHarvesting'},
        ],
        'issueObjectType': [
            {title: 'All Campaigns', key: 'AllCampaigns', value: 'AllCampaigns'},
            {title: 'Campaign', key: 'Campaign', value: 'Campaign'},
            {title: 'Ad Group', key: 'AdGroup', value: 'AdGroup'},
            {title: 'Product Ad', key: 'ProductAd', value: 'ProductAd'},
            {title: 'Keyword', key: 'Keyword', value: 'Keyword'},
            {title: 'Product Targeting', key: 'ProductTargeting', value: 'ProductTargeting'},
            {title: 'Customer Search Term', key: 'CustomerSearchTerm', value: 'CustomerSearchTerm'},
        ],
        'issueType': [
            {
                title: 'Ad Group Does Not Have All Negatives',
                key: 'AdGroupDoesNotHaveAllNegatives',
                value: 'AdGroupDoesNotHaveAllNegatives'
            },
            {
                title: 'Ad Group With Foreign Products',
                key: 'AdGroupWithForeignProducts',
                value: 'AdGroupWithForeignProducts'
            },
            {title: 'Average ASIN PTs', key: 'AverageASINPTs', value: 'AverageASINPTs'},
            {title: 'Average Broad Keywords', key: 'AverageBroadKeywords', value: 'AverageBroadKeywords'},
            {title: 'Average Keywords', key: 'AverageKeywords', value: 'AverageKeywords'},
            {title: 'Average Long Tail Keywords', key: 'AverageLongTailKeywords', value: 'AverageLongTailKeywords'},
            {
                title: 'Found Ad Groups With Foreign Products',
                key: 'FoundAdGroupsWithForeignProducts',
                value: 'FoundAdGroupsWithForeignProducts'
            },
            {title: 'Low ASIN PTs', key: 'LowASINPTs', value: 'LowASINPTs'},
            {title: 'Low Broad Keywords', key: 'LowBroadKeywords', value: 'LowBroadKeywords'},
            {title: 'Low Keywords', key: 'LowKeywords', value: 'LowKeywords'},
            {title: 'Low Long Tail Keywords', key: 'LowLongTailKeywords', value: 'LowLongTailKeywords'},
            {title: 'No ASIN PTs', key: 'NoASINPTs', value: 'NoASINPTs'},
            {title: 'No Auto Campaigns', key: 'NoAutoCampaigns', value: 'NoAutoCampaigns'},
            {title: 'No Brand Keywords', key: 'NoBrandKeywords', value: 'NoBrandKeywords'},
            {title: 'No Broad Keywords', key: 'NoBroadKeywords', value: 'NoBroadKeywords'},
            {title: 'No Category PTs', key: 'NoCategoryPTs', value: 'NoCategoryPTs'},
            {title: 'No Keywords', key: 'NoKeywords', value: 'NoKeywords'},
            {title: 'No Long Tail Keywords', key: 'NoLongTailKeywords', value: 'NoLongTailKeywords'},
            {title: 'Obsolete Auto Campaign', key: 'ObsoleteAutoCampaign', value: 'ObsoleteAutoCampaign'},
            {
                title: 'Should Change Keyword Bid ACoS',
                key: 'ShouldChangeKeywordBidACoS',
                value: 'ShouldChangeKeywordBidACoS'
            },
            {
                title: 'Should Change Keyword Bid Impressions',
                key: 'ShouldChangeKeywordBidImpressions',
                value: 'ShouldChangeKeywordBidImpressions'
            },
            {title: 'Should Change PT Bid ACoS', key: 'ShouldChangePTBidACoS', value: 'ShouldChangePTBidACoS'},
            {
                title: 'Should Change PT Bid Impressions',
                key: 'ShouldChangePTBidImpressions',
                value: 'ShouldChangePTBidImpressions'
            },
            {
                title: 'Should Create Keyword From CST',
                key: 'ShouldCreateKeywordFromCST',
                value: 'ShouldCreateKeywordFromCST'
            },
            {
                title: 'Should Create Negative Keyword From CST High ACoS',
                key: 'ShouldCreateNegativeKeywordFromCSTHighACoS',
                value: 'ShouldCreateNegativeKeywordFromCSTHighACoS'
            },
            {
                title: 'Should Create Negative Keyword From CST No Sales',
                key: 'ShouldCreateNegativeKeywordFromCSTNoSales',
                value: 'ShouldCreateNegativeKeywordFromCSTNoSales'
            },
            {
                title: 'Should Create Negative PT From CST High ACoS',
                key: 'ShouldCreateNegativePTFromCSTHighACoS',
                value: 'ShouldCreateNegativePTFromCSTHighACoS'
            },
            {
                title: 'Should Create Negative PT From CST No Sales',
                key: 'ShouldCreateNegativePTFromCSTNoSales',
                value: 'ShouldCreateNegativePTFromCSTNoSales'
            },
            {title: 'Should Create PT From CST', key: 'ShouldCreatePTFromCST', value: 'ShouldCreatePTFromCST'},
            {
                title: 'Should Pause Keyword Duplicate From Customer Search Term',
                key: 'ShouldPauseKeywordDuplicateFromCustomerSearchTerm',
                value: 'ShouldPauseKeywordDuplicateFromCustomerSearchTerm'
            },
            {
                title: 'Should Pause Keyword Duplicate',
                key: 'ShouldPauseKeywordDuplicate',
                value: 'ShouldPauseKeywordDuplicate'
            },
            {
                title: 'Should Pause Keyword Duplicate Of PT',
                key: 'ShouldPauseKeywordDuplicateOfPT',
                value: 'ShouldPauseKeywordDuplicateOfPT'
            },
            {
                title: 'Should Pause Keyword High ACoS',
                key: 'ShouldPauseKeywordHighACoS',
                value: 'ShouldPauseKeywordHighACoS'
            },
            {
                title: 'Should Pause Keyword No Sales',
                key: 'ShouldPauseKeywordNoSales',
                value: 'ShouldPauseKeywordNoSales'
            },
            {title: 'Should Pause PT Duplicate', key: 'ShouldPausePTDuplicate', value: 'ShouldPausePTDuplicate'},
            {title: 'Should Pause PT High ACoS', key: 'ShouldPausePTHighACoS', value: 'ShouldPausePTHighACoS'},
            {title: 'Should Pause PT No Sales', key: 'ShouldPausePTNoSales', value: 'ShouldPausePTNoSales'},
            {title: 'Too Much Broad Keywords', key: 'TooMuchBroadKeywords', value: 'TooMuchBroadKeywords'},
        ],
        'calculatedTargetingMatchType': [
            ...locationKey === 'targetings' ? [
                    {title: 'Exact', key: 'exact', value: 'exact'},
                    {title: 'Phrase', key: 'phrase', value: 'phrase'},
                    {title: 'Broad', key: 'broad', value: 'broad'},
                    {title: 'ASIN', key: 'asin', value: 'asin'},
                    {title: 'Category', key: 'category', value: 'category'},
                    {title: 'Brand', key: 'brand', value: 'brand'},
                    {title: 'Views', key: 'views', value: 'views'},
                    {title: 'Auto', key: 'auto', value: 'auto'},
                ]
                :
                [
                    {title: 'Negative Exact', key: 'negativeExact', value: 'negativeExact'},
                    {title: 'Negative Phrase', key: 'negativePhrase', value: 'negativePhrase'},
                    {title: 'Campaign Negative Exact', key: 'campaign_negativeExact', value: 'campaign_negativeExact'},
                    {
                        title: 'Campaign Negative Phrase',
                        key: 'campaign_negativePhrase',
                        value: 'campaign_negativePhrase'
                    },
                    {title: 'ASIN', key: 'asin', value: 'asin'},
                    {title: 'Brand', key: 'brand', value: 'brand'},

                ]
        ],
        'bidding_strategy': [
            {title: 'Legacy For Sales', key: 'legacyForSales', value: 'legacyForSales'},
            {title: 'Auto For Sales', key: 'autoForSales', value: 'autoForSales'},
            {title: 'Manual', key: 'manual', value: 'manual'},
        ],
        'placementName': [
            {title: 'Top of Search on-Amazon', key: 'Top of Search on-Amazon', value: 'Top of Search on-Amazon'},
            {title: 'Detail Page on-Amazon', key: 'Detail Page on-Amazon', value: 'Detail Page on-Amazon'},
            {title: 'Other on-Amazon', key: 'Other on-Amazon', value: 'Other on-Amazon'},
            {title: 'Remarketing off-Amazon', key: 'Remarketing off-Amazon', value: 'Remarketing off-Amazon'},
        ],
        'advertisingType': [
            {title: 'Sponsored Products', key: 'SponsoredProducts', value: 'SponsoredProducts'},
            {title: 'Sponsored Brands', key: 'SponsoredBrands', value: 'SponsoredBrands'},
            {title: 'Sponsored Display', key: 'SponsoredDisplay', value: 'SponsoredDisplay'},
        ],
        'calculatedTargetingType': [
            {title: 'Auto Targeting', key: 'autoTargeting', value: 'autoTargeting'},
            {title: 'Manual Targeting', key: 'manualTargeting', value: 'manualTargeting'},
        ],
        'calculatedCampaignSubType': [
            {title: 'Auto', key: 'Auto', value: 'Auto'},
            {title: 'Manual', key: 'Manual', value: 'Manual'},
            {title: 'Views Remarketing', key: 'Views Remarketing', value: 'Views Remarketing'},
            {title: 'Audiences', key: 'Audiences', value: 'Audiences'},
            {title: 'Product Targeting', key: 'Product Targeting', value: 'Product Targeting'},
            // {title: 'Product Collection', key: 'Product Collection', value: 'Product Collection'},
            // {title: 'Video', key: 'Video', value: 'Video'},
        ],
        'type':
            currentTab === 'targeting-improvements' ? [
                    {title: 'Adjusted bid', key: 'adjusted_bid', value: 'adjusted_bid'},
                    {
                        title: 'Not profitable keyword / PT',
                        key: 'not_profitable_keyword_pt',
                        value: 'not_profitable_keyword_pt'
                    },
                    {title: 'Duplicate keyword / PT', key: 'duplicate_keyword_pt', value: 'duplicate_keyword_pt'},
                ] :
                currentTab === 'search-terms' ? [
                        {title: 'Created keyword / PT', key: 'created_keyword_pt', value: 'created_keyword_pt'},
                        {
                            title: 'Created negative keyword / PT',
                            key: 'created_negative_keyword_pt',
                            value: 'created_negative_keyword_pt'
                        },
                        {title: 'Created campaign', key: 'created_campaign', value: 'created_campaign'},
                        {title: 'Created ad group', key: 'created_ad_group', value: 'created_ad_group'},
                        {title: 'Created product ad', key: 'created_product_ad', value: 'created_product_ad'},
                    ] :
                    [
                        {title: 'Adjusted bid', key: 'adjusted_bid', value: 'adjusted_bid'},
                        {
                            title: 'Not profitable keyword / PT',
                            key: 'not_profitable_keyword_pt',
                            value: 'not_profitable_keyword_pt'
                        },
                        {title: 'Created keyword / PT', key: 'created_keyword_pt', value: 'created_keyword_pt'},
                        {
                            title: 'Created negative keyword / PT',
                            key: 'created_negative_keyword_pt',
                            value: 'created_negative_keyword_pt'
                        },
                        {title: 'Duplicate keyword / PT', key: 'duplicate_keyword_pt', value: 'duplicate_keyword_pt'},
                        {title: 'Created campaign', key: 'created_campaign', value: 'created_campaign'},
                        {title: 'Created ad group', key: 'created_ad_group', value: 'created_ad_group'},
                        {title: 'Created product ad', key: 'created_product_ad', value: 'created_product_ad'},
                    ]
    }

    const changeFilterByHandler = (value) => {
        setFilterBy(value)
        setFilterType({
            key: undefined,
            type: undefined
        })
        setFilterValue(null)
    }

    const changeTypeHandler = (value) => {
        setFilterType(containsVariations[filterBy].find(item => item.key === value))
    }

    const changeValueHandler = (value) => {
        setFilterValue(value)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const arr = filterType.key === 'except' ? [...multiSelectVariations[filterBy]] : []

        onAddFilter({
            filterBy: filterBy,
            type: filterType,
            value: filterValue,
            ...filterType.key === 'except' && {requestValue: arr.filter((item) => !filterValue.some((key) => item.key === key)).map(item => item.key)}
        })

        setFilterBy(undefined)
        setFilterType(undefined)
        setFilterValue(undefined)
    }

    return (<form className="filter-variables" onSubmit={submitHandler} ref={wrapperRef}>
        <div className="row">
            <div className="form-group">
                <CustomSelect
                    required={true}
                    placeholder={'Filter by'}
                    value={filterBy}
                    onChange={changeFilterByHandler}
                    getPopupContainer={trigger => trigger.parentNode}
                >
                    {columns.map(column => (column.filter &&
                        <Option value={column.dataIndex}>
                            {column.title}
                        </Option>
                    ))}
                </CustomSelect>
            </div>

            <div className="form-group">
                <CustomSelect
                    required
                    value={filterBy && filterType.key}
                    placeholder={'Contains'}
                    onChange={changeTypeHandler}
                    getPopupContainer={trigger => trigger.parentNode}
                    disabled={!filterBy}
                >
                    {filterBy && containsVariations[filterBy].map((item, index) => (
                        <Option
                            value={item.key}
                            title={item.label}
                            disabled={filters.find(i => i.filterBy === filterBy && item.key === i.type.key)}
                        >
                            {item.label}
                        </Option>
                    ))}
                </CustomSelect>
            </div>

            {!filterType?.key ? <div className="form-group">
                <Input
                    disabled
                    placeholder={'Type'}
                />
            </div> : <div className="form-group">
                {filterBy === 'datetime' &&
                <DatePicker
                    disabled={!filterType?.key}
                    timeRange={(startDate, endDate) => changeValueHandler({startDate, endDate})}
                />}

                {(!filterType ||
                    filterBy === 'object' ||
                    filterBy === 'keyword_pt' ||
                    filterBy === 'campaignName' ||
                    filterBy === 'adGroupName' ||
                    filterBy === 'portfolioName' ||
                    filterBy === 'campaign_name' ||
                    filterBy === 'ad_group_name' ||
                    stringVariations.some(i => i.key === filterType.key)
                ) &&
                <Input
                    disabled={!filterType?.key}
                    placeholder={'Type'}
                    value={filterValue}
                    onChange={(e) => changeValueHandler(e.target.value)}
                />}

                {(filterBy === 'clicks' ||
                    filterBy === 'total_ordered_quantity' ||
                    filterBy === 'total_orders_count' ||
                    filterBy === 'total_orders_count_cleared' ||
                    filterBy === 'total_ordered_quantity_cleared' ||
                    filterBy === 'organic_orders_count' ||
                    filterBy === 'total_returns_quantity' ||
                    filterBy === 'attributedConversions' ||
                    filterBy === 'attributedUnitsOrdered' ||
                    filterBy === 'roas' ||
                    filterBy === 'targetings_count' ||
                    filterBy === 'product_ads_count' ||
                    filterBy === 'campaigns_count' ||
                    filterBy === 'campaigns_count' ||
                    filterBy === 'total_returns_count' ||
                    filterBy === metricKeys['organicRate'] ||
                    filterBy === metricKeys['organicUnits'] ||
                    filterBy === 'impressions') &&
                <Input
                    disabled={!filterType?.key}
                    value={filterValue}
                    placeholder={'Enter number'}
                    type={'number'}
                    onChange={(e) => changeValueHandler(e.target.value)}
                />}

                {(filterBy === 'acos' ||
                    filterBy === 'sales_share' ||
                    filterBy === 'conversion_rate' ||
                    filterBy === 'macos' ||
                    filterBy === 'margin_percent' ||
                    filterBy === metricKeys['icvr'] ||
                    filterBy === metricKeys['margin'] ||
                    filterBy === 'ctr' ||
                    filterBy === 'budget_allocation'
                ) &&
                <InputCurrency
                    typeIcon='percent'
                    placeholder={'Enter number'}
                    value={filterValue}
                    onChange={changeValueHandler}
                    step={0.01}
                    disabled={!filterType?.key}
                />}

                {(filterBy === 'spend' ||
                    filterBy === 'cpa' ||
                    filterBy === 'cpc' ||
                    filterBy === 'cost' ||
                    filterBy === 'profit' ||
                    filterBy === 'organic_profit' ||
                    filterBy === 'organic_profit_gross' ||
                    filterBy === 'total_sales' ||
                    filterBy === 'ad_profit' ||
                    filterBy === 'defaultBid' ||
                    filterBy === 'organic_sales' ||
                    filterBy === 'total_sales_avg_price' ||
                    filterBy === 'total_profit' ||
                    filterBy === 'total_profit_gross' ||
                    filterBy === 'attributedSales' ||
                    filterBy === 'dailyBudget' ||
                    filterBy === 'calculatedBudget' ||
                    filterBy === 'calculatedBid' ||
                    filterBy === metricKeys['rpc'] ||
                    filterBy === metricKeys['rpi'] ||
                    filterBy === metricKeys['SPAdSales'] ||
                    filterBy === metricKeys['SDAdSales'] ||
                    filterBy === metricKeys['SBAdSales'] ||
                    filterBy === metricKeys['adSalesSameSKU'] ||
                    filterBy === metricKeys['adSalesOtherSKU'] ||
                    filterBy === metricKeys['bidCPC'] ||
                    filterBy === metricKeys['cpm'] ||
                    filterBy === 'sales'
                ) &&
                <InputCurrency
                    value={filterValue}
                    placeholder={'Enter number'}
                    onChange={changeValueHandler}
                    step={0.01}
                    disabled={!filterType?.key}
                />}

                {filterBy && (filterType.key === 'one_of' || filterType.key === 'except') &&
                <TreeSelect
                    treeData={multiSelectVariations[filterBy]}
                    getPopupContainer={triggerNode => triggerNode.parentNode}
                    value={filterValue}
                    treeCheckable={true}
                    showSearch={false}
                    placeholder={'Type'}
                    onChange={changeValueHandler}
                    disabled={!filterType?.key}
                />}
            </div>}
        </div>

        <div className="buttons">
            <button type={'button'} className="btn white" onClick={onClose}>Cancel</button>
            <button className="btn default" disabled={filterValue == undefined}>Add Filter</button>
        </div>
    </form>)
}

export default FilterWindow
