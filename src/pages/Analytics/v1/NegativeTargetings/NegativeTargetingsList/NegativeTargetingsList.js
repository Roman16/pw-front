import React from "react"
import TableList from "../../../components/TableList/TableList"
import {useDispatch, useSelector} from "react-redux"
import {adGroupColumn, campaignColumn, keywordPTColumn, matchTypeColumn} from "../../../components/TableList/tableColumns"
import {Link} from "react-router-dom"
import {analyticsActions} from "../../../../../actions/analytics.actions"


const NegativeTargetingsList = ({location}) => {
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
            ...keywordPTColumn
        },
        ...!selectedCampaign ? [{
            ...campaignColumn,
            noTotal: true,
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
            ...adGroupColumn,
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
        matchTypeColumn
    ]

    return (
        <section className={'list-section'}>
            <TableList
                columns={columns}
                columnSelect={false}
                dateRange={false}
                location={location}
                // moreActions={<OpenCreateWindowButton title={'Add Negative Targetings'} window={'negativeTargetings'}/>}
                showOptions={false}
            />
        </section>
    )
}

export default NegativeTargetingsList
