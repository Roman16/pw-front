import React from "react"
import TableFilters from '../../components/TableFilters/TableFilters'
import TableList from "../../components/TableList/TableList"
import {useDispatch, useSelector} from "react-redux"
import {adGroupColumn, campaignColumn, matchTypeColumn} from "../../components/TableList/tableColumns"
import {Link} from "react-router-dom"
import {analyticsActions} from "../../../../actions/analytics.actions"
import InformationTooltip from "../../../../components/Tooltip/Tooltip"
import {automatePatDescription} from "../../Targetings/TargetingsList/TargetingsList"


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
            render: (text, item) => <>
                <span className={'overflow-text'} title={text}>
                    {text}
                </span>

                {item.calculatedTargetingMatchType === 'auto' && <InformationTooltip
                    title={text}
                    description={automatePatDescription[text]}
                />}
            </>

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
            />
        </section>
    )
}

export default NegativeTargetingsList
