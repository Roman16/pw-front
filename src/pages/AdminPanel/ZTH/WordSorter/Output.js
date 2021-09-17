import React from "react"

const Output = ({phrasesList, onAddPhrase}) => {


    return (<div className={'card output'}>
        <div className="block-header">
            <h3>Output</h3>
            <div className="count">{phrasesList.length}</div>
        </div>

        <ul>
            {phrasesList.map(item => (item.visible && <li key={item.id}>
                {item.keywords.map(keyword => <div
                    key={keyword}
                    onClick={() => onAddPhrase(keyword)}
                >{keyword}</div>)}
            </li>))}
        </ul>
    </div>)
}

export default Output