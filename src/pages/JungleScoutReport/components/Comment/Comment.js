import React, {useState} from "react"
import {SVG} from "../../../../utils/icons"
import './Comment.less'

export const Comment = ({text, editable, onChange}) => {
    const [visible, setVisible] = useState(false)

    return (<div className={`section-comment ${visible ? 'visible' : ''}`}>
        <div className="comment-header" onClick={() => setVisible(prevState => !prevState)}>
            Analyst's Comment

            <button className="btn icon">
                <SVG id={'right-arrow'}/>
            </button>
        </div>

        <div className="comment-body form-group">
            {editable ? <textarea
                value={text}
                onChange={({target: {value}}) => onChange(value)}
            /> : (text || "No comments")}
        </div>
    </div>)
}