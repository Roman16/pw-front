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
    impressionsColumn,
    roasColumn,
    salesShareColumn,
    statusColumn
} from "../../components/TableList/tableColumns"
import TableList from "../../components/TableList/TableList"
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"
import {analyticsActions} from "../../../../actions/analytics.actions"
import InputCurrency from "../../../../components/Inputs/InputCurrency"


const TargetingsList = () => {
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
            title: 'Keyword / PT',
            dataIndex: 'calculatedTargetingText',
            key: 'calculatedTargetingText',
            width: '400px',
            sorter: true,
            locked: true,
            search: true,
            render: text => <span className={'overflow-text'} title={text}>{text}</span>
        },
        ...!selectedCampaign ? [{
            ...campaignColumn,
            locked: true,
            width: '250px',
            render: (campaign, item) => (<Link
                to={`/analytics/ad-groups?campaignId=${item.campaignId}`}
                title={campaign}
                onClick={() => setStateHandler('ad-groups', {
                    name: {campaignName: item.campaignName},
                    campaignId: item.campaignId
                })}
            >
                {campaign}
            </Link>)
        }] : [],
        ...!selectedAdGroup ? [{
            title: 'Ad Group',
            dataIndex: 'ad_group',
            key: 'ad_group',
            width: '250px',
            sorter: true,
            filter: true,
            locked: true,
            render: (adGroup, item) => (
                <Link
                    title={item.adGroupName}
                    onClick={() => setStateHandler('products', {
                        name: {
                            campaignName: item.campaignName,
                            adGroupName: item.adGroupName
                        }, campaignId: item.campaignId, adGroupId: item.adGroupId
                    })}
                    to={`/analytics/product-ads?campaignId=${item.campaignId}&adGroupId=${item.adGroupId}`}>
                    {item.adGroupName}
                </Link>
            )
        }] : [],
        {
            title: 'Match type',
            dataIndex: 'calculatedTargetingMatchType',
            key: 'calculatedTargetingMatchType',
            width: '150px',
            sorter: true,
            locked: true,
        },
        {
            ...statusColumn,
            locked: true,
        },
        {
            title: 'Bid',
            dataIndex: 'bid',
            key: 'bid',
            width: '150px',
            sorter: true,
            noTotal: true,
            render: (bid) => <InputCurrency disabled value={bid}/>
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
        budgetAllocationColumn
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

export default TargetingsList
