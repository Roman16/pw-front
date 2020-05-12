import React from 'react';
import {Spin} from "antd";

const CancelAccountWindow = ({onOk, onCancel, disableReactivateButtons}) => {
    return (
        <div className="cancel">
            <h3 className="reactivate-title">Do you want to leave?</h3>
            <p className="reactivate-text">
                This action will result in canceling your subscription <br/> plan. We will pause optimization after you
                cancel.
            </p>

            <div className="actions">
                {disableReactivateButtons ?
                    <Spin/>
                    :
                    <>
                        <button className='btn white' onClick={onOk}>I want to cancel</button>
                        <button className='btn default' onClick={onCancel}>Keep my account active</button>
                    </>
                }
            </div>
        </div>
    );
};

export default CancelAccountWindow;
