import React from "react"
import TableFilters from '../../components/TableFilters/TableFilters'
import {
    acosColumn,
    adCvrColumn, adGroupColumn,
    adOrdersColumn,
    adSalesColumn,
    adSpendColumn,
    adUnitsColumn,
    budgetAllocationColumn, campaignColumn,
    clicksColumn,
    cpaColumn,
    cpcColumn,
    ctrColumn,
    impressionsColumn,
    roasColumn,
    salesShareColumn,
    statusColumn
} from "../../components/tableColumns"
import TableList from "../../components/TableList/TableList"
import {useSelector} from "react-redux"
import {Link} from "react-router-dom"


const TargetingsList = () => {
    const {selectedCampaign, selectedAdGroup} = useSelector(state => ({
        selectedCampaign: state.analytics.mainState.campaignId,
        selectedAdGroup: state.analytics.mainState.adGroupId,
    }))

    const columns = [
        {
            title: 'Keyword / PT',
            dataIndex: 'keyword_pt',
            key: 'keyword_pt',
            width: '200px',
            sorter: true,
        },
        ...!selectedCampaign ? [campaignColumn] : [],
        ...!selectedAdGroup ? [adGroupColumn] : [],
        {
            title: 'Match type',
            dataIndex: 'match_type',
            key: 'match_type',
            width: '150px',
            sorter: true
        },
        {
            ...statusColumn
        },
        {
            title: 'Bid',
            dataIndex: 'bid',
            key: 'bid',
            width: '150px',
            sorter: true
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
    ]

    return (
        <section className={'list-section'}>
            <TableFilters
                columns={columns}
            />

            <TableList
                columns={columns}
                fixedColumns={[0]}
            />
        </section>
    )
}

export default TargetingsList