import React from 'react'
import {Spin} from "antd"

const Reactivate = ({disableReactivateButtons, onOk, onCancel}) => {
    return (
        <div>
            <h2>Account reactivation</h2>
            <p>
                This action will lead to subscription reactivation. Please <br/> confirm this action.
            </p>

            <div className={`actions`}>
                <button
                    className='btn grey'
                    onClick={onCancel}
                    disabled={disableReactivateButtons}
                >
                    Cancel
                </button>

                <button
                    className='btn default'
                    onClick={onOk}
                    disabled={disableReactivateButtons}
                >
                    {disableReactivateButtons && <Spin/>}
                    Reactivate my account
                </button>
            </div>

        </div>
    )
}

export default Reactivate
