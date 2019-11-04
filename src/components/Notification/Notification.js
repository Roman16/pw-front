import React from "react";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './Notification.less';

const Notification = () => (
    <ToastContainer
        position="bottom-right"
        autoClose={300000000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
    />

);

export default Notification;