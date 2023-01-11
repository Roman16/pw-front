import React from "react"
import {metricsKeysWithoutOrganic} from "../componentsV2/MainMetrics/metricsList"
import CreateAdGroupWindow from "./CreateAdGroupWindow/CreateAdGroupWindow"
import RenderPageParts from "../componentsV2/RenderPageParts/RenderPageParts"
import {useDispatch, useSelector} from "react-redux"
import {analyticsActions} from "../../../actions/analytics.actions"
import {columnList} from "./tableComponents/columnList"
import OpenCreateWindowButton from "../components/OpenCreateWindowButton/OpenCreateWindowButton"

const AdGroups = () => {
    const availableMetrics = [...metricsKeysWithoutOrganic]
    const location = 'ad-groups'

    const {selectedCampaign} = useSelector(state => ({
        selectedCampaign: state.analytics.mainState.campaignId
    }))

    const dispatch = useDispatch()

    const setStateDetails = (data) => {
        dispatch(analyticsActions.setStateDetails(data))
    }

    const setStateHandler = (location, state, event) => {
        if (event.ctrlKey || event.metaKey) return

        dispatch(analyticsActions.setLocation(location))
        dispatch(analyticsActions.setMainState(state))
    }

    return (
        <div className={'ad-groups-workplace'}>
            <RenderPageParts
                location={location}
                availableMetrics={availableMetrics}
                availableParts={['metrics', 'chart', 'table']}
                fixedColumns={[0, 1]}
                showRowSelection={true}
                rowKey={'adGroupId'}

                columns={columnList(setStateHandler, selectedCampaign, setStateDetails)}
                // moreActions={<OpenCreateWindowButton title={'Add Ad Group'} window={'adGroup'}/>}
            />

            <CreateAdGroupWindow/>
        </div>
    )
}

export default AdGroups
