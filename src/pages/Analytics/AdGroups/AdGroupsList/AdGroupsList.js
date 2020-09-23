import React from "react"
import './AdGroupsList.less'
import TableList from "../../components/TableList/TableList"
import {
    budgetAllocationColumn,
    impressionsColumn,
    salesShareColumn,
    adOrdersColumn,
    adProfitColumn,
    adSalesColumn,
    adSpendColumn,
    adUnitsColumn,
    clicksColumn,
    adCvrColumn,
    roasColumn,
    acosColumn,
    cpaColumn,
    cpcColumn,
    ctrColumn,
    campaignColumn,
} from "../../components/tableColumns"
import {useSelector} from "react-redux"
import {Link} from "react-router-dom"

const AdGroupsList = () => {
    const {selectedCampaign} = useSelector(state => ({
        selectedCampaign: state.analytics.mainState.campaignId
    }))

    const columns = [
        {
            title: 'Ad Group',
            dataIndex: 'ad_group',
            key: 'ad_group',
            minWidth: '200px',
            sorter: true,
            locked: true,
            render: (adGroup, item) => (
                <Link to={`/analytics/product-ads?campaignId=${item.campaignId}&adGroupId=${item.id}`}>
                    {adGroup}
                </Link>
            )
        },
        ...selectedCampaign ? [] : [{...campaignColumn, locked: true}],
        {
            title: 'Default bid',
            dataIndex: 'default_bid',
            key: 'default_bid',
            minWidth: '200px',
            sorter: true,
            locked: true,
        },
        {
            title: 'Total Targets',
            dataIndex: 'total_targets',
            key: 'total_targets',
            minWidth: '200px',
            sorter: true,
            locked: true,
        },
        {
            title: 'Products',
            dataIndex: 'products',
            key: 'products',
            minWidth: '200px',
            sorter: true,
            locked: true,
        },
        {
            ...impressionsColumn
        },
        {
            ...clicksColumn
        },
        {
            ...ctrColumn
        },
        {
            ...adSpendColumn
        },
        {
            ...cpcColumn
        },
        {
            ...adSalesColumn
        },
        {
            ...acosColumn
        },
        {
            ...adCvrColumn
        },
        {
            ...cpaColumn
        },
        {
            ...adOrdersColumn
        },
        {
            ...adUnitsColumn
        },
        {
            ...roasColumn
        },
        {
            ...salesShareColumn
        },
        {
            ...budgetAllocationColumn
        },
        {
            ...adProfitColumn
        },
    ]

    return (
        <section className={'ad-group-list list-section'}>
            <TableList
                columns={columns}
                fixedColumns={[0]}
            />
        </section>
    )
}

export default AdGroupsList