import React from "react"

const Phrases = ({phrasesList}) => {

    return (<div className={'card phrases'}>
        <div className="block-header">
            <h3>Negative Phrases</h3>

            <div className="count">0</div>
        </div>

        <ul>
            {phrasesList.map(phrase => <li>{phrase}</li>)}
        </ul>

    </div>)
}

export default Phrases