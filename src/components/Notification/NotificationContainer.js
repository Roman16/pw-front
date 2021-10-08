import React from "react"
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import './Notification.less'

const NotificationContainer = () => (
    <ToastContainer
        position="bottom-right"
        autoClose={400000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
        closeButton={<CloseButton/>}
    />

)

const CloseButton = ({closeToast}) => <i className={'close-button'} onClick={closeToast}>
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0" maskUnits="userSpaceOnUse" x="0" y="0" width="12" height="12">
            <path d="M0 0H12V12H0V0Z" fill="#C4C4C4"/>
        </mask>
        <g mask="url(#mask0)">
            <path d="M1.2002 1.19922L10.8002 10.7992M1.2002 10.7992L10.8002 1.19922" stroke-width="2"
                  stroke-linecap="round"/>
        </g>
    </svg>
</i>


export default NotificationContainer