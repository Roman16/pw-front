import React from "react";
import {toast} from 'react-toastify';
import {SVG} from "../../utils/icons";

const SuccessNotification = ({title, description}) => (
    toast.success(
        <div>
            <div className='notification__title'>
                <SVG id='success'/>
                {title}
            </div>

            {description && <span className='notification__description'>{description}</span>}
        </div>,
        {
            className: 'success-notification',
            position: "bottom-right",
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        })
);

export default SuccessNotification;