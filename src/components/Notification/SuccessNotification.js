import React from "react";
import {toast} from 'react-toastify';
import successIcon from '../../assets/img/icons/success.svg';

const SuccessNotification = ({title, description}) => (
    toast.success(
        <div>
            <div className='notification__title'>
                <img src={successIcon} alt=""/>
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