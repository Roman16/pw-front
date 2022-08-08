import React, {useEffect} from "react"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"

export const SomethingWrong = ({visible}) => {
    const accountContentBlock = document.querySelector('.account-content')

    useEffect(() => {
        if (accountContentBlock) {
            if (visible) accountContentBlock.style.overflow = 'hidden'
            else accountContentBlock.style.overflow = 'auto'
        }
    }, [visible])

    return <ModalWindow
        className="connect-amazon-account-window"
        wrapClassName="connect-amazon-account-window-wrap"
        visible={visible}
        footer={false}
        container={false}
        maskStyle={{
            width: '100%',
            right: 'inherit',
            left: 'inherit',
            top: '0',
            zIndex: '11'
        }}
        getContainer={() => accountContentBlock}
    >
        <h2>Unexpected error occured</h2>
        <p>Unexpected error occured and we can't display Subscription information. Please try again later. If issue
            persists, contact support.</p>

        <button className="btn default" onClick={() => window.Intercom('show')}>
            Contact Support
        </button>
    </ModalWindow>

}