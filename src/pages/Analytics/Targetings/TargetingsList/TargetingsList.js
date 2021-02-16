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
import TableList from "../../components/TableList/TableList"
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"
import {analyticsActions} from "../../../../actions/analytics.actions"
import InputCurrency from "../../../../components/Inputs/InputCurrency"
import InformationTooltip from "../../../../components/Tooltip/Tooltip"
import OpenCreateWindowButton from "../../components/OpenCreateWindowButton/OpenCreateWindowButton"

export const automatePatDescription = {
    'Close match': 'Sponsored Products target that shows your ad to shoppers who use search terms closely related to your products.',
    'Loose match': 'Sponsored Products target that shows your ad to shoppers who use search terms loosely related to your products.',
    'Substitutes': 'Sponsored Products target that shows your ad to shoppers who view the detail pages of products similar to yours.',
    'Complements': 'Sponsored Products target that shows your ad to shoppers who view the detail pages of products that complement your product.',
    'Product views': 'Sponsored Display target that shows your ad to shoppers who viewed the detail pages of your advertised products.',
    'Similar product views': 'Sponsored Display target that shows your ad to shoppers who viewed the detail pages of products similar to yours.',
}


const TargetingsList = ({location}) => {
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
            ...keywordPTColumn
        },
        ...!selectedCampaign ? [{
            ...campaignColumn,
            locked: true,
            noTotal: true,
            width: '250px',
            render: (campaign, item) => (<Link
                to={`/analytics/ad-groups?campaignId=${item.campaignId}`}
                title={campaign}
                className={'state-link'}
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
            dataIndex: 'adGroupName',
            key: 'adGroupName',
            width: '250px',
            sorter: true,
            filter: true,
            locked: true,
            noTotal: true,
            render: (adGroup, item) => (
                <Link
                    to={`/analytics/product-ads?campaignId=${item.campaignId}&adGroupId=${item.adGroupId}`}
                    title={item.adGroupName}
                    className={'state-link'}
                    onClick={() => setStateHandler('products', {
                        name: {
                            campaignName: item.campaignName,
                            adGroupName: item.adGroupName
                        }, campaignId: item.campaignId, adGroupId: item.adGroupId
                    })}
                >
                    {item.adGroupName}
                </Link>
            )
        }] : [],
        matchTypeColumn,
        {
            ...statusColumn,
            locked: true,
        },
        {
            title: 'Bid',
            dataIndex: 'calculatedBid',
            key: 'calculatedBid',
            width: '150px',
            sorter: true,
            noTotal: true,
            filter: true,
            render: (bid) => bid ? `$${bid}` : ''
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
                location={location}
                moreActions={<OpenCreateWindowButton title={'Add Targetings'} window={'targetings'}/>}
            />
        </section>
    )
}

export default TargetingsList
