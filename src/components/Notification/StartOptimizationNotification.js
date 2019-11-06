import React from "react";
import {toast} from 'react-toastify';
import startIcon from '../../assets/img/icons/start.svg';

const StartOptimizationNotification = ({title, description}) => (
    toast.success(
        <div>
            <div className='notification__title'>
                <img src={startIcon} alt=""/>
                {title}
            </div>

            {description && <span className='notification__description'>{description}</span>}
        </div>,
        {
            className: 'start-optimization-notification',
            position: "bottom-right",
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        })
);

export default StartOptimizationNotification;