import React from "react"
import {SVG} from "../../../../utils/icons"
import {AttributionWindowSelect} from "../../../AnalyticsV3/components/Header/AttributionWindow"

export const Header = ({attributionWindow, onChange}) =>
    <div className="header">
        <div className="location">
            <SVG id={'analytics-icon'}/>

            Monthly Reports
        </div>


        <AttributionWindowSelect
            value={attributionWindow}
            onChange={onChange}
        />
    </div>