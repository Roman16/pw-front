import React from "react";
import {toast} from 'react-toastify';
import stopIcon from '../../assets/img/icons/stop.svg';

const ErrorNotification = ({title, description}) => (
    toast.error(
        <div>
            <div className='notification__title'>
                <img src={stopIcon} alt=""/>
                {title}
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