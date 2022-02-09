import {
    acosColumn,
    adCvrColumn,
    adOrdersColumn,
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
    salesShareColumn
} from "../../components/TableList/tableColumns"
import React from "react"


const advertisingTitle = {
    SponsoredProducts: 'Sponsored Products',
    SponsoredBrands: 'Sponsored Brands',
}

const location = 'placements'

export const expandedRowRender = (props, columnsBlackList, selectedCampaign, stateDetails, columnsOrder) => {
    const columns = [
        {
            width: '250px',
            dataIndex: 'advertisingType',
            render: (text) => advertisingTitle[text]
        },
        ...(selectedCampaign && stateDetails.advertisingType !== 'SponsoredBrands') ? [
            {
                width: '250px',
                dataIndex: 'bidding_strategy'
            },
            {
                width: '150px',
                dataIndex: 'bid_adjustment'
            }
        ] : [],
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
    ]


    return (
        props.segmentData && props.segmentData.map(target => (
                <div>
                    {columns
                        .filter(column => !columnsBlackList.includes(column.key))
                        .sort((firstColumn, secondColumn) => columnsOrder[location] ? columnsOrder[location].findIndex(i => i === firstColumn.dataIndex) - columnsOrder[location].findIndex(i => i === secondColumn.dataIndex) : true)
                        .map((item, index) => {
                                const fieldWidth = item.width ? ({width: item.width}) : {flex: 1}
                                return (
                                    <div
                                        className={`table-body__field ${item.align || ''}`}
                                        style={{...fieldWidth, minWidth: item.minWidth || '0'}}
                                    >
                                        {item.render && item.render(target[item.dataIndex], target, props.segmentData, item.dataIndex)}
                                    </div>
                                )
                            }
                        )}
                </div>
            )
        )
    )
}
