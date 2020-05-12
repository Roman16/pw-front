import React from 'react';
import {Spin} from "antd";

const Reactivate = ({date, disableReactivateButtons, onOk, onCancel}) => {
    return (
        <div>
            <h3 className="reactivate-title">Account reactivation</h3>
            <p className="reactivate-text">
                This action will lead to subscription reactivation. Please <br/> confirm this action.
            </p>

            <div className="actions">
                {disableReactivateButtons ?
                    <Spin/>
                    :
                    <>
                        <button className='btn white' onClick={onCancel}>Cancel</button>
                        <button className='btn default' onClick={onOk}>Reactivate my account</button>
                    </>
                }
            </div>

        </div>
    );
};

export default Reactivate;
