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
    impressionsColumn,
    roasColumn,
    salesShareColumn,
    renderNumberField,
    adSalesSameSKUColumn,
    adSalesOtherSKUColumn,
    SBAdSalesColumn,
    SPAdSalesColumn,
    SDAdSalesColumn,
    RPCColumn, RPIColumn, ICVRColumn, CPMColumn,
} from "../../components/TableList/tableColumns"


const getColumns = (setStateHandler, setStateDetails) => ([
        {
            title: 'Portfolio',
            dataIndex: 'portfolioName',
            key: 'portfolioName',
            width: '250px',
            sorter: true,
            locked: true,
            search: true,
            editType: 'text',
            redirectLink: (item) => `/analytics/campaigns?portfolioId=${item.portfolioId}`,
            clickEvent: (item, e) => {
                setStateHandler('campaigns', {
                    name: {portfolioName: item},
                    portfolioId: item.portfolioId
                }, e)
                setStateDetails(item)
            },
            render: (portfolio, item) => <div
                className={'state-link'}
                title={portfolio}
            >
                {portfolio}
            </div>
        },
        {
            title: 'Campaigns',
            dataIndex: 'campaigns_count',
            key: 'campaigns_count',
            width: '150px',
            sorter: true,
            noTotal: true,
            align: 'right',
            ...renderNumberField('number', false)
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
        SPAdSalesColumn,
        SDAdSalesColumn,
        SBAdSalesColumn,
        salesShareColumn,
        adProfitColumn
    ]
)

export const columnList = (...args) => ({columnsWithFilters: getColumns(...args), allColumns: getColumns()})
