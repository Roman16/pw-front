import React from "react"
import {toast} from 'react-toastify'
import {SVG} from "../../utils/icons"

const SuccessNotification = ({title, description}) => (
    toast.success(
        <>
            <SVG id='success'/>
            <div>
                <div className='notification__title' dangerouslySetInnerHTML={{__html: title}}/>
                {description && <p className='notification__description'>{description}</p>}
            </div>
        </>,
        {
            className: 'success-notification',
            position: "bottom-right",
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        })
)

export default SuccessNotification