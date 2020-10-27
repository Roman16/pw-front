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
    campaignColumn, statusColumn,
} from "../../components/TableList/tableColumns"
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"
import InputCurrency from "../../../../components/Inputs/InputCurrency"
import {analyticsActions} from "../../../../actions/analytics.actions"

const AdGroupsList = () => {
    const {selectedCampaign} = useSelector(state => ({
        selectedCampaign: state.analytics.mainState.campaignId
    }))

    const dispatch = useDispatch()

    const setStateHandler = (location, state) => {
        dispatch(analyticsActions.setLocation(location))
        dispatch(analyticsActions.setMainState(state))
    }

    const columns = [
        {
            title: 'Ad Group',
            dataIndex: 'name',
            key: 'name',
            width: '200px',
            sorter: true,
            locked: true,
            search: true,
            render: (adGroup, item) => (
                <Link
                    to={`/analytics/product-ads?campaignId=${item.campaignId}&adGroupId=${item.adGroupId}`}
                    onClick={() => setStateHandler('ad-groups', {
                        name: {
                            campaignName: item.campaignName,
                            adGroupName: item.name
                        }, campaignId: item.campaignId, adGroupId: item.adGroupId
                    })}
                >
                    {adGroup}
                </Link>
            )
        },
        ...selectedCampaign ? [] : [{
            ...campaignColumn,
            locked: true,
            render: (campaign, item) => (<Link
                to={`/analytics/ad-groups?campaignId=${item.campaignId}`}
                title={campaign}
                onClick={() => setStateHandler('ad-groups', {
                    name: {campaignName: item.campaignName},
                    campaignId: item.campaignId
                })}
            >{campaign}</Link>)
        }],
        {...statusColumn, locked: true},
        {
            title: 'Default bid',
            dataIndex: 'defaultBid',
            key: 'defaultBid',
            width: '130px',
            sorter: true,
            locked: true,
            noTotal: true,
            render: (bid) => <InputCurrency value={bid} disabled/>
        },
        {
            title: 'Total Targets',
            dataIndex: 'total_targets',
            key: 'total_targets',
            width: '200px',
            sorter: true,
        },
        {
            title: 'Products',
            dataIndex: 'products',
            key: 'products',
            width: '200px',
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
        <section className={'ad-group-list list-section'}>
            <TableList
                columns={columns}
                fixedColumns={[0]}
            />
        </section>
    )
}

export default AdGroupsList
