import React from "react"
import {
    adGroupColumn,
    campaignColumn,
    keywordPTColumn,
    matchTypeColumn, ParentStatus,
    statusColumn
} from "../../components/TableList/tableColumns"
import {Link} from "react-router-dom"

const getColumns = (setStateHandler, selectedCampaign, selectedAdGroup) => ([
    {
        title: 'Active',
        dataIndex: 'state',
        key: 'state',
        width: '65px',
        noTotal: true,
        locked: true,
        disabled: true,
        editType: 'switch',
    },
    {
        title: 'Keyword / PT',
        dataIndex: 'calculatedTargetingText',
        key: 'calculatedTargetingText',
        sorter: true,
        locked: true,
        search: true,
        filter: true,
        width: '300px',
        ...keywordPTColumn
    },
    ...!selectedCampaign ? [{
        ...campaignColumn,
        noTotal: true,
        width: '260px',
        render: (campaign, item) => (<div className={'state-link'}>
            <ParentStatus status={item.campaignState}/>

            <Link
                to={`/analytics/ad-groups?campaignId=${item.campaignId}`}
                title={campaign}
                onClick={(e) => setStateHandler('ad-groups', {
                    name: {campaignName: item.campaignName},
                    campaignId: item.campaignId
                }, e)}
            >
                {campaign}
            </Link></div>)
    }] : [],
    ...!selectedAdGroup ? [{
        ...adGroupColumn,
        noTotal: true,
        width: '260px',
        render: (adGroup, item) => (<div className={'state-link'}>
                <ParentStatus status={item.adGroupState}/>

                <Link
                    to={`/analytics/product-ads?campaignId=${item.campaignId}&adGroupId=${item.adGroupId}`}
                    title={item.adGroupName}
                    onClick={(e) => setStateHandler('products', {
                        name: {
                            campaignName: item.campaignName,
                            adGroupName: item.adGroupName
                        }, campaignId: item.campaignId, adGroupId: item.adGroupId
                    }, e)}
                >
                    {item.adGroupName}
                </Link></div>
        )
    }] : [],
    {
        ...matchTypeColumn,
        width: '300px',
    },
    {
        ...statusColumn,
        width: '100px',
    }
])

export const columnList = (...args) => ({columnsWithFilters: getColumns(...args), allColumns: getColumns()})

