import React from "react"
import ModalWindow from "../ModalWindow"

export const CreateAdsAccount = ({visible, container}) => (
    <ModalWindow
        className={'amazon-loading-window profile-import'}
        wrapClassName="import-status-window-wrap"
        visible={visible}
        container={!container}
        getContainer={container}
        maskStyle={container && {
            width: '100%',
            right: 'inherit',
            left: 'inherit',
            top: '0',
            zIndex: '11'
        }}
    >
        <h2>Welcome!</h2>

        <p>
            - profile id = null <br/>
            - profile import = true
        </p>
    </ModalWindow>)