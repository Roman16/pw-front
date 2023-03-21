import React from "react"
import './Header.less'

export const Header = ({title='Rule-Based Optimization', actions}) => <div className="header">
    <h2>
        {title}
    </h2>

    {actions()}
</div>