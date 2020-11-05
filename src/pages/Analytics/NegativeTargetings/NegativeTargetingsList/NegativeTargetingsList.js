import React from "react"
import TableFilters from '../../components/TableFilters/TableFilters'
import TableList from "../../components/TableList/TableList"
import {useDispatch, useSelector} from "react-redux"
import {adGroupColumn, campaignColumn} from "../../components/TableList/tableColumns"
import {Link} from "react-router-dom"
import {analyticsActions} from "../../../../actions/analytics.actions"


const NegativeTargetingsList = () => {
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
            sorter: true,
            locked: true,
            search: true,
        },
        ...!selectedCampaign ? [{
            ...campaignColumn,
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
            ...adGroupColumn,
            render: (adGroup, item) => (
                <Link
                    to={`/analytics/product-ads?campaignId=${item.campaignId}&adGroupId=${item.adGroupId}`}
                    title={item.adGroupName}
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
        {
            title: 'Match type',
            dataIndex: 'calculatedTargetingMatchType',
            key: 'calculatedTargetingMatchType',
            sorter: true,
            locked: true,
        },
    ]

    return (
        <section className={'list-section'}>
            <TableList
                columns={columns}
                columnSelect={false}
            />
        </section>
    )
}

export default NegativeTargetingsList
