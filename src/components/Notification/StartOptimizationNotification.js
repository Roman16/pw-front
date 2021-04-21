import React from "react";
import {toast} from 'react-toastify';
import {SVG} from "../../utils/icons";

const StartOptimizationNotification = ({title, description}) => (
    toast.success(
        <div>
            <div className='notification__title'>
                <SVG id='start'/>
                <p dangerouslySetInnerHTML={{__html: title}}/>
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