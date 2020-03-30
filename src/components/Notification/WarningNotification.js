import React from "react";
import {toast} from 'react-toastify';
import {SVG} from "../../utils/icons";

const WarningNotification = ({title, description}) => (
    toast.warn(
        <div>
            <div className='notification__title'>
                <SVG id='info'/>
                {title}
            </div>

            {description && <span className='notification__description'>{description}</span>}
        </div>,
        {
            className: 'warning-notification',
            position: "bottom-right",
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        })
);

export default WarningNotification;