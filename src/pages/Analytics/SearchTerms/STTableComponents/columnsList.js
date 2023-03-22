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
    ctrColumn, ICVRColumn,
    impressionsColumn
    , matchTypeColumn,
    roasColumn, RPCColumn, RPIColumn,
    salesShareColumn,
    statusColumn
} from "../../components/TableList/tableColumns"
import {SVG} from "../../../../utils/icons"
import {Spin} from "antd"

const getColumns = (segment, setStateHandler, getTargetings, openedSearchTerms=[], processingRows) => ([
    {
        title: 'Query',
        dataIndex: 'query',
        key: 'query',
        width: '400px',
        sorter: true,
        locked: true,
        search: true,
        filter: true,
        render: (text, item) => (
            <div className="query-field">
                <span className={'overflow-text'}>{text}</span>

                {segment !== 'targetings' && <button
                    className={`btn icon ${openedSearchTerms.includes(item.queryCRC64) ? 'active' : ''}`}
                    onClick={() => getTargetings(item.queryCRC64)}
                >
                    {processingRows.includes(item.queryCRC64) ? <Spin/> : <SVG id={'select-icon'}/>}
                </button>}
            </div>
        )
    },
    ...(segment === 'targetings' || openedSearchTerms.length > 0) ? [
        {
            ...campaignColumn,
            noTotal: true,
            filter: false,
            sorter: false,
            width: '250px',
            render: () => ''
        },
        {
            title: 'Campaign Status',
            dataIndex: 'campaignState',
            key: 'campaignState',
            width: '0',
            visible: false,
            sorter: false,
            locked: false,
            noTotal: true,
            filter: true,
            fastUpdating: false,
        },
        {
            title: 'Ad Group',
            dataIndex: 'adGroupName',
            key: 'adGroupName',
            width: '250px',
            sorter: false,
            filter: false,
            noTotal: true,
            render: () => ''
        },
        {
            title: 'Ad Group Status',
            dataIndex: 'adGroupState',
            key: 'adGroupState',
            width: '0',
            visible: false,
            sorter: false,
            locked: false,
            noTotal: true,
            filter: true,
            fastUpdating: false,
        },
        {
            ...matchTypeColumn, filter: false, render: () => '', sorter: false,locked:false
        },
        {
            ...statusColumn,
            filter: false,
            sorter: false,
            render: () => ''
        },
        {
            title: 'Bid',
            dataIndex: 'calculatedBid',
            key: 'calculatedBid',
            width: '150px',
            sorter: false,
            noTotal: true,
            filter: false,
            render: () => ''
        },
    ] : [],
    {
        title: 'Portfolio',
        dataIndex: 'portfolioName',
        key: 'portfolioName',
        width: '0',
        visible: false,
        sorter: false,
        locked: false,
        noTotal: true,
        filter: true,
        fastUpdating: false,
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
])

export const STColumnsList = (...args) => ({columnsWithFilters: getColumns(...args), allColumns: getColumns('targetings')})