import React from "react"
import {toast} from 'react-toastify'

const InformationNotification = ({title, description}) => (
    toast.success(
        <>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" fill="#6959AB"/>
                <path
                    d="M10.6282 6.17123C10.6282 5.41381 11.2422 4.7998 11.9996 4.7998C12.757 4.7998 13.371 5.41381 13.371 6.17123C13.371 6.92865 12.757 7.54266 11.9996 7.54266C11.2422 7.54266 10.6282 6.92865 10.6282 6.17123ZM15.0853 17.8284C15.0853 18.2071 14.7783 18.5141 14.3996 18.5141H10.2853C9.90661 18.5141 9.59961 18.2071 9.59961 17.8284C9.59961 17.4497 9.90661 17.1427 10.2853 17.1427C10.664 17.1427 10.971 16.8357 10.971 16.4569V10.9712C10.971 10.5925 10.664 10.2855 10.2853 10.2855C9.90661 10.2855 9.59961 9.97851 9.59961 9.5998C9.59961 9.22109 9.90661 8.91409 10.2853 8.91409H10.971H13.0282C13.4069 8.91409 13.7139 9.22109 13.7139 9.5998V16.4569C13.7139 16.8357 14.0209 17.1427 14.3996 17.1427C14.7783 17.1427 15.0853 17.4497 15.0853 17.8284Z"
                    fill="#D2CDE6"/>
            </svg>

            <div>
                <div className='notification__title' dangerouslySetInnerHTML={{__html: title}}/>
                {description && <p className='notification__description'>{description}</p>}
            </div>
        </>,
        {
            className: 'information-notification',
            position: "bottom-right",
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            autoClose: 20000,
        })
)

export default InformationNotification