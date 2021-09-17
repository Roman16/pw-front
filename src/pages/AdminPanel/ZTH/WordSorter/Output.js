import React from "react"
import {Checkbox} from "antd"

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
                >

                    {keyword}
                </div>)}

                <Checkbox/>
            </li>))}
        </ul>
    </div>)
}

export default Output