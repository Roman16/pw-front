import React from "react"
import {Link} from "react-router-dom"
import {
    acosColumn,
    adCvrColumn,
    adOrdersColumn,
    adProfitColumn,
    adSalesColumn, adSalesOtherSKUColumn, adSalesSameSKUColumn,
    adSpendColumn,
    adUnitsColumn,
    budgetAllocationColumn,
    clicksColumn,
    cpaColumn,
    cpcColumn, CPMColumn,
    ctrColumn, ICVRColumn,
    impressionsColumn,
    roasColumn, RPCColumn, RPIColumn,
    salesShareColumn,
    statusColumn
} from "../../components/TableList/tableColumns"
import moment from 'moment-timezone'
import tz from 'moment-timezone'
import {round} from "../../../../utils/round"


const getColumns = (setStateHandler, setStateDetails, selectedPortfolio, editable) => ([
    ...editable ? [{
        title: 'Active',
        dataIndex: 'state',
        key: 'state',
        width: '65px',
        noTotal: true,
        locked: true,
        editType: 'switch',
    }] : [],
    {
        title: 'Campaign',
        dataIndex: 'name',
        key: 'name',
        uniqueIndex: 'campaignName',
        width: '350px',
        sorter: true,
        locked: true,
        search: true,
        editType: 'text',
        clickEvent: (item, e) => {
            setStateHandler('ad-groups', {
                name: {campaignName: item.name},
                campaignId: item.campaignId
            }, e)
            setStateDetails(item)
        },
        redirectLink: (item) => `/analytics/ad-groups?campaignId=${item.campaignId}`,
        render: (campaign, item) => editable ? (<div
            className={'state-link'}
            title={campaign}
        >
            {campaign}
        </div>) : (<Link
            className={'state-link'}
            to={`/analytics/ad-groups?campaignId=${item.campaignId}`}
            title={campaign}
            onClick={(e) => {
                setStateHandler('ad-groups', {
                    name: {campaignName: item.name},
                    campaignId: item.campaignId
                }, e)
                setStateDetails(item)
            }}> {campaign}</Link>)
    },
    {
        ...statusColumn,
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
        width: '160px',
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
        locked: false,
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
        locked: false,
        filter: true,
        noTotal: true,
        fastUpdating: true,
        render: (portfolio, item) => (
            <Link
                to={`/analytics/campaigns?portfolioId=${item.portfolioId}`}
                title={item.portfolioName}
                className={'state-link'}
                onClick={(e) => setStateHandler('campaigns', {
                    name: item.portfolioName,
                    portfolioId: item.portfolioId
                }, e)}
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
        render: (date) => date && moment(date).format('DD.MM.YYYY'),
        disableField: (date, item) => moment(date).tz('America/Los_Angeles').endOf('day') <= moment().tz('America/Los_Angeles').endOf('day')
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
        render: (date) => date && moment(date).format('DD.MM.YYYY'),
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
    CPMColumn,
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
    adProfitColumn,
])

export const columnList = (...args) => ({columnsWithFilters: getColumns(...args), allColumns: getColumns()})


