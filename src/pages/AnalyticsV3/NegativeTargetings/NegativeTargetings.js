import React from "react"
import {columnList} from "./tableComponents/columnList"
import RenderPageParts from "../components/RenderPageParts/RenderPageParts"
import {useDispatch, useSelector} from "react-redux"
import {analyticsActions} from "../../../actions/analytics.actions"
import OpenCreateWindowButton from "../components/OpenCreateWindowButton/OpenCreateWindowButton"
import CreateNegativeTargetingsWindow from "./CreateNegativeTargetingsWindow/CreateNegativeTargetingsWindow"

const NegativeTargetings = () => {
    const location = 'negative-targetings'

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

    return (
        <div className={'negative-targetings-workplace'}>
            <RenderPageParts
                location={location}
                availableParts={['table']}

                columns={columnList(setStateHandler, selectedCampaign, selectedAdGroup)}
                moreActions={<OpenCreateWindowButton title={'Add Negative Targetings'} window={location}/>}
                showRowSelection={true}
                dateRange={false}
                showOptions={false}
                rowKey={'targetingId'}
                fixedColumns={[0]}
            >
                {successCreate => <CreateNegativeTargetingsWindow onReloadList={successCreate} location={location}/>}
            </RenderPageParts>


        </div>
    )
}

export default NegativeTargetings
