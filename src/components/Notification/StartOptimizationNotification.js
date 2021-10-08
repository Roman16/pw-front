import React from "react"
import {toast} from 'react-toastify'
import {SVG} from "../../utils/icons"

const StartOptimizationNotification = ({title, description}) => (
    toast.success(
        <>
            <SVG id='start'/>
            <div>
                <div className='notification__title' dangerouslySetInnerHTML={{__html: title}}/>
                {description && <p className='notification__description'>{description}</p>}
            </div>
        </>,
        {
            className: 'start-optimization-notification',
            position: "bottom-right",
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        })
)

export default StartOptimizationNotification