import React from "react"
import {toast} from 'react-toastify'
import {SVG} from "../../utils/icons"

const WarningNotification = ({title, description}) => (
    toast.warn(
        <>
            <SVG id='info'/>
            <div>
                <div className='notification__title' dangerouslySetInnerHTML={{__html: title}}/>
                {description && <p className='notification__description'>{description}</p>}
            </div>
        </>,
        {
            className: 'warning-notification',
            position: "bottom-right",
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        })
)

export default WarningNotification