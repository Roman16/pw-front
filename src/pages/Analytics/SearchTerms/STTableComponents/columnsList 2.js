import React from "react"
import {
    acosColumn,
    adCvrColumn,
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
    impressionsColumn
    , matchTypeColumn,
    roasColumn,
    salesShareColumn,
    statusColumn
} from "../../components/TableList/tableColumns"
import {SVG} from "../../../../utils/icons"
import {Spin} from "antd"

export const STColumnsList = (segment, setStateHandler, getTargetings, openedSearchTerms, processingRows) => {
    return [
        {
            title: 'Query',
            dataIndex: 'query',
            key: 'query',
            width: '400px',
            sorter: true,
            locked: true,
            search: true,
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
                locked: true,
                noTotal: true,
                filter: false,
                sorter: false,
                width: '250px',
                render: () => ''
            },
            {
                title: 'Ad Group',
                dataIndex: 'adGroupName',
                key: 'adGroupName',
                width: '250px',
                sorter: false,
                filter: false,
                locked: true,
                noTotal: true,
                render: () => ''
            },
            {
                ...matchTypeColumn, filter: false, render: () => '', sorter: false,
            },
            {
                ...statusColumn,
                filter: false,
                locked: true,
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

