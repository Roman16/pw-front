import React from "react"
import {metricsKeysWithoutOrganic} from "../components/MainMetrics/metricsList"
import CreateCampaignWindow from "./CreateCampaignWindow/CreateCampaignWindow"
import RenderPageParts from "../componentsV2/RenderPageParts/RenderPageParts"
import OpenCreateWindowButton from "../components/OpenCreateWindowButton/OpenCreateWindowButton"
import {useDispatch, useSelector} from "react-redux"
import {analyticsActions} from "../../../actions/analytics.actions"
import {columnList} from "./tableComponents/columnList"

const Campaigns = () => {
    const availableMetrics = [...metricsKeysWithoutOrganic]
    const location = 'campaigns'

    const dispatch = useDispatch()
    const {selectedPortfolio} = useSelector(state => ({
        selectedPortfolio: state.analytics.mainState.portfolioId,
    }))

    const setStateHandler = (location, state) => {
        dispatch(analyticsActions.setLocation(location))
        dispatch(analyticsActions.setMainState(state))
    }

    const setStateDetails = (data) => {
        dispatch(analyticsActions.setStateDetails(data))
    }

    return (
        <div className={'campaigns-workplace'}>
            <RenderPageParts
                location={location}
                availableMetrics={availableMetrics}
                availableParts={['metrics', 'chart', 'table']}
                fixedColumns={[0, 1]}

                columns={columnList(setStateHandler, setStateDetails, selectedPortfolio)}
                moreActions={<OpenCreateWindowButton title={'Add Campaign'} window={'campaign'}/>}
                showRowSelection={true}
                rowKey={'campaignId'}
            >
                {successCreate => <CreateCampaignWindow onReloadList={successCreate}/>}


            </RenderPageParts>
        </div>
    )
}

export default Campaigns
