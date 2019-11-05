import React from "react";
import {toast} from 'react-toastify';
import childIcon from '../../assets/img/icons/child.svg';

const SomeProblemNotification = ({title, description}) => (
    toast.success(
        <div>
            <div className='notification__title'>
                <img src={childIcon} alt=""/>
                {title}
            </div>

            {description && <span className='notification__description'>{description}</span>}
        </div>,
        {
            className: 'some-problem-notification',
            position: "bottom-right",
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        })
);

export default SomeProblemNotification;