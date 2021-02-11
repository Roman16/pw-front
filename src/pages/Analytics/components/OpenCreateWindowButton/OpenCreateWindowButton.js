import React from "react"
import {SVG} from "../../../../utils/icons"
import {useDispatch} from "react-redux"
import {analyticsActions} from "../../../../actions/analytics.actions"

const OpenCreateWindowButton = ({title, window}) => {
    const dispatch = useDispatch()

    const openCreateWindowHandler = () => dispatch(analyticsActions.setVisibleCreateWindow({[window]: true}))

    // return (<button
    //     //     className="btn default create-button"
    //     //     onClick={openCreateWindowHandler}
    //     // >
    //     //     <SVG id={'plus-white'}/>
    //     //     {title}
    //     // </button>)

    return ''
}

export default OpenCreateWindowButton
