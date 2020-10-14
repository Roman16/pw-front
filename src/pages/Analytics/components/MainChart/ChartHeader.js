import React, {Fragment, useState} from "react"
import {Popover, Switch} from "antd"
import {SVG} from "../../../../utils/icons"
import {useDispatch} from "react-redux"
import {analyticsActions} from "../../../../actions/analytics.actions"

const ChartHeader = ({chartState, activeMetrics}) => {
    const [visiblePopover, setVisiblePopover] = useState(undefined)

    const dispatch = useDispatch()

    const onChangeState = (name, value) => {
        dispatch(analyticsActions.setChartState({...chartState, [name]: value}))

        if (name === 'selectFourMetrics' && !value) {
            dispatch(analyticsActions.updateMetricsState({
                activeMetrics: [...activeMetrics.splice(0, 2)]
            }))
        }
    }

    const OptionsMenu = () => {
        return (
            <div className="switches">
                <div className='switch-block week-switch'>
                    <Switch
                        checked={chartState.showWeekChart}
                        onChange={e => onChangeState('showWeekChart', e)}
                    />

                    <span>7-day average</span>
                </div>

                <div className='switch-block daily-switch'>
                    <Switch
                        checked={chartState.showDailyChart}
                        onChange={e => onChangeState('showDailyChart', e)}
                    />
                    <span>Daily</span>
                </div>

                <div className='switch-block optimization-switch'>
                    <Switch
                        checked={chartState.showOptimizationChart}
                        onChange={e => onChangeState('showOptimizationChart', e)}
                    />
                    <span>Optimization status</span>
                </div>

                <div className='switch-block optimization-switch'>
                    <Switch
                        checked={chartState.selectFourMetrics}
                        onChange={e => onChangeState('selectFourMetrics', e)}
                    />
                    <span>Allow select up to 4 metrics</span>
                </div>
            </div>
        )
    }

    const LegendMenu = () => {
        return (
            <div className='chart-legend'>
                <div className="first-line">
                    <span className="dashed-line">
                        <SVG id='dashed-lines'/>
                    </span>

                    Gathering data
                </div>

                <Fragment>
                    <div className="optimization-line started">
                        <SVG id='optimization-started'/>
                        Optimization started
                    </div>

                    <div className="optimization-line paused">
                        <SVG id='optimization-paused'/>
                        Optimization paused
                    </div>
                </Fragment>
            </div>
        )
    }

    return (
        <div className="chart-settings">
            <Popover
                placement="bottomLeft"
                content={<OptionsMenu/>}
                overlayClassName={'overlay-options-popover'}
                getPopupContainer={(node) => node.parentNode}
                trigger="click"
                visible={visiblePopover === 'options'}
                onVisibleChange={() => {
                    setVisiblePopover(!visiblePopover ? 'options' : undefined)
                }}
            >
                <button>
                    <SVG id={'options-icon'}/>
                    options
                </button>
            </Popover>

            <Popover
                content={<LegendMenu/>}
                placement="bottomLeft"
                trigger="click"
                overlayClassName={'overlay-legend-popover'}
                getPopupContainer={(node) => node.parentNode}
                visible={visiblePopover === 'legend'}
                onVisibleChange={() => {
                    setVisiblePopover(!visiblePopover ? 'legend' : undefined)
                }}
            >
                <button>
                    <SVG id={'legend-icon'}/>
                    legend
                </button>
            </Popover>
        </div>
    )
}

export default React.memo(ChartHeader)