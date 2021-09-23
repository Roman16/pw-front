import React from "react"
import {SVG} from "../../../../utils/icons"

const Phrases = ({phrasesList, onRemoveItem, onRemoveWithExacts, onCopy}) => {
    return (<div className={'card phrases'}>
        <div className="block-header">
            <h3>Negative Phrases</h3>

            <div className="count">{phrasesList.length}</div>

            <button className="btn default copy" onClick={onCopy}>copy</button>
        </div>

        <ul>
            {phrasesList.map((item, index) => <li>
                {item}

                <button className="btn icon remove-item" title={'Remove item'} onClick={() => onRemoveItem(index)}>
                    <SVG id={'close-window-icon'}/>
                </button>

                <button className="btn icon remove-all" title={'Remove with exacts'}
                        onClick={() => onRemoveWithExacts(item)}>
                    <SVG id={'remove'}/>
                </button>
            </li>)}
        </ul>

    </div>)
}

export default Phrases