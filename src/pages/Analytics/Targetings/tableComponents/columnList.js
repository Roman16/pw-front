import React from "react"
import {
    acosColumn,
    adCvrColumn,
    adOrdersColumn,
    adSalesColumn, adSalesOtherSKUColumn, adSalesSameSKUColumn,
    adSpendColumn,
    adUnitsColumn,
    budgetAllocationColumn,
    campaignColumn,
    clicksColumn,
    cpaColumn,
    cpcColumn, CPMColumn,
    ctrColumn,
    EditableField, ICVRColumn,
    impressionsColumn,
    keywordPTColumn,
    matchTypeColumn, renderNumberField,
    roasColumn, RPCColumn, RPIColumn,
    salesShareColumn,
    statusColumn
} from "../../components/TableList/tableColumns"
import {Link} from "react-router-dom"
import {Switch} from "antd"
import {metricKeys} from "../../componentsV2/MainMetrics/metricsList"

export const automatePatDescription = {
    'Close match': 'Sponsored Products target that shows your ad to shoppers who use search terms closely related to your products.',
    'Loose match': 'Sponsored Products target that shows your ad to shoppers who use search terms loosely related to your products.',
    'Substitutes': 'Sponsored Products target that shows your ad to shoppers who view the detail pages of products similar to yours.',
    'Complements': 'Sponsored Products target that shows your ad to shoppers who view the detail pages of products that complement your product.',
    'Product views': 'Sponsored Display target that shows your ad to shoppers who viewed the detail pages of your advertised products.',
    'Similar product views': 'Sponsored Display target that shows your ad to shoppers who viewed the detail pages of products similar to yours.',
}


export const columnList = (setStateHandler, selectedCampaign, selectedAdGroup, editable) => ([
        ...editable ? [{
            title: 'Active',
            dataIndex: 'state',
            key: 'state',
            width: '65px',
            noTotal: true,
            editType: 'switch',
        }] : [],
        {
            title: 'Keyword / PT',
            dataIndex: 'calculatedTargetingText',
            key: 'calculatedTargetingText',
            width: '400px',
            sorter: true,
            locked: true,
            search: true,
            ...keywordPTColumn
        },
        ...!selectedCampaign ? [{
            ...campaignColumn,
            locked: true,
            noTotal: true,
            width: '250px',
            render: (campaign, item) => (<Link
                to={`/analytics/ad-groups?campaignId=${item.campaignId}`}
                title={campaign}
                className={'state-link'}
                onClick={(e) => setStateHandler('ad-groups', {
                    name: {campaignName: item.campaignName},
                    campaignId: item.campaignId
                }, e)}
            >
                {campaign}
            </Link>)
        }] : [],
        ...!selectedAdGroup ? [{
            title: 'Ad Group',
            dataIndex: 'adGroupName',
            key: 'adGroupName',
            width: '250px',
            sorter: true,
            filter: true,
            locked: true,
            noTotal: true,
            render: (adGroup, item) => (
                <Link
                    to={`/analytics/product-ads?campaignId=${item.campaignId}&adGroupId=${item.adGroupId}`}
                    title={item.adGroupName}
                    className={'state-link'}
                    onClick={(e) => setStateHandler('products', {
                        name: {
                            campaignName: item.campaignName,
                            adGroupName: item.adGroupName
                        }, campaignId: item.campaignId, adGroupId: item.adGroupId
                    }, e)}
                >
                    {item.adGroupName}
                </Link>
            )
        }] : [],
        matchTypeColumn,
        {
            ...statusColumn,
            locked: true,
        },
        {
            title: 'Bid',
            dataIndex: 'calculatedBid',
            key: 'calculatedBid',
            width: '150px',
            sorter: true,
            noTotal: true,
            filter: true,
            fastUpdating: true,
            editType: 'currency',
        },

        impressionsColumn,
        clicksColumn,
        ctrColumn,
        adSpendColumn,
        cpcColumn,
        CPMColumn,
        {
            title: 'Bid - CPC',
            dataIndex: metricKeys['bidCPC'],
            key: metricKeys['bidCPC'],
            width: '150px',
            sorter: true,
            filter: true,
            align: 'right',
            ...renderNumberField('currency')
        },
        budgetAllocationColumn,
        adOrdersColumn,
        cpaColumn,
        adCvrColumn,
        ICVRColumn,
        adUnitsColumn,
        adSalesColumn,
        acosColumn,
        roasColumn,
        RPCColumn,
        RPIColumn,
        adSalesSameSKUColumn,
        adSalesOtherSKUColumn,
        salesShareColumn,
    ]
)

