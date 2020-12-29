import React from "react"
import NegativeTargetingsList from "./NegativeTargetingsList/NegativeTargetingsList"

const NegativeTargetings = () => {
    const location = 'negative-targetings'

    return (
        <div className={'negative-targetings-workplace'}>
            <NegativeTargetingsList
                location={location}
            />
        </div>
    )
}

export default NegativeTargetings
