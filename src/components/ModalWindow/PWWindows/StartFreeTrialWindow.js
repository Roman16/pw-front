import React from "react";
import ModalWindow from "../ModalWindow";

import img from '../../../assets/img/start-free-trial-image.svg';

const StartFreeTrialWindow = ({visible, onClose}) => {
    const handleOk = () => {

    };

    const handleCancel = () => {

    };

    return (
        <ModalWindow
            className={'start-free-trial-window'}
            visible={visible}
            footer={false}
            handleOk={handleOk}
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

                <button className={'btn white'}>
                    Start My Free Trial
                </button>
            </div>

        </ModalWindow>
    )
};

export default StartFreeTrialWindow;