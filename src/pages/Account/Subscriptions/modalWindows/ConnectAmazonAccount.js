import React, {useEffect} from "react"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import {Link} from "react-router-dom"

export const ConnectAmazonAccount = ({visible}) => {
    const accountContentBlock = document.querySelector('.account-content')

    useEffect(() => {
        if(visible) accountContentBlock.style.overflow = 'hidden'
        else accountContentBlock.style.overflow = 'auto'
    }, [visible])

    return (
        <ModalWindow
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
            <h2>Amazon account connection required</h2>
            <p>Please connect Amazon account first to start using Sponsoreds software.</p>

            <Link to={'/connect-amazon-account'} className={'btn default'}>Connect Amazon Account</Link>
        </ModalWindow>
    )
}