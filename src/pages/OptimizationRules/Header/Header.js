import React from "react"
import './Header.less'
import {SVG} from "../../../utils/icons"

export const Header = ({onCreate}) => <div className="header">
    Rule-Based Optimization

    <button className="btn default" onClick={onCreate}>
        <SVG id={'plus-icon'}/>
        Create Rule
    </button>
</div>