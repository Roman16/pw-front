import React from "react"
import {metricKeys, metricsKeysWithoutOrganic} from "../componentsV2/MainMetrics/metricsList"
import CreatePortfolioWindow from "./CreatePortfolioWindow/CreatePortfolioWindow"
import RenderPageParts from "../componentsV2/RenderPageParts/RenderPageParts"
import OpenCreateWindowButton from "../components/OpenCreateWindowButton/OpenCreateWindowButton"
import {columnList} from "./tableComponents/columnList"
import {analyticsActions} from "../../../actions/analytics.actions"
import {useDispatch} from "react-redux"

const Portfolios = () => {
    const availableMetrics = [
            ...metricsKeysWithoutOrganic,
            metricKeys['SBAdSales'],
            metricKeys['SPAdSales'],
            metricKeys['SDAdSales']
        ],
        location = 'portfolios',
        dispatch = useDispatch()

    const setStateHandler = (location, state, event) => {
        if (event.ctrlKey || event.metaKey) return

        dispatch(analyticsActions.setLocation(location))
        dispatch(analyticsActions.setMainState(state))
    }

    return (
        <div className={'portfolios-workplace'}>
            <RenderPageParts
                location={location}
                availableMetrics={availableMetrics}
                availableParts={['metrics', 'chart', 'table']}
                fixedColumns={[0]}
                showRowSelection={false}

                columns={columnList(setStateHandler)}
                // moreActions={<OpenCreateWindowButton title={'Add Portfolio'} window={'portfolio'}/>}
            />

            {/*<CreatePortfolioWindow/>*/}
        </div>
    )
}

export default Portfolios
