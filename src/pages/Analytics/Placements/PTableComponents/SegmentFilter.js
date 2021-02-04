import React, {useState} from "react"
import {Popover} from "antd"

const SegmentFilter = ({segment, onChange}) => {
    const [visible, setVisible] = useState(false)

    const setSegmentHandler = (value) => {
        setVisible(false)
        onChange(value)
    }

    return (
        <Popover
            trigger="click"
            placement="bottomRight"
            getPopupContainer={(node) => node.parentNode}
            destroyTooltipOnHide={true}
            overlayClassName={'popover-segment-filter'}
            visible={visible}
            onVisibleChange={v => setVisible(v)}
            content={<ul>
                <li onClick={() => setSegmentHandler('none')} className={segment === 'none' ? 'active' : ''}>
                    None
                </li>
                <li onClick={() => setSegmentHandler('advertisingType')}
                    className={segment === 'advertisingType' ? 'active' : ''}
                >
                    Advertising Type
                </li>
            </ul>}
        >
            <button
                className={`segment-filter icon-btn ${(segment === 'advertisingType') ? 'active' : ''}`}
                onClick={() => setVisible(prevState => !prevState)}
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
