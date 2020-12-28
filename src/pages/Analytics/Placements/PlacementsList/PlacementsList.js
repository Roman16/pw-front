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
import InputCurrency from "../../../../components/Inputs/InputCurrency"
import {Popover} from "antd"
import {SVG} from "../../../../utils/icons"
import SegmentFilter from "./SegmentFilter"


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
            filter: true,
            render: (text) => <span title={text} className={'overflow-text'}>{text}</span>
        },
        ...selectedCampaign ? [
            {
                title: 'Campaign Bidding Strategy',
                dataIndex: 'bidding_strategy',
                key: 'bidding_strategy',
                width: '250px',
                sorter: true,
                noTotal: true,
                locked: true,
            },
            {
                title: 'Bid Adjustment',
                dataIndex: 'bid_adjustment',
                key: 'bid_adjustment',
                width: '200px',
                sorter: true,
                locked: true,
                noTotal: true,
                render: () => <InputCurrency disabled/>
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
        <section className={'list-section'}>
            <TableList
                columns={columns}
                fixedColumns={[0]}
                location={location}
                searchField={false}
                moreActions={<SegmentFilter/>}
            />
        </section>
    )
}



export default PlacementsList
