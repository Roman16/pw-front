import React from "react"
import CustomTable from "../../../components/Table/CustomTable"
import {Link} from "react-router-dom"
import {
    acosColumn,
    adCvrColumn,
    adOrdersColumn, adProfitColumn, adSalesColumn, adSalesOtherSKUColumn, adSalesSameSKUColumn,
    adSpendColumn, adUnitsColumn, budgetAllocationColumn,
    clicksColumn, cpaColumn, cpcColumn, CPMColumn,
    ctrColumn, ICVRColumn,
    impressionsColumn, roasColumn, RPCColumn, RPIColumn, salesShareColumn,
    statusColumn
} from "../../AnalyticsV3/components/TableList/tableColumns"
import {currencyWithCode} from "../../../components/CurrencyCode/CurrencyCode"
import {round} from "../../../utils/round"
import moment from "moment-timezone"
import {activeTimezone} from "../../index"

const columns = [
    {
        title: 'Campaign',
        dataIndex: 'name',
        key: 'name',
        width: '350px',
    },
    statusColumn,
    {
        title: 'Advertising Type',
        dataIndex: 'advertisingType',
        key: 'advertisingType',
        width: '170px',
        render: (type) => type && type.replace(/([a-z])([A-Z])/g, '$1 $2')
    },
    {
        title: 'Targeting Type',
        dataIndex: 'calculatedTargetingType',
        key: 'calculatedTargetingType',
        width: '160px',
        render: (type) => type && <span className={'camelcase-string'}>{type} Targeting</span>
    },
    {
        title: 'Sub Type',
        dataIndex: 'calculatedCampaignSubType',
        key: 'calculatedCampaignSubType',
        width: '150px',
        render: (type) => type && type.replace(/([a-z])([A-Z])/g, '$1 $2')
    },
    {
        title: 'Budget',
        dataIndex: 'calculatedBudget',
        key: 'calculatedBudget',
        width: '140px',
        render: (budget, item) => {
            const text = budget ? <>{currencyWithCode(round(budget, 2))} {item.calculatedBudgetType ? ` / ${item.calculatedBudgetType}` : ''}</> : ''
            return <span className={'overflow-text campaign-budget'} title={text}>{text}</span>
        }
    },
    {
        title: 'Portfolio',
        dataIndex: 'portfolioName',
        key: 'portfolioName',
        width: '150px',
    },
    {
        title: 'Start date',
        dataIndex: 'startDate',
        key: 'startDate',
        width: '150px',
        render: (date) => date && moment(date).format('DD.MM.YYYY'),
    },
    {
        title: 'End date',
        dataIndex: 'endDate',
        key: 'endDate',
        width: '150px',
        render: (date) => date && moment(date).format('DD.MM.YYYY'),
    },
    {
        title: 'Campaign bidding strategy',
        dataIndex: 'bidding_strategy',
        key: 'bidding_strategy',
        width: '250px',
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
]

export const TopCampaigns = ({
                                 fetching,
                                 data
                             }) =>
    <div className="table-block">
        <CustomTable
            loading={fetching}
            dataSource={data}

            columns={columns}

            fixedColumns={[0]}
        />
    </div>
