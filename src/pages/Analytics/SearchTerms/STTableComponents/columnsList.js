import React from "react"
import {
    acosColumn,
    adCvrColumn,
    adGroupColumn,
    adOrdersColumn,
    adSalesColumn,
    adSpendColumn,
    adUnitsColumn,
    budgetAllocationColumn,
    campaignColumn,
    clicksColumn,
    cpaColumn,
    cpcColumn,
    ctrColumn,
    impressionsColumn, keywordPTColumn, matchTypeColumn,
    roasColumn,
    salesShareColumn,
    statusColumn
} from "../../components/TableList/tableColumns"
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"
import {analyticsActions} from "../../../../actions/analytics.actions"
import InputCurrency from "../../../../components/Inputs/InputCurrency"
import TableList from "../../componentsV2/TableList/TableList"
import {SVG} from "../../../../utils/icons"

export const STColumnsList = (segment, setStateHandler) => {
    return [
        {
            title: 'Query',
            dataIndex: 'query',
            key: 'query',
            width: '400px',
            sorter: true,
            locked: true,
            search: true,
            render: text => (
                <div className="query-field">
                    <span className={'overflow-text'}>{text}</span>

                    <button className="btn icon">
                        <SVG id={'select-icon'}/>
                    </button>
                </div>
            )
        },
        ...segment === 'targetings' ? [{
            ...campaignColumn,
            locked: true,
            noTotal: true,
            width: '250px',
            render: (campaign, item) => (<Link
                to={`/analytics/ad-groups?campaignId=${item.campaignId}`}
                title={campaign}
                className={'state-link'}
                onClick={() => setStateHandler('ad-groups', {
                    name: {campaignName: item.campaignName},
                    campaignId: item.campaignId
                })}
            >
                {campaign}
            </Link>)
        },
            {
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
                        onClick={() => setStateHandler('products', {
                            name: {
                                campaignName: item.campaignName,
                                adGroupName: item.adGroupName
                            }, campaignId: item.campaignId, adGroupId: item.adGroupId
                        })}
                    >
                        {item.adGroupName}
                    </Link>
                )
            },
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
                render: (bid) => <InputCurrency disabled value={bid}/>
            },
        ] : [],

        impressionsColumn,
        clicksColumn,
        ctrColumn,
        adSpendColumn,
        cpcColumn,
        adSalesColumn,
        acosColumn,
        adCvrColumn,
        cpaColumn,
        adOrdersColumn,
        adUnitsColumn,
        roasColumn,
        salesShareColumn,
        budgetAllocationColumn
    ]
}

