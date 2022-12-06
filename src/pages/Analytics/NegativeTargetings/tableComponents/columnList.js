import React from "react"
import {
    adGroupColumn,
    campaignColumn,
    keywordPTColumn,
    matchTypeColumn,
    statusColumn
} from "../../components/TableList/tableColumns"
import {Link} from "react-router-dom"

const getColumns = (setStateHandler, selectedCampaign, selectedAdGroup) => ([
    // {
    //     title: 'Active',
    //     dataIndex: 'state',
    //     key: 'state',
    //     width: '65px',
    //     noTotal: true,
    //     locked: true,
    //     disabled: true,
    //     editType: 'switch',
    // },
    {
        title: 'Keyword / PT',
        dataIndex: 'calculatedTargetingText',
        key: 'calculatedTargetingText',
        sorter: true,
        locked: true,
        search: true,
        ...keywordPTColumn
    },
    ...!selectedCampaign ? [{
        ...campaignColumn,
        noTotal: true,
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
        ...adGroupColumn,
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
    statusColumn
])

export const columnList = (...args) => ({columnsWithFilters: getColumns(...args), allColumns: getColumns()})

