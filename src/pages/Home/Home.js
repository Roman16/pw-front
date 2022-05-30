import React, {useEffect, useState} from "react"
import './Home.less'
import {Link} from "react-router-dom"
import {useSelector} from "react-redux"

const services = [
    {
        title: 'Zero to Hero',
        key: 'zth',
        description: 'An AI-powered tool to create highly effective Amazon campaigns in a matter of minutes',
        icon: () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_21048:66546" maskUnits="userSpaceOnUse" x="0" y="0" width="22" height="22">
                <rect width="22" height="22" fill="#C4C4C4"/>
            </mask>
            <g>
                <path
                    d="M11 3.16892C10.6205 3.16892 10.3125 2.86092 10.3125 2.48142V0.6875C10.3125 0.308 10.6205 0 11 0C11.3795 0 11.6875 0.308 11.6875 0.6875V2.48142C11.6875 2.86092 11.3795 3.16892 11 3.16892Z"
                    fill="#6959AB"/>
                <path
                    d="M17.0235 5.66413C16.8475 5.66413 16.6715 5.59721 16.5376 5.46246C16.269 5.19388 16.269 4.75846 16.5376 4.48988L17.8063 3.22121C18.0749 2.95263 18.5103 2.95263 18.7789 3.22121C19.0475 3.4898 19.0475 3.92521 18.7789 4.1938L17.5102 5.46246C17.3755 5.5963 17.2004 5.66413 17.0235 5.66413V5.66413Z"
                    fill="#6959AB"/>
                <path
                    d="M21.3125 11.6875H19.5195C19.14 11.6875 18.832 11.3795 18.832 11C18.832 10.6205 19.14 10.3125 19.5195 10.3125H21.3125C21.692 10.3125 22 10.6205 22 11C22 11.3795 21.692 11.6875 21.3125 11.6875Z"
                    fill="#6959AB"/>
                <path
                    d="M18.2921 18.9796C18.1161 18.9796 17.9401 18.9126 17.8063 18.7779L16.5376 17.5092C16.269 17.2406 16.269 16.8052 16.5376 16.5366C16.8062 16.2681 17.2416 16.2681 17.5102 16.5366L18.7789 17.8053C19.0475 18.0739 19.0475 18.5093 18.7789 18.7779C18.6441 18.9126 18.4681 18.9796 18.2921 18.9796Z"
                    fill="#6959AB"/>
                <path
                    d="M11 22C10.6205 22 10.3125 21.692 10.3125 21.3125V19.5186C10.3125 19.1391 10.6205 18.8311 11 18.8311C11.3795 18.8311 11.6875 19.1391 11.6875 19.5186V21.3125C11.6875 21.692 11.3795 22 11 22Z"
                    fill="#6959AB"/>
                <path
                    d="M3.7079 18.9796C3.5319 18.9796 3.3559 18.9126 3.22207 18.7779C2.95348 18.5093 2.95348 18.0739 3.22207 17.8053L4.49073 16.5366C4.75932 16.2681 5.19473 16.2681 5.46332 16.5366C5.7319 16.8052 5.7319 17.2406 5.46332 17.5092L4.19465 18.7779C4.0599 18.9126 3.8839 18.9796 3.7079 18.9796V18.9796Z"
                    fill="#6959AB"/>
                <path
                    d="M2.4805 11.6875H0.6875C0.308 11.6875 0 11.3795 0 11C0 10.6205 0.308 10.3125 0.6875 10.3125H2.4805C2.86 10.3125 3.168 10.6205 3.168 11C3.168 11.3795 2.86 11.6875 2.4805 11.6875Z"
                    fill="#6959AB"/>
                <path
                    d="M4.97657 5.66413C4.80057 5.66413 4.62457 5.59721 4.49073 5.46246L3.22207 4.1938C2.95348 3.92521 2.95348 3.4898 3.22207 3.22121C3.49065 2.95263 3.92607 2.95263 4.19465 3.22121L5.46332 4.48988C5.7319 4.75846 5.7319 5.19388 5.46332 5.46246C5.32765 5.5963 5.15257 5.66413 4.97657 5.66413V5.66413Z"
                    fill="#6959AB"/>
                <path
                    d="M9.92105 18.3333C9.84221 18.3333 9.76246 18.3196 9.68546 18.2921C9.38205 18.1812 9.19688 17.875 9.23996 17.556L9.98705 11.9167H7.10413C6.84563 11.9167 6.60821 11.7709 6.49088 11.5399C6.37355 11.3089 6.39646 11.0312 6.54955 10.8231L11.5912 3.94808C11.7791 3.69049 12.1201 3.59516 12.4125 3.72074C12.7059 3.84449 12.8764 4.15341 12.8241 4.46691L12.0413 9.16666H14.8958C15.147 9.16666 15.378 9.30324 15.499 9.52416C15.619 9.74416 15.6099 10.0127 15.4751 10.2245L10.5004 18.0162C10.3711 18.2187 10.1502 18.3333 9.92105 18.3333V18.3333Z"
                    fill="#6959AB"/>
            </g>
        </svg>,
        link: '/zero-to-hero/campaign'
    },
    {
        title: 'PPC Automation',
        key: 'automation',
        description: 'A PPC automation tool powered by AI to optimize your Amazon campaigns and reach your Advertising goals',
        icon: () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_21048:66604" maskUnits="userSpaceOnUse" x="0" y="0" width="22"
                  height="22">
                <rect width="22" height="22" fill="#C4C4C4"/>
            </mask>
            <g>
                <path
                    d="M19.9897 10.8948C19.9897 9.09597 19.4563 7.33755 18.4569 5.84188C17.4575 4.34622 16.0371 3.1805 14.3752 2.49212C12.7133 1.80374 10.8846 1.62363 9.12035 1.97456C7.3561 2.32549 5.73553 3.19171 4.46357 4.46366C3.19162 5.73562 2.3254 7.35619 1.97447 9.12044C1.62354 10.8847 1.80365 12.7134 2.49203 14.3753C3.1804 16.0372 4.34613 17.4576 5.84179 18.457C7.33745 19.4564 9.09588 19.9898 10.8947 19.9898"
                    stroke="#6959AB" stroke-width="2" stroke-linecap="round"/>
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M14.7426 12.1357C14.8686 11.7447 14.9367 11.3277 14.9367 10.8948C14.9367 8.6623 13.1269 6.85254 10.8944 6.85254C8.66199 6.85254 6.85223 8.6623 6.85223 10.8948C6.85223 13.1272 8.66199 14.937 10.8944 14.937C11.3271 14.937 11.744 14.869 12.1348 14.7431L14.3905 20.6845C14.4251 20.7753 14.4859 20.8538 14.5651 20.91C14.6444 20.9662 14.7385 20.9977 14.8356 21.0004H14.8503C14.9438 20.9994 15.0349 20.9718 15.1132 20.9207C15.1915 20.8697 15.2535 20.7974 15.2922 20.7123L16.7649 17.421C16.9866 17.0204 17.1532 16.8931 17.4848 16.7451L20.7101 15.2934C20.7986 15.2537 20.8734 15.1885 20.9249 15.1063C20.9765 15.024 21.0025 14.9284 20.9997 14.8313C20.9969 14.7343 20.9654 14.6403 20.9092 14.5611C20.853 14.482 20.7746 14.4213 20.6839 14.3867L20.6823 14.3916L14.7426 12.1357ZM14.7426 12.1357L11.5597 10.9269C11.4712 10.8932 11.3749 10.8859 11.2824 10.9057C11.1899 10.9256 11.1051 10.9717 11.0382 11.0387C10.9713 11.1056 10.9251 11.1904 10.9053 11.2829C10.8855 11.3755 10.8928 11.4718 10.9264 11.5602L12.1348 14.7431C13.3694 14.3455 14.3448 13.3703 14.7426 12.1357Z"
                      fill="#6959AB"/>
            </g>
        </svg>
        ,
        link: '/ppc/automation'
    },
    {
        title: 'Analytics',
        key: 'analytics',
        description: 'Clear and easy to use ad analytics dashboard, with all the data and insights at your fingertips',
        icon: () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_21048:66567" maskUnits="userSpaceOnUse" x="0" y="0" width="22"
                  height="22">
                <rect width="22" height="22" fill="#C4C4C4"/>
            </mask>
            <g>
                <path
                    d="M20.002 1H14.3302C13.7881 1 13.3486 1.43947 13.3486 1.98158C13.3486 2.52368 13.7881 2.96315 14.3302 2.96315H17.5935L12.4238 8.04771C12.3703 8.10044 12.3068 8.14227 12.2369 8.17082C12.167 8.19936 12.092 8.21406 12.0163 8.21406C11.9406 8.21406 11.8656 8.19936 11.7957 8.17082C11.7257 8.14227 11.6622 8.10044 11.6088 8.04771L9.87224 6.33977C9.38139 5.85785 8.71617 5.58718 8.02261 5.58718C7.32905 5.58718 6.66383 5.85785 6.17298 6.33977L1.71662 10.7256C1.32274 11.1132 1.32284 11.7484 1.71685 12.1359C2.10179 12.5145 2.71923 12.5145 3.10417 12.1359L7.58682 7.72706C7.70285 7.61298 7.8602 7.54889 8.02427 7.54889C8.18834 7.54889 8.3457 7.61298 8.46173 7.72706L10.1983 9.435C10.6809 9.90833 11.3347 10.1741 12.0163 10.1741C12.6979 10.1741 13.3517 9.90833 13.8343 9.435L19.004 4.35044V7.52741C19.004 8.07859 19.4508 8.52541 20.002 8.52541C20.5531 8.52541 21 8.07859 21 7.52741V1.98158C21 1.72125 20.8948 1.47158 20.7077 1.2875C20.5205 1.10342 20.2667 1 20.002 1Z"
                    fill="#6959AB"/>
                <path
                    d="M2.91919 15.8276C2.36133 15.8276 1.90909 16.2798 1.90909 16.8377V18.5862C1.90909 19.2264 2.1574 19.8403 2.59941 20.293C3.04141 20.7457 3.6409 21 4.26599 21H17.734C18.3591 21 18.9586 20.7457 19.4006 20.293C19.8426 19.8403 20.0909 19.2264 20.0909 18.5862V12.0101C20.0909 11.4522 19.6386 11 19.0808 11C18.5229 11 18.0707 11.4522 18.0707 12.0101V18.5862C18.0707 18.6776 18.0352 18.7654 17.9721 18.83C17.9089 18.8947 17.8233 18.931 17.734 18.931H14.7037V14.7687C14.7037 14.2109 14.2514 13.7586 13.6936 13.7586C13.1357 13.7586 12.6835 14.2109 12.6835 14.7687V18.931H9.31648V13.3894C9.31648 12.8315 8.86425 12.3793 8.30638 12.3793C7.74852 12.3793 7.29629 12.8315 7.29629 13.3894V18.931H4.26599C4.17669 18.931 4.09105 18.8947 4.0279 18.83C3.96476 18.7654 3.92929 18.6776 3.92929 18.5862V16.8377C3.92929 16.2798 3.47705 15.8276 2.91919 15.8276Z"
                    fill="#6959AB"/>
            </g>
        </svg>,
        link: '/analytics/products/regular'
    },
    {
        title: 'PPC Audit',
        key: 'scanner',
        description: 'Get the in-depth scanning of your PPC campaigns.',
        icon: () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g>
                <path d="M6 3C6.55228 3 7 2.55228 7 2C7 1.44772 6.55228 1 6 1V3ZM15 13C15 12.4477 14.5523 12 14 12C13.4477 12 13 12.4477 13 13H15ZM13 18H2V20H13V18ZM2 18V3H0V18H2ZM2 3H6V1H2V3ZM13 13V18H15V13H13ZM2 18H2H0C0 19.1046 0.89543 20 2 20V18ZM13 20C14.1046 20 15 19.1046 15 18H13V20ZM2 3V3V1C0.895431 1 0 1.89543 0 3H2Z" fill="#6959AB"/>
                <path d="M5 10.5C4.44772 10.5 4 10.9477 4 11.5C4 12.0523 4.44772 12.5 5 12.5V10.5ZM10 12.5C10.5523 12.5 11 12.0523 11 11.5C11 10.9477 10.5523 10.5 10 10.5V12.5ZM5 12.5H10V10.5H5V12.5Z" fill="#6959AB"/>
                <path d="M5 14C4.44772 14 4 14.4477 4 15C4 15.5523 4.44772 16 5 16V14ZM10 16C10.5523 16 11 15.5523 11 15C11 14.4477 10.5523 14 10 14V16ZM5 16H10V14H5V16Z" fill="#6959AB"/>
                <path d="M15 8.06476C16.0337 7.37283 16.7143 6.19446 16.7143 4.85714C16.7143 2.7269 14.9874 1 12.8571 1C10.7269 1 9 2.7269 9 4.85714C9 6.98738 10.7269 8.71429 12.8571 8.71429C13.6501 8.71429 14.3871 8.47503 15 8.06476ZM15 8.06476L18.4286 13" stroke="#6959AB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
        </svg>,
        link: '/ppc-audit'
    },
    {
        title: 'Dayparting',
        key: 'dayparting',
        description: 'Ad delivery management tool and smart analytics let you analyze when is the best time to reach your audience and control working hours for your ads to utilize every cent of your investment',
        icon: () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_21048:66747" maskUnits="userSpaceOnUse" x="0" y="0" width="22"
                  height="22">
                <rect width="22" height="22" fill="#C4C4C4"/>
            </mask>
            <g>
                <circle cx="11" cy="11" r="6" stroke="#6959AB" stroke-width="2"/>
                <circle cx="13" cy="9" r="3" fill="#6959AB" stroke="#6959AB" stroke-width="2"/>
                <path d="M11 1L11 2" stroke="#6959AB" stroke-width="2" stroke-linecap="round"/>
                <path d="M11 20L11 21" stroke="#6959AB" stroke-width="2" stroke-linecap="round"/>
                <path d="M20 11H21" stroke="#6959AB" stroke-width="2" stroke-linecap="round"/>
                <path d="M1 11H2" stroke="#6959AB" stroke-width="2" stroke-linecap="round"/>
                <path
                    d="M3.49928 3.99975L4.20638 4.70685M17.2922 17.7926L17.9993 18.4997M4.91405 17.7928L4.20695 18.4999M18.5 3.99975L17.7929 4.70685"
                    stroke="#6959AB" stroke-width="2" stroke-linecap="round"/>
            </g>
        </svg>,
        link: '/ppc/dayparting'
    },

]

const Home = () => {
    const [isAdmin, setAdminStatus] = useState(false),
        [isAgencyUser, setAgencyUser] = useState(false)

    const {user} = useSelector(state => ({
        user: state.user,
        notFirstEntry: state.user.notFirstEntry,
    }))


    useEffect(() => {
        if (user.user.id === 714) setAdminStatus(true)
        else setAdminStatus(false)

        if (user.user.is_agency_client) setAgencyUser(true)
        else setAgencyUser(false)
    }, [user])

    const buttonText = (i) => {
        if (isAdmin ? false : isAgencyUser ? i.key === 'zth' : false) return 'Coming Soon'
        else return 'Get Started'
    }


    return (
        <div className="home-page">
            <h2>
                Welcome to <SponsoredsTitle/>
            </h2>

            <ul>
                {services.map(i => <li>
                    <h3>
                        {i.icon()}
                        {i.title}
                    </h3>

                    <p>{i.description}</p>

                    <Link
                        to={i.link}
                        className={'btn default'}
                        disabled={isAdmin ? false : isAgencyUser ? i.key === 'zth' : false}
                    >
                        {buttonText(i)}
                    </Link>
                </li>)}
            </ul>
        </div>
    )
}


const SponsoredsTitle = () => <svg xmlns="http://www.w3.org/2000/svg"
                                   viewBox="0 0 2000 393">
    <path className="cls-1"
          d="M412.7,277.82a134.34,134.34,0,0,1-36.34-4.91q-17.39-5.15-28-13.18l12.41-27.26a84.2,84.2,0,0,0,24.15,11.84,91.54,91.54,0,0,0,28,4.47q15.57,0,23-4.47,7.46-4.68,7.45-12.28a11.16,11.16,0,0,0-4.51-9.16,30.91,30.91,0,0,0-11.29-6q-6.76-2.24-18.51-4.92a259.45,259.45,0,0,1-29.56-8.49,48.87,48.87,0,0,1-19.87-13.63q-8.11-9.37-8.12-25A42.66,42.66,0,0,1,359,140.21q7.44-11.18,22.34-17.65,15.12-6.48,36.79-6.48a122.26,122.26,0,0,1,29.57,3.58A87.68,87.68,0,0,1,473,129.93l-11.28,27.48q-21.9-12.28-43.79-12.29-15.36,0-22.8,4.92-7.23,4.92-7.22,13t8.35,12.06q8.58,3.8,26,7.6a259.69,259.69,0,0,1,29.56,8.48,48.08,48.08,0,0,1,19.64,13.41q8.36,9.15,8.35,24.8a42.52,42.52,0,0,1-7.67,24.57q-7.46,11-22.57,17.43T412.7,277.82Z"/>
    <path className="cls-1"
          d="M573.11,118.76q21,0,36.34,6.93,15.57,6.93,23.93,19.66t8.35,30.16q0,17.19-8.35,30.16-8.36,12.72-23.93,19.65Q594.11,232,573.11,232H541.28v43.11H504.72V118.76Zm-2,83.78q16.47,0,25-6.93,8.58-7.14,8.58-20.1,0-13.19-8.58-20.11-8.58-7.16-25-7.15h-29.8v54.29Z"/>
    <path className="cls-1"
          d="M746.55,277.82q-24.6,0-44.46-10.5a79.76,79.76,0,0,1-30.93-28.81Q660.11,220,660.1,197t11.06-41.33a79.23,79.23,0,0,1,30.93-29q19.86-10.5,44.46-10.5t44.24,10.5a79.16,79.16,0,0,1,30.93,29Q833,174,833,197a78.42,78.42,0,0,1-11.28,41.56,79.69,79.69,0,0,1-30.93,28.81Q771.16,277.82,746.55,277.82Zm0-30.83a51.25,51.25,0,0,0,25.28-6.25,45.9,45.9,0,0,0,17.61-17.87,54.61,54.61,0,0,0,0-51.83,44.31,44.31,0,0,0-17.61-17.65,52.55,52.55,0,0,0-50.56,0A46,46,0,0,0,703.44,171a56.29,56.29,0,0,0,0,51.83,47.64,47.64,0,0,0,17.83,17.87A51.27,51.27,0,0,0,746.55,247Z"/>
    <path className="cls-1" d="M1005.39,118.76V275.14h-30L896.6,180.2v94.94H860.48V118.76h30.25l78.55,95V118.76Z"/>
    <path className="cls-1"
          d="M1094.69,277.82a134.39,134.39,0,0,1-36.34-4.91q-17.38-5.15-28-13.18l12.41-27.26a84.39,84.39,0,0,0,24.16,11.84,91.48,91.48,0,0,0,28,4.47q15.58,0,23-4.47,7.44-4.68,7.45-12.28a11.17,11.17,0,0,0-4.52-9.16,30.94,30.94,0,0,0-11.28-6q-6.78-2.24-18.51-4.92a259.09,259.09,0,0,1-29.57-8.49,48.77,48.77,0,0,1-19.86-13.63q-8.13-9.37-8.13-25a42.66,42.66,0,0,1,7.45-24.57q7.44-11.18,22.34-17.65,15.14-6.48,36.8-6.48a122.24,122.24,0,0,1,29.56,3.58A87.68,87.68,0,0,1,1155,129.93l-11.28,27.48q-21.9-12.28-43.79-12.29-15.35,0-22.8,4.92-7.21,4.92-7.22,13t8.35,12.06q8.58,3.8,26,7.6a259.93,259.93,0,0,1,29.57,8.48,48,48,0,0,1,19.63,13.41q8.36,9.15,8.36,24.8a42.45,42.45,0,0,1-7.68,24.57q-7.44,11-22.57,17.43T1094.69,277.82Z"/>
    <path className="cls-1"
          d="M1477.83,275.14l-30.47-43.56h-33.64v43.56h-36.56V118.76h68.39q21,0,36.34,6.93,15.57,6.93,23.93,19.66t8.35,30.16q0,17.42-8.58,30.16-8.35,12.51-23.93,19.21l35.44,50.26Zm-.68-99.63q0-13.19-8.58-20.11-8.58-7.16-25-7.15h-29.8v54.51h29.8q16.47,0,25-7.15T1477.15,175.51Z"/>
    <path className="cls-1" d="M1665.47,246.1v29H1543.14V118.76h119.4v29h-83.06v34h73.35v28.15h-73.35V246.1Z"/>
    <path className="cls-1"
          d="M1694.57,118.76h71.78q25.73,0,45.37,9.83,19.86,9.61,30.69,27.26,11.07,17.64,11.06,41.1t-11.06,41.11q-10.83,17.64-30.69,27.48-19.65,9.6-45.37,9.6h-71.78Zm70,126.67q23.7,0,37.7-13,14.22-13.17,14.22-35.52t-14.22-35.29q-14-13.18-37.7-13.18h-33.4v97Z"/>
    <path className="cls-1"
          d="M1933,277.82a134.39,134.39,0,0,1-36.34-4.91q-17.37-5.15-28-13.18l12.42-27.26a84.2,84.2,0,0,0,24.15,11.84,91.54,91.54,0,0,0,28,4.47q15.57,0,23-4.47,7.45-4.68,7.45-12.28a11.16,11.16,0,0,0-4.51-9.16,31,31,0,0,0-11.29-6q-6.77-2.24-18.51-4.92a259.7,259.7,0,0,1-29.57-8.49,48.9,48.9,0,0,1-19.86-13.63q-8.13-9.37-8.13-25a42.73,42.73,0,0,1,7.45-24.57q7.46-11.18,22.35-17.65,15.12-6.48,36.79-6.48a122.32,122.32,0,0,1,29.57,3.58,87.68,87.68,0,0,1,25.28,10.27l-11.29,27.48q-21.89-12.28-43.79-12.29-15.35,0-22.79,4.92-7.23,4.92-7.23,13t8.36,12.06q8.57,3.8,26,7.6a259.33,259.33,0,0,1,29.57,8.48,48.08,48.08,0,0,1,19.64,13.41q8.36,9.15,8.35,24.8a42.52,42.52,0,0,1-7.67,24.57q-7.45,11-22.58,17.43T1933,277.82Z"/>
    <path className="cls-2"
          d="M1218.76,267.32a79.66,79.66,0,0,1-30.92-28.81Q1176.79,220,1176.78,197t11.06-41.33a79.13,79.13,0,0,1,30.92-29q19.86-10.5,44.47-10.5a96.4,96.4,0,0,1,32.94,5.48,85.77,85.77,0,0,1,11.3,5,84.11,84.11,0,0,1,9.84,6.15,78,78,0,0,1,21.08,22.89Q1349.69,174,1349.68,197a78.34,78.34,0,0,1-11.29,41.56,79.66,79.66,0,0,1-30.92,28.81q-19.63,10.5-44.24,10.5-1.35,0-2.67,0a94.41,94.41,0,0,1-35.63-7.51Q1221.79,268.93,1218.76,267.32Zm87.35-44.45a45.94,45.94,0,0,1-17.6,17.87,49.14,49.14,0,0,1-15.61,5.45,56.42,56.42,0,0,1-9.67.8,51.25,51.25,0,0,1-25.28-6.25,47.5,47.5,0,0,1-17.83-17.87,56.29,56.29,0,0,1,0-51.83A45.82,45.82,0,0,1,1238,153.39a49.84,49.84,0,0,1,25.28-6.48,51.5,51.5,0,0,1,18.13,3.13c1,.35,1.9.74,2.82,1.15a47.56,47.56,0,0,1,4.33,2.2,44.14,44.14,0,0,1,14.56,12.85,46.53,46.53,0,0,1,3,4.8,54.54,54.54,0,0,1,0,51.83Z"/>
    <path className="cls-1"
          d="M174.39,368.16l3.48-47.58a1.05,1.05,0,0,0-1.21-1.12,156.51,156.51,0,0,1-42.07,0,1.07,1.07,0,0,0-1.22,1.14l2.82,31.51a1,1,0,0,0,2,.22l3.36-10.45a1,1,0,0,1,2,.1L154.5,392.1a1,1,0,0,0,2,0l8.37-46.33a1,1,0,0,1,2-.06l5.43,22.66A1,1,0,0,0,174.39,368.16Z"/>
    <path className="cls-1"
          d="M10.31,317.05a5.79,5.79,0,0,1-4.26,1.88A5.65,5.65,0,0,1,.38,312.7c2.35-22.34,7.48-47,14.65-72.36,5.66-20,12.59-40.51,20.43-60.68a4.72,4.72,0,0,1,4.41-3,5.06,5.06,0,0,1,4.82,3.86c3.19,12.19,10.39,22.2,19.65,30.33,9.63,8.45,21.49,14.86,33.4,19.6a217.41,217.41,0,0,0,32.14,9.9c15.58,3.38,58.27,6.09,62.33-10.17s-31.84-21.68-53.53-26.42c-1.87-.41-4.15-.88-6.74-1.43C109.2,197.46,62.36,186,48.84,147.5a70.22,70.22,0,0,1-3.66-26.41c1.17-28.29,12.38-49,30.16-63.51,10.11-8.22,22.34-14.41,36.06-18.8C125.32,21,139.15,7.73,151.94.92a7.82,7.82,0,0,1,7.37,0c10.91,5.81,22.58,16.33,34.41,30.33A214.47,214.47,0,0,1,234,38.78a162.25,162.25,0,0,1,33,13.35,5,5,0,0,1,2.1,6.34l-23.33,55a5.24,5.24,0,0,1-6.83,2.78c-15.51-6.38-38.73-14.46-56.86-16.15-29.14-2.71-47.43,2.71-48.79,16.26s28.46,19,54.89,23c13.81,2.13,36.34,6.14,57.59,20.28,19.39,12.9,37.73,34.23,47.43,70.24,8.76,29,15,57.41,17.7,82.8a5.66,5.66,0,0,1-5.67,6.23,5.76,5.76,0,0,1-4.26-1.88c-10.08-11-24-25.7-39.62-41.33-8.27,9.11-28.35,25.33-67.6,32a225.8,225.8,0,0,1-38.1,3c-58.94,0-89-12.87-112.94-27.78C30,295.88,18.81,307.75,10.31,317.05Z"/>
</svg>



export default Home