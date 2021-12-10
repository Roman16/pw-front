import React from "react"
import {Popover} from "antd"
import {SVG} from "../../../../utils/icons"
import {chartAreaKeys} from "./Chart"

const CartLegend = () => {

    return (<div className="cart-legend"><Popover
            content={<LegendMenu/>}
            placement="bottomLeft"
            trigger="click"
            overlayClassName={'overlay-legend-popover'}
            getPopupContainer={(node) => node.parentNode}
        >
            <button className={'legend-button'}>
                <SVG id={'legend-icon'}/>
                legend
            </button>
        </Popover>
        </div>
    )
}

const LegendMenu = () => {
    return (
        <ul className='chart-legend'>
            {Object.values(chartAreaKeys).map(item => <li>{item}</li>)}
        </ul>
    )
}

export default CartLegend