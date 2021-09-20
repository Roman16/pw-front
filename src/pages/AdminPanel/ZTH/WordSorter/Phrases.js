import React from "react"

const Phrases = ({phrasesList, onCopy}) => {

    return (<div className={'card phrases'}>
        <div className="block-header">
            <h3>Negative Phrases</h3>

            <div className="count">{phrasesList.length}</div>

            <button className="btn default copy" onClick={onCopy}>copy</button>
        </div>

        <ul>
            {phrasesList.map(phrase => <li>{phrase}</li>)}
        </ul>

    </div>)
}

export default Phrases