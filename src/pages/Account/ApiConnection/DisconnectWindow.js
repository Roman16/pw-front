import React, {useState} from "react";
import {Input} from "antd";
import {notification} from "../../../components/Notification";

const DisconnectWindow = ({handleCancel, onDisconnect}) => {
    const [inputValue, setInputValue] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();

        if (inputValue.toLowerCase() === 'disconnect') {
            onDisconnect();
            setInputValue('');
        } else {
            notification.error({title: 'You typed incorrect value'})
        }
    }

    return (
        <>
            <h2>Are you sure?</h2>
            <p>
                This action will delete the connection between Profit Whales and your Seller Central account, which will
                lead to a stop of the advertising optimization process.
            </p>

            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="">Type DISCONNECT to confirm operation</label>
                    <Input
                        value={inputValue}
                        required
                        placeholder={'Type here'}
                        onChange={e => setInputValue(e.target.value)}
                    />
                </div>

                <div className="buttons">
                    <button type={'button'} className={'btn white'} onClick={handleCancel}>Cancel</button>
                    <button className={'btn default'}>Disconnect</button>
                </div>
            </form>
        </>
    )
};

export default DisconnectWindow;