import React, {Fragment} from "react";
import warningImage from '../../../../assets/img/warning-image.svg';


const RescanWindow = ({onClose, onConfirm}) => (
    <Fragment>
        <img src={warningImage} alt=""/>

        <h2>Are you sure?</h2>

        <span>The current scanning results will be lost</span>

        <div className='actions'>
            <button className='btn white' onClick={onClose}>
                Cancel
            </button>

            <button className='btn default' onClick={onConfirm}>
                Yes, I’m sure
            </button>
        </div>
    </Fragment>
);

export default RescanWindow;