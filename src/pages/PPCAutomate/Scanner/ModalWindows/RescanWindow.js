import React, {Fragment} from "react";
import warningImage from '../../../../assets/img/warning-image.svg';


const RescanWindow = ({handleCancel, handleOk}) => (
    <Fragment>
        <img src={warningImage} alt=""/>

        <h2>Are you sure?</h2>

        <span>The current scanning results will be lost</span>

        <div className='actions'>
            <button className='btn white' onClick={handleCancel}>
                Cancel
            </button>

            <button className='btn default' onClick={handleOk}>
                Yes, I’m sure
            </button>
        </div>
    </Fragment>
);

export default RescanWindow;