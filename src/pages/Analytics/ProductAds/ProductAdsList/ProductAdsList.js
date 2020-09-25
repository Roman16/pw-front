import React from "react"
import {
    acosColumn,
    adCvrColumn,
    adGroupColumn,
    adOrdersColumn,
    adProfitColumn,
    adSalesColumn,
    adSpendColumn,
    adUnitsColumn,
    budgetAllocationColumn,
    campaignColumn,
    clicksColumn,
    cpaColumn,
    cpcColumn,
    ctrColumn,
    impressionsColumn,
    roasColumn,
    salesShareColumn,
    statusColumn
} from "../../components/TableList/tableColumns"
import TableList from "../../components/TableList/TableList"
import {useSelector} from "react-redux"


const ProductAdsList = () => {
    const {selectedCampaign, selectedAdGroup} = useSelector(state => ({
        selectedCampaign: state.analytics.mainState.campaignId,
        selectedAdGroup: state.analytics.mainState.adGroupId,
    }))

    const columns = [
        {
            title: 'Product',
            dataIndex: 'product',
            key: 'product',
            width: '200px',
            sorter: true,
            locked: true,
            search: true,
        },
        {
            title: 'SKU/ASIN',
            dataIndex: 'sku_asin',
            key: 'sku_asin',
            width: '150px',
            sorter: true,
            locked: true,
        },
        ...!selectedCampaign ? [{...campaignColumn, locked: true}] : [],
        ...!selectedAdGroup ? [{...adGroupColumn, locked: true}] : [],
        {
            ...statusColumn,
            locked: true,
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
        adProfitColumn
    ]

    return (
        <section className={'list-section'}>
            <TableList
                columns={columns}
                fixedColumns={[0]}
            />
        </section>
    )
}

export default ProductAdsList