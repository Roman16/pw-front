import React from "react"
import {toast} from 'react-toastify'
import {SVG} from "../../utils/icons"

const SomeProblemNotification = ({title, description}) => (
    toast.success(
        <>
            <SVG id='child'/>
            <div>
                <div className='notification__title' dangerouslySetInnerHTML={{__html: title}}/>
                {description && <p className='notification__description'>{description}</p>}
            </div>
        </>,
        {
            className: 'some-problem-notification',
            position: "bottom-right",
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        })
)

export default SomeProblemNotification