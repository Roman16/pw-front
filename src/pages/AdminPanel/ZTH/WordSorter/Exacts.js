import React from "react"
import {AmazonLink, TranslateLink} from "./Output"
import {SVG} from "../../../../utils/icons"

const Exacts = ({phrasesList, onCopy}) => {

    return (<div className="card exacts">
        <div className="block-header">
            <h3>Negative Exacts</h3>

            <div className="count">{phrasesList.length}</div>

            <button className="btn default copy" onClick={onCopy}>copy</button>
        </div>

        <ul>
            {phrasesList.map(phrase => <li>
                <AmazonLink keyword={phrase}/>
                <TranslateLink keyword={phrase}/>

                {phrase}

                <button className="btn icon remove-item">
                    <SVG id={'close-window-icon'}/>
                </button>
            </li>)}
        </ul>
    </div>)
}

export default Exacts