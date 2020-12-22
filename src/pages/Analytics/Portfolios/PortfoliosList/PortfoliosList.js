import React from "react"
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
    renderNumberField,
} from "../../components/TableList/tableColumns"
import TableList from "../../components/TableList/TableList"
import {useDispatch} from "react-redux"
import {analyticsActions} from "../../../../actions/analytics.actions"


const PortfoliosList = ({location}) => {
    const dispatch = useDispatch()

    const setStateHandler = (location, state) => {
        dispatch(analyticsActions.setLocation(location))
        dispatch(analyticsActions.setMainState(state))
    }


    const columns = [
        {
            title: 'Portfolio',
            dataIndex: 'portfolioName',
            key: 'portfolioName',
            width: '250px',
            sorter: true,
            locked: true,
            search: true,
            render: (portfolio, item) => (<Link
                to={`/analytics/campaigns?portfolioId=${item.portfolioId}`}
                className={'state-link'}
                title={portfolio}
                onClick={() => setStateHandler('campaigns', {
                    name: {portfolioName: portfolio},
                    portfolioId: item.portfolioId
                })}
            >
                {portfolio}
            </Link>)
        },
        {
            title: 'Campaigns',
            dataIndex: 'campaigns_count',
            key: 'campaigns_count',
            width: '150px',
            sorter: true,
            noTotal: true,
            align: 'right',
            ...renderNumberField('number', false)
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

export default PortfoliosList
