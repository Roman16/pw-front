import React, {useState} from "react"
import {SVG} from "../../../../utils/icons"
import './Comment.less'

const loremText = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid amet aspernatur atque deleniti deserunt exercitationem expedita labore maiores maxime necessitatibus omnis porro, quisquam saepe sit temporibus ut vel voluptatem.'

export const Comment = ({text = loremText}) => {
    const [visible, setVisible] = useState(false)

    return (<div className={`section-comment ${visible ? 'visible' : ''}`}>
        <div className="comment-header" onClick={() => setVisible(prevState => !prevState)}>
            Analyst's Comment

            <button className="btn icon">
                <SVG id={'right-arrow'}/>
            </button>
        </div>
        <div className="comment-body">
            {text}
        </div>
    </div>)
}