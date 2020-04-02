import React, {Fragment} from "react";
import {SVG} from "../../../../utils/icons";


const RescanWindow = ({onClose, onConfirm}) => (
    <Fragment>
        <SVG id={'scanner-warning'}/>

        <h2>Are you sure?</h2>

        <p>The current scanning results will be lost</p>

        <div className='actions'>
            <button className='btn white' onClick={onConfirm}>
                Yes, I’m sure
            </button>

            <button className='btn default' onClick={onClose}>
                Cancel
            </button>

        </div>
    </Fragment>
);

export default RescanWindow;