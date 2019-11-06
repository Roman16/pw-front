import React from "react";
import {toast} from 'react-toastify';
import infoIcon from '../../assets/img/icons/info.svg';

const WarningNotification = ({title, description}) => (
    toast.warn(
        <div>
            <div className='notification__title'>
                <img src={infoIcon} alt=""/>
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