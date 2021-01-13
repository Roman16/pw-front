import React from "react"
import {
    acosColumn,
    adCvrColumn,
    adGroupColumn,
    adOrdersColumn,
    adSalesColumn,
    adSpendColumn,
    adUnitsColumn,
    budgetAllocationColumn,
    campaignColumn,
    clicksColumn,
    cpaColumn,
    cpcColumn,
    ctrColumn,
    impressionsColumn, keywordPTColumn, matchTypeColumn,
    roasColumn,
    salesShareColumn,
    statusColumn
} from "../../components/TableList/tableColumns"
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"
import {analyticsActions} from "../../../../actions/analytics.actions"
import InputCurrency from "../../../../components/Inputs/InputCurrency"
import TableList from "../../componentsV2/TableList/TableList"

const SearchTermsList = ({location, metricsData, tableData}) => {
    const {selectedCampaign, selectedAdGroup} = useSelector(state => ({
        selectedCampaign: state.analytics.mainState.campaignId,
        selectedAdGroup: state.analytics.mainState.adGroupId,
    }))

    const dispatch = useDispatch()

    const setStateHandler = (location, state) => {
        dispatch(analyticsActions.setLocation(location))
        dispatch(analyticsActions.setMainState(state))
    }

    const columns = [
        {
            title: 'Query',
            dataIndex: 'query',
            key: 'query',
            width: '400px',
            sorter: true,
            locked: true,
            search: true,
            ...keywordPTColumn
        },
        // ...!selectedCampaign ? [{
        //     ...campaignColumn,
        //     locked: true,
        //     noTotal: true,
        //     width: '250px',
        //     render: (campaign, item) => (<Link
        //         to={`/analytics/ad-groups?campaignId=${item.campaignId}`}
        //         title={campaign}
        //         className={'state-link'}
        //         onClick={() => setStateHandler('ad-groups', {
        //             name: {campaignName: item.campaignName},
        //             campaignId: item.campaignId
        //         })}
        //     >
        //         {campaign}
        //     </Link>)
        // }] : [],
        // ...!selectedAdGroup ? [{
        //     title: 'Ad Group',
        //     dataIndex: 'adGroupName',
        //     key: 'adGroupName',
        //     width: '250px',
        //     sorter: true,
        //     filter: true,
        //     locked: true,
        //     noTotal: true,
        //     render: (adGroup, item) => (
        //         <Link
        //             to={`/analytics/product-ads?campaignId=${item.campaignId}&adGroupId=${item.adGroupId}`}
        //             title={item.adGroupName}
        //             className={'state-link'}
        //             onClick={() => setStateHandler('products', {
        //                 name: {
        //                     campaignName: item.campaignName,
        //                     adGroupName: item.adGroupName
        //                 }, campaignId: item.campaignId, adGroupId: item.adGroupId
        //             })}
        //         >
        //             {item.adGroupName}
        //         </Link>
        //     )
        // }] : [],
        // matchTypeColumn,
        // {
        //     ...statusColumn,
        //     locked: true,
        // },
        // {
        //     title: 'Bid',
        //     dataIndex: 'calculatedBid',
        //     key: 'calculatedBid',
        //     width: '150px',
        //     sorter: true,
        //     noTotal: true,
        //     filter: true,
        //     render: (bid) => <InputCurrency disabled value={bid}/>
        // },
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
        budgetAllocationColumn
    ]

    return (
        <section className={'list-section'}>
            <TableList
                tableData={tableData}
                columns={columns}
                fixedColumns={[0]}
                location={location}
                metricsData={metricsData}
            />
        </section>
    )
}

export default SearchTermsList
