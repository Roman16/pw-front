import {createBrowserHistory} from 'history'
import React, {useState} from "react"
import ReactDOM from "react-dom"
import ConfirmActionPopup from "../components/ModalWindow/ConfirmActionPopup"
import ModalWindow from "../components/ModalWindow/ModalWindow"
import {Checkbox} from "antd"

const getUserConfirmation = (message, callback) => {
    const modal = document.createElement("div")

    let dontShowAgain = false

    document.body.appendChild(modal)

    const withCleanup = answer => {
        ReactDOM.unmountComponentAtNode(modal)
        document.body.removeChild(modal)
        callback(answer)
    }

    const confirmLeave = () => {
        withCleanup(true)

        if (dontShowAgain) localStorage.setItem('dontShowConfirmLeaveZthPage', 'true')
    }

    ReactDOM.render(message === 'zth-settings' ? <ModalWindow
            className={'confirm-leave-zth-page'}
            visible={true}
            footer={false}

            handleCancel={() => withCleanup(false)}
        >
            <h2>Are you sure you want to leave this page?</h2>
            <p>
                Changes you have made will not be saved
            </p>

            <div className="actions">
                <button className="sds-btn white" onClick={() => withCleanup(false)}>No</button>
                <button className="sds-btn default" onClick={confirmLeave}>Yes</button>
            </div>
        </ModalWindow> :
        <ConfirmActionPopup
            className={'confirm-remove-product-window'}
            visible={true}
            title={message === 'campaign-settings' ? 'Leave page?' : 'Leave page?'}
            description={message === 'campaign-settings' ? 'Changes you made are not saved and will be lost.' : 'Changes you made are not saved and will be lost.'}
            handleOk={() => withCleanup(true)}
            handleCancel={() => withCleanup(false)}
        />,
        modal
    )
}

export const history = createBrowserHistory({getUserConfirmation})

let prevLocation = {}
history.listen(location => {
    const pathChanged = prevLocation.pathname !== location.pathname
    const hashChanged = prevLocation.hash !== location.hash
    const userId = localStorage.getItem('userId')

    if (pathChanged || hashChanged) {
        window.scrollTo(0, 0)
        prevLocation = location

        if (userId) {
            window.dataLayer.push({
                'uid': userId
            })
        }
    }
})