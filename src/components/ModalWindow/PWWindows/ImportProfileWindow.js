import React from "react"
import ModalWindow from "../ModalWindow"

export const ImportProfileWindow = ({visible, container, firstName, lastName}) => (
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
        <h1>📂</h1>

        <h2>Welcome {firstName} {lastName}!</h2>

        <p>
            We are currently syncing data from your Amazon Account with our system. This may take up to 24 hours. To
            access next data imports must be completed:
        </p>
    </ModalWindow>)