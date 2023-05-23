import React from "react"
import './SectionName.less'

export const SectionName = ({name, description}) => <div className="section-name">
    <h2>{name}</h2>
    <p>{description}</p>
</div>