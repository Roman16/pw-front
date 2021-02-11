import React from "react"
import NegativeTargetingsList from "./NegativeTargetingsList/NegativeTargetingsList"
import CreateNegativeTargetingsWindow from "./CreateNegativeTargetingsWindow/CreateNegativeTargetingsWindow"

const NegativeTargetings = () => {
    const location = 'negative-targetings'

    return (
        <div className={'negative-targetings-workplace'}>
            <NegativeTargetingsList
                location={location}
            />

            <CreateNegativeTargetingsWindow/>
        </div>
    )
}

export default NegativeTargetings
