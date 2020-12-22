import React from "react"
import {SVG} from "../../../../utils/icons"
import {useDispatch, useSelector} from "react-redux"
import {analyticsActions} from "../../../../actions/analytics.actions"

const SwitchChartVisible = () => {
    const dispatch = useDispatch()

    const chartIsVisible = useSelector(state => state.analytics.visibleChart)

    const switchChartView = () => {
        dispatch(analyticsActions.switchChartView(!chartIsVisible))
    }

    return (<div className="switch-chart-visible" onClick={switchChartView}>
        <i className={chartIsVisible ? 'visible' : 'hidden'}>
            <SVG id={'select-icon'}/>
        </i>
    </div>)

}

export default React.memo(SwitchChartVisible)
