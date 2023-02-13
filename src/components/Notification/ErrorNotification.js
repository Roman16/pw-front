import React from "react"
import {toast} from 'react-toastify'

const ErrorNotification = ({title, description, autoClose = 4000}) => (
    toast.error(
        <>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM11.9998 5.00047C12.5521 5.00047 12.9998 5.44818 12.9998 6.00047V14.4005C12.9998 14.9528 12.5521 15.4005 11.9998 15.4005C11.4475 15.4005 10.9998 14.9528 10.9998 14.4005V6.00047C10.9998 5.44818 11.4475 5.00047 11.9998 5.00047ZM10.8004 18.0011C10.8004 17.3383 11.3377 16.8011 12.0004 16.8011C12.6632 16.8011 13.2004 17.3383 13.2004 18.0011C13.2004 18.6638 12.6632 19.2011 12.0004 19.2011C11.3377 19.2011 10.8004 18.6638 10.8004 18.0011Z" fill="#FF5256"/>
            </svg>

            <div className={'notification__body'}>
                <div className='notification__title' dangerouslySetInnerHTML={{__html: title}} />
                {description && <p className='notification__description'>{description}</p>}
            </div>
        </>
        ,
        {
            className: 'error-notification',
            position: "bottom-right",
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            autoClose: autoClose
        })
)

export default ErrorNotification