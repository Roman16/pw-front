import React, {Fragment, useRef, useState} from "react"
import {Popover, Slider, Switch} from "antd"
import {SVG} from "../../../../utils/icons"
import {useDispatch} from "react-redux"
import {analyticsActions} from "../../../../actions/analytics.actions"

const ChartHeader = ({chartState, activeMetrics, tooltipOpacity, setVisibleTooltip, onChangeOpacity}) => {
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

                {/*<div className='switch-block optimization-switch'>*/}
                {/*    <Switch*/}
                {/*        checked={chartState.showOptimizationChart}*/}
                {/*        onChange={e => onChangeState('showOptimizationChart', e)}*/}
                {/*    />*/}
                {/*    <span>Optimization status</span>*/}
                {/*</div>*/}

                <div className='switch-block optimization-switch'>
                    <Switch
                        checked={chartState.selectFourMetrics}
                        onChange={e => onChangeState('selectFourMetrics', e)}
                    />
                    <span>Allow select up to 4 metrics</span>
                </div>

                <Slider
                    defaultValue={tooltipOpacity}
                    onAfterChange={onChangeOpacity}
                />
            </div>
        )
    }

    const LegendMenu = () => {
        return (
            <div className='chart-legend'>
                <div className="first-line">
                    <span className={`dashed-line ${chartState.selectFourMetrics ? 'four-metrics' : ''}`}>
                        <svg fill="none" xmlns="http://www.w3.org/2000/svg">
                            {chartState.selectFourMetrics && <>
                                <rect xmlns="http://www.w3.org/2000/svg" width="7" height="3" y="18" fill="#7FD3A1"
                                      rx="1.5" opacity={0.5}/>
                                <rect xmlns="http://www.w3.org/2000/svg" width="7" height="3" x="9" y="18"
                                      fill="#7FD3A1" rx="1.5" opacity={0.5}/>

                                <rect xmlns="http://www.w3.org/2000/svg" width="7" height="3" y="12" fill="#FFAF52"
                                      rx="1.5" opacity={0.5}/>
                                <rect xmlns="http://www.w3.org/2000/svg" width="7" height="3" x="9" y="12"
                                      fill="#FFAF52" rx="1.5" opacity={0.5}/>
                            </>}

                            <rect xmlns="http://www.w3.org/2000/svg" width="7" height="3" y="6" fill="#9464B9" rx="1.5"
                                  opacity={0.5}/>
                                                    <rect xmlns="http://www.w3.org/2000/svg" width="7" height="3" x="9"
                                                          y="6" fill="#9464B9"
                                                          rx="1.5" opacity={0.5}/>

                                                    <rect xmlns="http://www.w3.org/2000/svg" width="7" height="3"
                                                          fill="#FF5256" rx="1.5"
                                                          opacity={0.5}/>
                                                    <rect xmlns="http://www.w3.org/2000/svg" width="7" height="3" x="9"
                                                          fill="#FF5256" rx="1.5"
                                                          opacity={0.5}/>
                                                </svg>
                    </span>

                    Gathering data
                </div>
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
