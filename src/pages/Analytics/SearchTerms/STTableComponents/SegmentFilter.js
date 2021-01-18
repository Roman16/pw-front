import React from "react"
import {Popover} from "antd"

const SegmentFilter = ({segment, onChange}) => {
    const setSegmentHandler = (value) => {
        onChange(value)
    }
    console.log(segment)
    return (
        <Popover
            trigger="click"
            placement="bottomRight"
            getPopupContainer={(node) => node.parentNode}
            destroyTooltipOnHide={true}
            overlayClassName={'popover-segment-filter'}
            content={<ul>
                <li onClick={() => setSegmentHandler('none')} className={segment === 'none' ? 'active' : ''}>
                    None
                </li>
                <li onClick={() => setSegmentHandler('targetings')}
                    className={segment === 'targetings' ? 'active' : ''}
                >
                    Targetings
                </li>
            </ul>}
        >
            <button
                className={`segment-filter icon-btn ${(segment === 'targetings') ? 'active' : ''}`}
            >
                <i className={'btn icon'}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="20"
                              height="20">
                            <rect width="20" height="20" fill="#C4C4C4"/>
                        </mask>
                        <g mask="url(#mask0)">
                            <path d="M19 4L1 4" fill={'none'} stroke-width="2" stroke-linecap="round"/>
                            <path d="M19 10L7 10" fill={'none'} stroke-width="2" stroke-linecap="round"/>
                            <path d="M19 16L7 16" fill={'none'} stroke-width="2" stroke-linecap="round"/>
                        </g>
                    </svg>
                </i>

                segment
            </button>
        </Popover>
    )
}

export default SegmentFilter
