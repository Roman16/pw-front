import React from "react"
import {SVG} from "../../../../utils/icons"

const WindowHeader = ({onClose}) => {

    return <div className="window-header">
        <h2>Create Campaign</h2>

        <button
            className="btn icon close"
            onClick={onClose}
        >
            <SVG id={'close-window-icon'}/>
        </button>
    </div>

}

export default WindowHeader
