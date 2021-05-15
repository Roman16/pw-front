import React from "react"
import {Link} from "react-router-dom"
import {
    acosColumn,
    adCvrColumn,
    adOrdersColumn,
    adProfitColumn,
    adSalesColumn,
    adSpendColumn,
    adUnitsColumn,
    budgetAllocationColumn,
    clicksColumn,
    cpaColumn,
    cpcColumn,
    ctrColumn,
    EditableField,
    impressionsColumn,
    roasColumn,
    salesShareColumn,
    statusColumn
} from "../../components/TableList/tableColumns"
import {Switch} from "antd"
import moment from "moment"
import tz from 'moment-timezone'
import {round} from "../../../../utils/round"
import {history} from "../../../../utils/history"


export const columnList = (setStateHandler, setStateDetails, selectedPortfolio, onUpdateField) => ([
        {
            title: 'Active',
            dataIndex: 'state',
            key: 'state',
            width: '65px',
            noTotal: true,
            editType: 'switch',
        },
        {
            title: 'Campaign',
            dataIndex: 'name',
            key: 'name',
            width: '350px',
            sorter: true,
            locked: true,
            search: true,
            editType: 'text',
            redirectLink: (item) => {
                history.push(`/analytics/ad-groups?campaignId=${item.campaignId}`)

                setStateHandler('ad-groups', {
                    name: {campaignName: item.name},
                    campaignId: item.campaignId
                })
                setStateDetails(item)
            },
            render: (campaign) => (<div
                className={'state-link'}
                title={campaign}
            >
                {campaign}
            </div>)
        },
        {
            ...statusColumn,
            locked: true,
        },
        {
            title: 'Advertising Type',
            dataIndex: 'advertisingType',
            key: 'advertisingType',
            width: '170px',
            sorter: true,
            locked: false,
            filter: true,
            noTotal: true,
            render: (type) => type && type.replace(/([a-z])([A-Z])/g, '$1 $2')
        },
        {
            title: 'Targeting Type',
            dataIndex: 'calculatedTargetingType',
            key: 'calculatedTargetingType',
            width: '150px',
            sorter: true,
            locked: false,
            filter: true,
            noTotal: true,
            render: (type) => type && <span className={'camelcase-string'}>{type} Targeting</span>
        },
        {
            title: 'Sub Type',
            dataIndex: 'calculatedCampaignSubType',
            key: 'calculatedCampaignSubType',
            width: '150px',
            sorter: true,
            locked: false,
            filter: true,
            noTotal: true,
            render: (type) => type && type.replace(/([a-z])([A-Z])/g, '$1 $2')
        },
        {
            title: 'Budget',
            dataIndex: 'calculatedBudget',
            key: 'calculatedBudget',
            width: '140px',
            sorter: true,
            locked: true,
            noTotal: true,
            filter: true,
            fastUpdating: true,
            editType: 'currency',
            render: (budget, item) => {
                const text = budget ? `$${round(budget, 2)}${item.calculatedBudgetType ? ` / ${item.calculatedBudgetType}` : ''}` : ''
                return <span className={'overflow-text campaign-budget'} title={text}>{text}</span>
            }
        },
        ...!selectedPortfolio ? [{
            title: 'Portfolio',
            dataIndex: 'portfolioId',
            key: 'portfolioId',
            width: '150px',
            sorter: true,
            locked: true,
            filter: true,
            noTotal: true,
            fastUpdating: true,
            render: (portfolio, item) => (
                <Link
                    to={`/analytics/campaigns?portfolioId=${item.portfolioId}`}
                    title={item.portfolioName}
                    className={'state-link'}
                    onClick={() => setStateHandler('campaigns', {
                        name: item.portfolioName,
                        portfolioId: item.portfolioId
                    })}
                >
                    {item.portfolioName}
                </Link>
            )
        }] : [],
        {
            title: 'Start date',
            dataIndex: 'startDate',
            key: 'startDate',
            width: '150px',
            sorter: true,
            noTotal: true,
            fastUpdating: true,
            editType: 'date',
            disableField: (date, item) => moment(date).endOf('day') <= moment().tz('America/Los_Angeles').endOf('day')
        },
        {
            title: 'End date',
            dataIndex: 'endDate',
            key: 'endDate',
            width: '150px',
            sorter: true,
            noTotal: true,
            fastUpdating: true,
            editType: 'date',
        },
        {
            title: 'Campaign bidding strategy',
            dataIndex: 'bidding_strategy',
            key: 'bidding_strategy',
            width: '250px',
            sorter: true,
            filter: true,
            noTotal: true,
            render: (text) => <>
                {text === 'legacyForSales' && 'Legacy For Sales'}
                {text === 'autoForSales' && 'Auto For Sales'}
                {text === 'manual' && 'Manual'}
                {(text !== 'manual' && text !== 'autoForSales' && text !== 'legacyForSales') && text}
            </>
        },
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
        budgetAllocationColumn,
        adProfitColumn,
    ]
)

