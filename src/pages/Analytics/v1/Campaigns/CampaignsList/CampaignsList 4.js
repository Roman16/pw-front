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
    ctrColumn, EditableField,
    impressionsColumn,
    roasColumn,
    salesShareColumn,
    statusColumn
} from "../../../components/TableList/tableColumns"
import TableList from "../../../components/TableList/TableList"
import {useDispatch, useSelector} from "react-redux"
import {analyticsActions} from "../../../../../actions/analytics.actions"


const CampaignsList = ({location}) => {
    const dispatch = useDispatch()
    const {selectedPortfolio} = useSelector(state => ({
        selectedPortfolio: state.analytics.mainState.portfolioId,
    }))

    const setStateHandler = (location, state) => {
        dispatch(analyticsActions.setLocation(location))
        dispatch(analyticsActions.setMainState(state))
    }

    const setStateDetails = (data) => {
        dispatch(analyticsActions.setStateDetails(data))
    }

    const columns = [
        // {
        //     title: 'Active',
        //     dataIndex: 'state',
        //     key: 'state',
        //     width: '65px',
        //     noTotal: true,
        //     render: (state) => <div className="switch-block">
        //         <Switch
        //             disabled={state === 'archived'}
        //             checked={state === 'enabled'}
        //         />
        //     </div>
        // },
        {
            title: 'Campaign',
            dataIndex: 'name',
            key: 'name',
            width: '350px',
            sorter: true,
            locked: true,
            search: true,
            render: (campaign, item) => (<Link
                to={`/analytics/ad-groups?campaignId=${item.campaignId}`}
                className={'state-link'}
                onClick={() => {
                    setStateHandler('ad-groups', {
                        name: {campaignName: item.name},
                        campaignId: item.campaignId
                    })
                    setStateDetails(item)
                }}
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
            noTotal: true,
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
            fastUpdating: true,
            render: (budget) => <EditableField
                type={'currency'}
                value={budget}
            />
        },
        ...!selectedPortfolio ? [{
            title: 'Portfolio',
            dataIndex: 'portfolioName',
            key: 'portfolioName',
            width: '150px',
            sorter: true,
            locked: true,
            filter: true,
            noTotal: true,
            render: (portfolio, item) => (
                <Link
                    to={`/analytics/campaigns?portfolioId=${item.portfolioId}`}
                    title={portfolio}
                    className={'state-link'}
                    onClick={() => setStateHandler('campaigns', {
                        name: item.portfolioName,
                        portfolioId: item.portfolioId
                    })}
                >
                    {portfolio}
                </Link>
            )
        }] : [],
        {
            title: 'Start date',
            dataIndex: 'startDate',
            key: 'startDate',
            width: '150px',
            sorter: true,
            noTotal: true,
            fastUpdating: true,
            render: (date) => <EditableField
                type={'date'}
                value={date}
            />
        },
        {
            title: 'End date',
            dataIndex: 'endDate',
            key: 'endDate',
            width: '150px',
            sorter: true,
            noTotal: true,
            fastUpdating: true,
            render: (date) => <EditableField
                type={'date'}
                value={date}
            />
        },
        {
            title: 'Campaign bidding strategy',
            dataIndex: 'bidding_strategy',
            key: 'bidding_strategy',
            width: '250px',
            sorter: true,
            filter: true,
            noTotal: true,
            render: (text) => <>
                {text === 'legacyForSales' && 'Legacy For Sales'}
                {text === 'autoForSales' && 'Auto For Sales'}
                {text === 'manual' && 'Manual'}
                {(text !== 'manual' && text !== 'autoForSales' && text !== 'legacyForSales') && text}
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
                location={location}
                // moreActions={<OpenCreateWindowButton title={'Add Campaign'} window={'campaign'}/>}
                // showRowSelection={true}
                rowKey={'campaignId'}
            />
        </section>
    )
}

export default CampaignsList
