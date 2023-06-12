import React from "react"
import './Header.less'
import {MarketplaceTimezone} from "../../../AnalyticsV3/components/Header/Header"

export const Header = ({title = 'Rule-Based Optimization', actions, marketplace, timezone = false}) => <div
    className="header">
    <h2>
        {title}
    </h2>

    {actions && actions()}

    {/*{timezone && <MarketplaceTimezone marketplace={marketplace}/>}*/}
</div>