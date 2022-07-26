import React from "react"
import {columnList} from "./tableComponents/columnList"
import _ from "lodash"
import {metricsKeysWithoutOrganic} from "../componentsV2/MainMetrics/metricsList"
import CreateTargetingsWindow from "./CreateTargetingsWindow/CreateTargetingsWindow"
import RenderPageParts from "../componentsV2/RenderPageParts/RenderPageParts"
import OpenCreateWindowButton from "../components/OpenCreateWindowButton/OpenCreateWindowButton"
import {useDispatch, useSelector} from "react-redux"
import {analyticsActions} from "../../../actions/analytics.actions"

const Targetings = () => {
    const availableMetrics = _.filter([...metricsKeysWithoutOrganic], v => v !== 'ad_profit')
    const location = 'targetings'

    const {selectedCampaign, selectedAdGroup, user} = useSelector(state => ({
        selectedCampaign: state.analytics.mainState.campaignId,
        selectedAdGroup: state.analytics.mainState.adGroupId,
        user: state.user.userDetails
    }))

    const dispatch = useDispatch()

    const setStateHandler = (location, state, event) => {
        if (event.ctrlKey || event.metaKey) return

        dispatch(analyticsActions.setLocation(location))
        dispatch(analyticsActions.setMainState(state))
    }

    const isAgencyUser = user.is_agency_client,
        isSuperAdmin = user.id === 714

    let columns = columnList(setStateHandler, selectedCampaign, selectedAdGroup, (isAgencyUser || isSuperAdmin))

    columns.columnsWithFilters = columns.columnsWithFilters.map(i => {
        if (!(isAgencyUser || isSuperAdmin)) i.editType = undefined
        return i
    })


    return (
        <div className={'targetings-workplace'}>
            <RenderPageParts
                location={location}
                availableMetrics={availableMetrics}
                availableParts={['metrics', 'chart', 'table']}
                fixedColumns={(isAgencyUser || isSuperAdmin) ? [0, 1] : [0]}

                columns={columns}
                moreActions={<OpenCreateWindowButton title={'Add Targetings'} window={'targetings'}/>}
                showRowSelection={!!(isAgencyUser || isSuperAdmin)}
                rowKey={'targetingId'}
            >
                {successCreate => <CreateTargetingsWindow onReloadList={successCreate}/>}
            </RenderPageParts>

        </div>
    )
}

export default Targetings
