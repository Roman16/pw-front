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

    const {selectedCampaign, selectedAdGroup} = useSelector(state => ({
        selectedCampaign: state.analytics.mainState.campaignId,
        selectedAdGroup: state.analytics.mainState.adGroupId,
    }))

    const dispatch = useDispatch()

    const setStateHandler = (location, state, event) => {
        if (event.ctrlKey || event.metaKey) return

        dispatch(analyticsActions.setLocation(location))
        dispatch(analyticsActions.setMainState(state))
    }


    let columns = columnList(setStateHandler, selectedCampaign, selectedAdGroup, true)


    return (
        <div className={'targetings-workplace'}>
            <RenderPageParts
                location={location}
                availableMetrics={availableMetrics}
                availableParts={['metrics', 'chart', 'table']}
                fixedColumns={[0, 1]}

                columns={columns}
                moreActions={<OpenCreateWindowButton title={'Add Targetings'} window={'targetings'}/>}
                showRowSelection={true}
                rowKey={'targetingId'}
            >
                {successCreate => <CreateTargetingsWindow onReloadList={successCreate}/>}
            </RenderPageParts>

        </div>
    )
}

export default Targetings
