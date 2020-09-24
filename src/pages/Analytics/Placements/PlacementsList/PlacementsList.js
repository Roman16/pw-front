import React from "react"
import {
    acosColumn,
    adCvrColumn,
    adOrdersColumn,
    adProfitColumn,
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
import TableList from "../../components/TableList/TableList"
import {useSelector} from "react-redux"


const PlacementsList = () => {
    const {selectedCampaign} = useSelector(state => ({
        selectedCampaign: state.analytics.mainState.campaignId,
    }))


    const columns = [
        {
            title: 'Placement',
            dataIndex: 'placement',
            key: 'placement',
            width: '200px',
            sorter: true,
            locked: true,
            search: true,
        },
        ...selectedCampaign ? [{
            title: 'Campaign Bidding Strategy',
            dataIndex: 'campaign_bidding_strategy',
            key: 'campaign_bidding_strategy',
            width: '250px',
            sorter: true,
            locked: true,
        }] : [],
        {
            title: 'Bid Adjustment',
            dataIndex: 'bid_adjustment',
            key: 'bid_adjustment',
            width: '200px',
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
        }
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

export default PlacementsList