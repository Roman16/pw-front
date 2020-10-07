import React from "react"
import './CampaignsList.less'
import {Link} from "react-router-dom"
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
    dateColumn,
    impressionsColumn,
    roasColumn,
    salesShareColumn,
    statusColumn
} from "../../components/TableList/tableColumns"
import TableList from "../../components/TableList/TableList"
import {useDispatch} from "react-redux"
import {analyticsActions} from "../../../../actions/analytics.actions"
import InputCurrency from "../../../../components/Inputs/InputCurrency"


const CampaignsList = () => {
    const dispatch = useDispatch()

    const openCampaign = () => {
        dispatch(analyticsActions.setLocation('adGroups'))
    }

    const columns = [
        {
            title: 'Campaign',
            dataIndex: 'name',
            key: 'name',
            width: '200px',
            sorter: true,
            locked: true,
            search: true,
            render: (campaign, item) => (<Link to={`/analytics/ad-groups?campaignId=${item.campaignId}`}
                                               onClick={openCampaign}>{campaign}</Link>)
        },
        {
            ...statusColumn,
            locked: true,
        },
        {
            title: 'Type',
            dataIndex: 'targetingType',
            key: 'targetingType',
            width: '200px',
            sorter: true,
            locked: true,
            render: (type) => <span className={'type'}>{type}</span>
        },
        {
            title: 'Budget',
            dataIndex: 'dailyBudget',
            key: 'dailyBudget',
            width: '150px',
            sorter: true,
            locked: true,
            noTotal: true,
            render: (budget) => <InputCurrency disabled value={budget}/>
        },
        {
            title: 'Portfolio',
            dataIndex: 'portfolioName',
            key: 'portfolioName',
            width: '150px',
            sorter: true,
            locked: true,
        },
        {
            title: 'Start date',
            dataIndex: 'startDate',
            key: 'startDate',
            width: '150px',
            sorter: true,
            ...dateColumn
        },
        {
            title: 'End date',
            dataIndex: 'endDate',
            key: 'endDate',
            width: '150px',
            sorter: true,
            ...dateColumn
        },
        {
            title: 'Campaign bidding strategy',
            dataIndex: 'bidding_strategy',
            key: 'bidding_strategy',
            width: '250px',
            sorter: true,
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
        adProfitColumn,
    ]

    return (
        <section className={'campaigns-list list-section'}>
            <TableList
                columns={columns}
                fixedColumns={[0]}
            />
        </section>
    )
}

export default CampaignsList