import React from "react"
import {
    acosColumn,
    adCvrColumn,
    adOrdersColumn,
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
} from "../../components/TableList/tableColumns"
import InputCurrency from "../../../../components/Inputs/InputCurrency"

export const PColumnsList = (selectedCampaign, stateDetails, segment) => {
    return [
        {
            title: 'Placement',
            dataIndex: 'placementName',
            key: 'placementName',
            width: '250px',
            sorter: false,
            locked: true,
            filter: false,
            search: true,
            render: (text) => <span title={text} className={'overflow-text'}>{text}</span>
        },
        ...(selectedCampaign && stateDetails.advertisingType !== 'SponsoredBrands') ? [
            {
                title: 'Campaign Bidding Strategy',
                dataIndex: 'bidding_strategy',
                key: 'bidding_strategy',
                width: '250px',
                sorter: false,
                noTotal: true,
                locked: true,
                render: (text, item) => {
                    if (segment !== 'none') text = item.bidding_strategy_segmented && item.bidding_strategy_segmented[0]

                    return (<>
                        {text === 'legacyForSales' && 'Legacy For Sales'}
                        {text === 'autoForSales' && 'Auto For Sales'}
                        {text === 'manual' && 'Manual'}
                        {(text !== 'manual' && text !== 'autoForSales' && text !== 'legacyForSales') && text}
                    </>)
                }
            },
            {
                title: 'Bid Adjustment',
                dataIndex: 'bid_adjustment',
                key: 'bid_adjustment',
                width: '150px',
                sorter: false,
                locked: true,
                noTotal: true,
                render: (bid_adjustment, item) => {
                    if (segment !== 'none') bid_adjustment = item.bid_adjustment_segmented && item.bid_adjustment_segmented[0]

                    if (item.placementName === 'Top of Search on-Amazon') {
                        return (<InputCurrency
                            disabled
                            typeIcon={'percent'}
                            value={bid_adjustment && bid_adjustment.length > 0 && (bid_adjustment.find(i => i[0] === 'placementTop') ? bid_adjustment.find(i => i[0] === 'placementTop')[1] : '')}
                        />)
                    } else if (item.placementName === 'Detail Page on-Amazon') {
                        return (<InputCurrency
                            disabled
                            typeIcon={'percent'}
                            value={bid_adjustment && bid_adjustment.length > 0 && (bid_adjustment.find(i => i[0] === 'placementProductPage') ? bid_adjustment.find(i => i[0] === 'placementProductPage')[1] : '')}
                        />)
                    } else return ''
                }
            }
        ] : [],
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

