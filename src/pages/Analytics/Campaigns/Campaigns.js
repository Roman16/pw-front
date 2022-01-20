import React from "react"
import {metricsKeysWithoutOrganic} from "../componentsV2/MainMetrics/metricsList"
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
    const {selectedPortfolio, user} = useSelector(state => ({
        selectedPortfolio: state.analytics.mainState.portfolioId,
        user: state.user.user
    }))

    const setStateHandler = (location, state, event) => {
        if (event.ctrlKey || event.metaKey) return

        dispatch(analyticsActions.setLocation(location))
        dispatch(analyticsActions.setMainState(state))
    }

    const setStateDetails = (data) => {
        dispatch(analyticsActions.setStateDetails(data))
    }

    const isAgencyUser = user.is_agency_client,
        isSuperAdmin = user.id === 714

    const columns = columnList(setStateHandler, setStateDetails, selectedPortfolio, (isAgencyUser || isSuperAdmin)).map(i => {
        if (!(isAgencyUser || isSuperAdmin)) i.editType = undefined
        return i
    })

    return (
        <div className={'campaigns-workplace'}>
            <RenderPageParts
                location={location}
                availableMetrics={availableMetrics}
                availableParts={['metrics', 'chart', 'table']}
                fixedColumns={(isAgencyUser || isSuperAdmin) ? [0, 1] : [0]}

                columns={columns}
                moreActions={(isAgencyUser || isSuperAdmin) ?
                    <OpenCreateWindowButton title={'Add Campaign'} window={'campaign'}/> : false}
                showRowSelection={!!(isAgencyUser || isSuperAdmin)}
                rowKey={'campaignId'}
            >
                {successCreate => <CreateCampaignWindow onReloadList={successCreate}/>}
            </RenderPageParts>
        </div>
    )
}

export default Campaigns
