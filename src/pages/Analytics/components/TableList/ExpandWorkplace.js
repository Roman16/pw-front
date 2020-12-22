import React from "react"
import {useDispatch, useSelector} from "react-redux"
import {analyticsActions} from "../../../../actions/analytics.actions"

const ExpandWorkplace = () => {
    const dispatch = useDispatch()

    const visibleNavigation = useSelector(state => state.analytics.visibleNavigation)

    const expandWorkplaceHandler = () => {
        dispatch(analyticsActions.expandWorkplace(!visibleNavigation))
        dispatch(analyticsActions.switchChartView(!visibleNavigation))
    }

    return (
        <button
            className={`expand-workplace icon-btn ${visibleNavigation ? 'open' : 'closed'}`}
            onClick={expandWorkplaceHandler}
        >
            <i>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d={visibleNavigation ? "M1 6V1H6" : 'M13 18V13H18'}
                        fill={'none'}
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />

                    <path
                        d={visibleNavigation ? "M19 6V1H14" : 'M7 18V13H2'}
                        fill={'none'}
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />

                    <path
                        d={visibleNavigation ? "M1 14V19H6" : 'M13 2V7H18'}
                        fill={'none'}
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />

                    <path
                        d={visibleNavigation ? "M19 14V19H14" : 'M7 2V7H2'}
                        fill={'none'}
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </i>

            {visibleNavigation ? 'expand' : 'collapse'}
        </button>

    )
}

export default ExpandWorkplace
