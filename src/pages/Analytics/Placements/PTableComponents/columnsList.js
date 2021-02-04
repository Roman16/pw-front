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

export const PColumnsList = () => {
    return [
        {
            title: 'Placement',
            dataIndex: 'placementName',
            key: 'placementName',
            width: '250px',
            sorter: false,
            locked: true,
            filter: true,
            search: true,
            render: (text) => <span title={text} className={'overflow-text'}>{text}</span>
        },
        // ...selectedCampaign ? [
        //     {
        //         title: 'Campaign Bidding Strategy',
        //         dataIndex: 'bidding_strategy',
        //         key: 'bidding_strategy',
        //         width: '250px',
        //         sorter: false,
        //         noTotal: true,
        //         locked: true,
        //         render: (text) => <>
        //             {text === 'legacyForSales' && 'Legacy For Sales'}
        //             {text === 'autoForSales' && 'Auto For Sales'}
        //             {text === 'manual' && 'Manual'}
        //             {(text !== 'manual' && text !== 'autoForSales' && text !== 'legacyForSales') && text}
        //         </>
        //     },
        //     {
        //         title: 'Bid Adjustment',
        //         dataIndex: 'bid_adjustment',
        //         key: 'bid_adjustment',
        //         width: '150px',
        //         sorter: false,
        //         locked: true,
        //         noTotal: true,
        //         render: (bid_adjustment) => <InputCurrency
        //             disabled
        //             value={bid_adjustment.length > 0 && bid_adjustment[0].filter(item => typeof item == 'number')[0]}
        //         />
        //     }
        // ] : [],
        {...impressionsColumn, sorter: false},
        {...clicksColumn, sorter: false},
        {...ctrColumn, sorter: false},
        {...adSpendColumn, sorter: false},
        {...cpcColumn, sorter: false},
        {...adSalesColumn, sorter: false},
        {...acosColumn, sorter: false},
        {...adCvrColumn, sorter: false},
        {...cpaColumn, sorter: false},
        {...adOrdersColumn, sorter: false},
        {...adUnitsColumn, sorter: false},
        {...roasColumn, sorter: false},
        {...salesShareColumn, sorter: false},
        {...budgetAllocationColumn, sorter: false},
    ]
}

