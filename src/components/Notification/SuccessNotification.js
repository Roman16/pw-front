import React from "react"
import {toast} from 'react-toastify'
import {SVG} from "../../utils/icons"

const SuccessNotification = ({title, description}) => (
    toast.success(
        <>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" fill="#7FD3A1"/>
                <mask id="mask0_20796:64254" maskUnits="userSpaceOnUse" x="5" y="5" width="14" height="14">
                    <rect x="5.5" y="5.5" width="13" height="13" fill="#791313" stroke="#353A3E"/>
                </mask>
                <g >
                    <path d="M6 12.9259L10 17L18 7" stroke="#CCEEDA"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
            </svg>


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