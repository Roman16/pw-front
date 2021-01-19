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
                width: '250px',
                render: () => ''
            },
            {
                title: 'Ad Group',
                dataIndex: 'adGroupName',
                key: 'adGroupName',
                width: '250px',
                sorter: true,
                filter: false,
                locked: true,
                noTotal: true,
                render: () => ''
            },
            {
                ...matchTypeColumn, filter: false, render: () => ''
            },
            {
                ...statusColumn,
                filter: false,
                locked: true,
                render: () => ''
            },
            {
                title: 'Bid',
                dataIndex: 'calculatedBid',
                key: 'calculatedBid',
                width: '150px',
                sorter: true,
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

