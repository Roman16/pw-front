import React from "react";
import {toast} from 'react-toastify';
import {SVG} from "../../utils/icons";

const SomeProblemNotification = ({title, description}) => (
    toast.success(
        <div>
            <div className='notification__title'>
                <SVG id='child'/>
                <p dangerouslySetInnerHTML={{__html: title}}/>
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