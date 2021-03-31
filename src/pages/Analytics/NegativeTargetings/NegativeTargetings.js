import React from "react"
import {columnList} from "./tableComponents/columnList"
import CreateNegativeTargetingsWindow from "./CreateNegativeTargetingsWindow/CreateNegativeTargetingsWindow"
import RenderPageParts from "../componentsV2/RenderPageParts/RenderPageParts"
import OpenCreateWindowButton from "../components/OpenCreateWindowButton/OpenCreateWindowButton"
import {useDispatch, useSelector} from "react-redux"
import {analyticsActions} from "../../../actions/analytics.actions"

const NegativeTargetings = () => {
    const location = 'negative-targetings'

    const {selectedCampaign, selectedAdGroup} = useSelector(state => ({
        selectedCampaign: state.analytics.mainState.campaignId,
        selectedAdGroup: state.analytics.mainState.adGroupId,
    }))

    const dispatch = useDispatch()

    const setStateHandler = (location, state) => {
        dispatch(analyticsActions.setLocation(location))
        dispatch(analyticsActions.setMainState(state))
    }

    return (
        <div className={'negative-targetings-workplace'}>
            <RenderPageParts
                location={location}
                availableParts={['table']}

                columns={columnList(setStateHandler, selectedCampaign, selectedAdGroup)}
                // moreActions={<OpenCreateWindowButton title={'Add Negative Targetings'} window={'negativeTargetings'}/>}
                // showRowSelection={false}
            />


            {/*<CreateNegativeTargetingsWindow/>*/}
        </div>
    )
}

export default NegativeTargetings
