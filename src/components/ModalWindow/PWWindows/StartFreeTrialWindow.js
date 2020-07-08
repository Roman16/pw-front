import React, {useState} from "react";
import ModalWindow from "../ModalWindow";

import img from '../../../assets/img/start-free-trial-image.svg';
import {userService} from "../../../services/user.services";
import {Spin} from "antd";
import {notification} from "../../Notification";

const StartFreeTrialWindow = ({visible, onClose}) => {
    const [processing, setProcessing] = useState(false);

    const handleOk = async () => {
        setProcessing(true);

        try {
            await userService.startFreeTrial();
            notification.success({title: 'Success!'})
            onClose();
        } catch (e) {
            console.log(e);
        }

        setProcessing(false);
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <ModalWindow
            className={'start-free-trial-window'}
            visible={visible}
            footer={false}
            handleCancel={handleCancel}
        >

            <div className="image">
                <img src={img} alt=""/>
            </div>

            <div className={'description'}>
                <h3>Hello!</h3>

                <p>
                    In order to start the 14-days free trial please click this <br/> button below.
                </p>

                <button className={'btn white'} onClick={handleOk} disabled={processing}>
                    Start My Free Trial

                    {processing && <Spin size={'small'}/>}
                </button>
            </div>

        </ModalWindow>
    )
};

export default StartFreeTrialWindow;