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


const PlacementsList = ({location}) => {
    const {selectedCampaign} = useSelector(state => ({
        selectedCampaign: state.analytics.mainState.campaignId,
    }))


    const columns = [
        {
            title: 'Placement',
            dataIndex: 'placementName',
            key: 'placementName',
            width: '200px',
            sorter: true,
            locked: true,
            search: true,
            render: (text) => <span title={text} className={'overflow-text'}>{text}</span>
        },
        ...selectedCampaign ? [{
            title: 'Campaign Bidding Strategy',
            dataIndex: 'bidding_strategy',
            key: 'bidding_strategy',
            width: '250px',
            sorter: true,
            noTotal: true,
            locked: true,
        }] : [],
        {
            title: 'Bid Adjustment',
            dataIndex: 'bid_adjustment',
            key: 'bid_adjustment',
            width: '200px',
            sorter: true,
            locked: true,
            noTotal: true,
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
                location={location}
            />
        </section>
    )
}

export default PlacementsList
