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
    impressionsColumn,
    roasColumn,
    salesShareColumn,
    statusColumn
} from "../../components/TableList/tableColumns"
import TableList from "../../components/TableList/TableList"
import {useDispatch} from "react-redux"
import {analyticsActions} from "../../../../actions/analytics.actions"
import InputCurrency from "../../../../components/Inputs/InputCurrency"
import DatePicker from "../../../../components/DatePicker/DatePicker"
import moment from "moment"


const CampaignsList = () => {
    const dispatch = useDispatch()

    const setStateHandler = (location, state) => {
        dispatch(analyticsActions.setLocation(location))
        dispatch(analyticsActions.setMainState(state))
    }

    const columns = [
        {
            title: 'Campaign',
            dataIndex: 'name',
            key: 'name',
            width: '250px',
            sorter: true,
            locked: true,
            search: true,
            render: (campaign, item) => (<Link
                to={`/analytics/ad-groups?campaignId=${item.campaignId}`}
                onClick={() => setStateHandler('adGroups', {name: item.name, campaignId: item.campaignId})}
                title={campaign}
            >
                {campaign}
            </Link>)
        },
        {
            ...statusColumn,
            locked: true,
        },
        {
            title: 'Type',
            dataIndex: 'targetingType',
            key: 'targetingType',
            width: '150px',
            sorter: true,
            locked: true,
            filter: true,
            render: (type) => <span className={'type'}>{type}</span>
        },
        {
            title: 'Budget',
            dataIndex: 'dailyBudget',
            key: 'dailyBudget',
            width: '120px',
            sorter: true,
            locked: true,
            noTotal: true,
            filter: true,
            render: (budget) => <InputCurrency disabled value={budget}/>
        },
        {
            title: 'Portfolio',
            dataIndex: 'portfolioName',
            key: 'portfolioName',
            width: '150px',
            sorter: true,
            locked: true,
            filter: true,
            render: (portfolio, item) => (
                <Link
                    to={`/analytics/campaigns?portfolioId=${item.portfolioId}`}
                    title={portfolio}
                    onClick={() => setStateHandler('campaigns', {
                        name: item.portfolioName,
                        portfolioId: item.portfolioId
                    })}
                >
                    {portfolio}
                </Link>
            )
        },
        {
            title: 'Start date',
            dataIndex: 'startDate',
            key: 'startDate',
            width: '150px',
            sorter: true,
            noTotal: true,
            render: (date) => <DatePicker format={'DD.MM.YYYY'} placeholder={'No start date'}
                                          defaultValue={date && moment(date)} disabled/>
        },
        {
            title: 'End date',
            dataIndex: 'endDate',
            key: 'endDate',
            width: '150px',
            sorter: true,
            noTotal: true,
            render: (date) => <DatePicker format={'DD.MM.YYYY'} placeholder={'No end date'}
                                          defaultValue={date && moment(date)} disabled/>
        },
        {
            title: 'Campaign bidding strategy',
            dataIndex: 'bidding_strategy',
            key: 'bidding_strategy',
            width: '250px',
            sorter: true,
            filter: true,
            render: (text) => <>
                {text === 'legacyForSales' && 'Legacy For Sales'}
                {text === 'autoForSales' && 'Auto For Sales'}
                {text === 'manual' && 'Manual'}
                {(text !== 'manual' && text !== 'autoForSales' && text !== 'autoForSales') && text}
            </>
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
