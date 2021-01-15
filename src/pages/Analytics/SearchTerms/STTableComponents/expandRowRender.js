import {
    acosColumn, adCvrColumn, adOrdersColumn,
    adSalesColumn,
    adSpendColumn, adUnitsColumn, budgetAllocationColumn,
    clicksColumn, cpaColumn,
    cpcColumn,
    ctrColumn,
    impressionsColumn, roasColumn, salesShareColumn
} from "../../components/TableList/tableColumns"
import React from "react"

export const expandedRowRender = (props) => {
    console.log(props.targetingsData)
    const columns = [
        {
            width: '400px',
            dataIndex: 'advertisingType',
        },

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
        props.targetingsData && props.targetingsData.map(target => (
                <div>
                    {columns.map((item, index) => {
                            const fieldWidth = item.width ? ({width: item.width}) : {flex: 1}
                            return (
                                <div
                                    className={`table-body__field ${item.align || ''}`}
                                    style={{...fieldWidth, minWidth: item.minWidth || '0'}}
                                >
                                    {item.render && item.render(target[item.dataIndex], target)}
                                </div>
                            )
                        }
                    )}
                </div>
            )
        )
    )
}
