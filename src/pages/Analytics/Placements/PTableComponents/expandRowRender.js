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
    salesShareColumn
} from "../../components/TableList/tableColumns"
import React from "react"


const advertisingOrder = ['SponsoredProducts', 'SponsoredBrands'],
    advertisingTitle = {
        SponsoredProducts: 'Sponsored Products',
        SponsoredBrands: 'Sponsored Brands',
    }


export const expandedRowRender = (props, columnsBlackList, selectedCampaign, stateDetails) => {
    const columns = [
        {
            width: '250px',
            dataIndex: 'advertisingType',
            render: (text) => advertisingTitle[text]
        },
        ...(selectedCampaign && stateDetails.advertisingType !== 'SponsoredBrands') ? [
            {
                width: '250px',
            },
            {
                width: '150px',
            }
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
        budgetAllocationColumn,
    ]


    return (
        props.segmentData && props.segmentData.map(target => (
                <div>
                    {columns
                        .filter(column => !columnsBlackList.includes(column.key))
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
