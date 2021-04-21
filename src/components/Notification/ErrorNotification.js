import React from "react";
import {toast} from 'react-toastify';
import {SVG} from "../../utils/icons";

const ErrorNotification = ({title, description}) => (
    toast.error(
        <div>
            <div className='notification__title'>
                <SVG id='stop'/>
                <p dangerouslySetInnerHTML={{__html: title}}/>
            </div>

            {description && <span className='notification__description'>{description}</span>}
        </div>,
        {
            className: 'error-notification',
            position: "bottom-right",
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        })
);

export default ErrorNotification;