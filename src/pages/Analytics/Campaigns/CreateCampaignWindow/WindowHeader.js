import React from "react"
import {SVG} from "../../../../utils/icons"

const WindowHeader = ({onClose, title = 'Create Campaign'}) => {

    return <div className="window-header">
        <h2>{title}</h2>

        <button
            className="btn icon close"
            onClick={onClose}
        >
            <SVG id={'close-window-icon'}/>
        </button>
    </div>

}

export default WindowHeader
