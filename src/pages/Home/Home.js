import React, {useEffect, useState} from "react"
import './Home.less'
import {Link} from "react-router-dom"
import {useSelector} from "react-redux"

const services = [
    {
        title: 'Zero-to-Hero',
        key: 'zth',
        description: 'An AI-powered tool to create highly effective Amazon campaigns in a matter of minutes',
        icon: () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_21048:66546" maskUnits="userSpaceOnUse" x="0" y="0" width="22" height="22">
                <rect width="22" height="22" fill="#C4C4C4"/>
            </mask>
            <g>
                <path d="M11 3.16892C10.6205 3.16892 10.3125 2.86092 10.3125 2.48142V0.6875C10.3125 0.308 10.6205 0 11 0C11.3795 0 11.6875 0.308 11.6875 0.6875V2.48142C11.6875 2.86092 11.3795 3.16892 11 3.16892Z" fill="#6959AB"/>
                <path d="M17.0235 5.66413C16.8475 5.66413 16.6715 5.59721 16.5376 5.46246C16.269 5.19388 16.269 4.75846 16.5376 4.48988L17.8063 3.22121C18.0749 2.95263 18.5103 2.95263 18.7789 3.22121C19.0475 3.4898 19.0475 3.92521 18.7789 4.1938L17.5102 5.46246C17.3755 5.5963 17.2004 5.66413 17.0235 5.66413V5.66413Z" fill="#6959AB"/>
                <path d="M21.3125 11.6875H19.5195C19.14 11.6875 18.832 11.3795 18.832 11C18.832 10.6205 19.14 10.3125 19.5195 10.3125H21.3125C21.692 10.3125 22 10.6205 22 11C22 11.3795 21.692 11.6875 21.3125 11.6875Z" fill="#6959AB"/>
                <path d="M18.2921 18.9796C18.1161 18.9796 17.9401 18.9126 17.8063 18.7779L16.5376 17.5092C16.269 17.2406 16.269 16.8052 16.5376 16.5366C16.8062 16.2681 17.2416 16.2681 17.5102 16.5366L18.7789 17.8053C19.0475 18.0739 19.0475 18.5093 18.7789 18.7779C18.6441 18.9126 18.4681 18.9796 18.2921 18.9796Z" fill="#6959AB"/>
                <path d="M11 22C10.6205 22 10.3125 21.692 10.3125 21.3125V19.5186C10.3125 19.1391 10.6205 18.8311 11 18.8311C11.3795 18.8311 11.6875 19.1391 11.6875 19.5186V21.3125C11.6875 21.692 11.3795 22 11 22Z" fill="#6959AB"/>
                <path d="M3.7079 18.9796C3.5319 18.9796 3.3559 18.9126 3.22207 18.7779C2.95348 18.5093 2.95348 18.0739 3.22207 17.8053L4.49073 16.5366C4.75932 16.2681 5.19473 16.2681 5.46332 16.5366C5.7319 16.8052 5.7319 17.2406 5.46332 17.5092L4.19465 18.7779C4.0599 18.9126 3.8839 18.9796 3.7079 18.9796V18.9796Z" fill="#6959AB"/>
                <path d="M2.4805 11.6875H0.6875C0.308 11.6875 0 11.3795 0 11C0 10.6205 0.308 10.3125 0.6875 10.3125H2.4805C2.86 10.3125 3.168 10.6205 3.168 11C3.168 11.3795 2.86 11.6875 2.4805 11.6875Z" fill="#6959AB"/>
                <path d="M4.97657 5.66413C4.80057 5.66413 4.62457 5.59721 4.49073 5.46246L3.22207 4.1938C2.95348 3.92521 2.95348 3.4898 3.22207 3.22121C3.49065 2.95263 3.92607 2.95263 4.19465 3.22121L5.46332 4.48988C5.7319 4.75846 5.7319 5.19388 5.46332 5.46246C5.32765 5.5963 5.15257 5.66413 4.97657 5.66413V5.66413Z" fill="#6959AB"/>
                <path d="M9.92105 18.3333C9.84221 18.3333 9.76246 18.3196 9.68546 18.2921C9.38205 18.1812 9.19688 17.875 9.23996 17.556L9.98705 11.9167H7.10413C6.84563 11.9167 6.60821 11.7709 6.49088 11.5399C6.37355 11.3089 6.39646 11.0312 6.54955 10.8231L11.5912 3.94808C11.7791 3.69049 12.1201 3.59516 12.4125 3.72074C12.7059 3.84449 12.8764 4.15341 12.8241 4.46691L12.0413 9.16666H14.8958C15.147 9.16666 15.378 9.30324 15.499 9.52416C15.619 9.74416 15.6099 10.0127 15.4751 10.2245L10.5004 18.0162C10.3711 18.2187 10.1502 18.3333 9.92105 18.3333V18.3333Z" fill="#6959AB"/>
            </g>
        </svg>,
        link: '/zero-to-hero/campaign'
    },
    {
        title: 'PPC Optimization',
        key: 'optimization',
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
        link: '/ppc/optimization'
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
        if(isAdmin  ? false : isAgencyUser ? i.key === 'zth' : (i.key === 'dayparting' || i.key === 'analytics')) return 'Coming Soon'
        else return 'Get Started'
    }


    return (
        <div className="home-page">
            <h2>
                Welcome to
                <svg width="217" height="32" viewBox="0 0 217 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10.4274 25.9145C8.44444 25.9145 6.50712 25.698 4.61538 25.265C2.74644 24.8091 1.20798 24.2051 0 23.453L2.59829 17.5726C3.73789 18.2336 5.01424 18.7692 6.42735 19.1795C7.84046 19.567 9.19658 19.7607 10.4957 19.7607C11.6125 19.7607 12.4103 19.6581 12.8889 19.453C13.3675 19.2251 13.6068 18.8946 13.6068 18.4615C13.6068 17.9601 13.2878 17.584 12.6496 17.3333C12.0342 17.0826 11.0085 16.8091 9.57265 16.5128C7.7265 16.1254 6.18803 15.7151 4.95726 15.2821C3.7265 14.8262 2.65527 14.0969 1.74359 13.094C0.831909 12.0684 0.376068 10.6895 0.376068 8.95726C0.376068 7.45299 0.797721 6.08547 1.64103 4.8547C2.48433 3.62393 3.73789 2.65527 5.40171 1.94872C7.08832 1.24216 9.12821 0.88889 11.5214 0.88889C13.1624 0.88889 14.7692 1.07123 16.3419 1.4359C17.9373 1.77778 19.339 2.2906 20.547 2.97436L18.1197 8.82051C15.7721 7.63533 13.5499 7.04274 11.453 7.04274C9.37892 7.04274 8.34188 7.54416 8.34188 8.54701C8.34188 9.02564 8.64957 9.39031 9.26496 9.64103C9.88034 9.86895 10.8946 10.1197 12.3077 10.3932C14.1311 10.735 15.6695 11.1339 16.9231 11.5897C18.1766 12.0228 19.2593 12.7407 20.1709 13.7436C21.1054 14.7464 21.5727 16.114 21.5727 17.8462C21.5727 19.3504 21.151 20.7179 20.3077 21.9487C19.4644 23.1567 18.1994 24.1254 16.5128 24.8547C14.849 25.5613 12.8205 25.9145 10.4274 25.9145Z"
                        fill="#FF5256"/>
                    <path
                        d="M36.2129 6.32479C37.8539 6.32479 39.3582 6.72365 40.7257 7.52137C42.116 8.2963 43.21 9.4245 44.0077 10.906C44.8283 12.3875 45.2385 14.0969 45.2385 16.0342C45.2385 17.9715 44.8283 19.6809 44.0077 21.1624C43.21 22.6211 42.116 23.7493 40.7257 24.547C39.3582 25.3219 37.8539 25.7094 36.2129 25.7094C34.1388 25.7094 32.5548 25.1738 31.4607 24.1026V32H23.7342V6.66667H31.0847V8.20513C32.2015 6.95157 33.9109 6.32479 36.2129 6.32479ZM34.3667 19.6923C35.2556 19.6923 35.985 19.3732 36.5548 18.735C37.1246 18.0969 37.4095 17.1966 37.4095 16.0342C37.4095 14.8718 37.1246 13.9715 36.5548 13.3333C35.985 12.6724 35.2556 12.3419 34.3667 12.3419C33.4778 12.3419 32.7485 12.6724 32.1787 13.3333C31.6089 13.9715 31.324 14.8718 31.324 16.0342C31.324 17.1966 31.6089 18.0969 32.1787 18.735C32.7485 19.3732 33.4778 19.6923 34.3667 19.6923Z"
                        fill="#FF5256"/>
                    <path
                        d="M57.5529 25.7094C55.4788 25.7094 53.6099 25.2991 51.946 24.4786C50.305 23.6353 49.0173 22.4843 48.0828 21.0256C47.1483 19.5442 46.6811 17.8689 46.6811 16C46.6811 14.1311 47.1483 12.4672 48.0828 11.0085C49.0173 9.52707 50.305 8.37607 51.946 7.55555C53.6099 6.73504 55.4788 6.32479 57.5529 6.32479C59.6498 6.32479 61.5187 6.73504 63.1597 7.55555C64.8235 8.37607 66.1113 9.52707 67.023 11.0085C67.9574 12.4672 68.4247 14.1311 68.4247 16C68.4247 17.8689 67.9574 19.5442 67.023 21.0256C66.1113 22.4843 64.8235 23.6353 63.1597 24.4786C61.5187 25.2991 59.6498 25.7094 57.5529 25.7094ZM57.5529 19.6923C58.4418 19.6923 59.1711 19.3732 59.7409 18.735C60.3107 18.0741 60.5956 17.1624 60.5956 16C60.5956 14.8376 60.3107 13.9373 59.7409 13.2991C59.1711 12.661 58.4418 12.3419 57.5529 12.3419C56.664 12.3419 55.9347 12.661 55.3648 13.2991C54.7951 13.9373 54.5102 14.8376 54.5102 16C54.5102 17.1624 54.7951 18.0741 55.3648 18.735C55.9347 19.3732 56.664 19.6923 57.5529 19.6923Z"
                        fill="#FF5256"/>
                    <path
                        d="M83.8344 6.32479C86.1364 6.32479 87.9826 7.01994 89.3729 8.41026C90.786 9.80057 91.4925 11.8974 91.4925 14.7009V25.3675H83.766V16.0342C83.766 13.8917 83.0025 12.8205 81.4754 12.8205C80.6093 12.8205 79.9028 13.1282 79.3558 13.7436C78.8316 14.3362 78.5694 15.2821 78.5694 16.5812V25.3675H70.8429V6.66667H78.1934V8.51282C78.9227 7.78348 79.766 7.23647 80.7233 6.8718C81.6806 6.50712 82.7176 6.32479 83.8344 6.32479Z"
                        fill="#FF5256"/>
                    <path
                        d="M102.164 25.7094C100.569 25.7094 98.9962 25.5385 97.4463 25.1966C95.8965 24.8547 94.6429 24.4103 93.6856 23.8632L95.8053 18.7692C96.6714 19.2934 97.697 19.7037 98.8822 20C100.067 20.2963 101.218 20.4444 102.335 20.4444C103.224 20.4444 103.839 20.3761 104.181 20.2393C104.546 20.0798 104.728 19.8519 104.728 19.5556C104.728 19.2593 104.5 19.0541 104.045 18.9402C103.612 18.8262 102.894 18.7122 101.891 18.5983C100.364 18.416 99.0646 18.188 97.9933 17.9145C96.9221 17.6182 95.9762 17.0598 95.1557 16.2393C94.358 15.4188 93.9591 14.245 93.9591 12.7179C93.9591 11.51 94.3238 10.4274 95.0532 9.47009C95.7825 8.51282 96.8651 7.74929 98.301 7.17949C99.7597 6.60969 101.503 6.32479 103.532 6.32479C104.945 6.32479 106.324 6.46154 107.669 6.73504C109.036 6.98575 110.198 7.36182 111.156 7.86325L109.036 12.9573C107.395 12.0456 105.594 11.5897 103.634 11.5897C101.948 11.5897 101.104 11.886 101.104 12.4786C101.104 12.7749 101.332 12.9915 101.788 13.1282C102.244 13.2422 102.962 13.3561 103.942 13.4701C105.469 13.6524 106.757 13.8917 107.805 14.188C108.877 14.4843 109.811 15.0427 110.609 15.8632C111.429 16.6838 111.839 17.8575 111.839 19.3846C111.839 20.547 111.475 21.6068 110.745 22.5641C110.016 23.5214 108.922 24.2849 107.463 24.8547C106.005 25.4245 104.238 25.7094 102.164 25.7094Z"
                        fill="#FF5256"/>
                    <path
                        d="M124.059 25.7094C121.985 25.7094 120.116 25.2991 118.452 24.4786C116.811 23.6353 115.524 22.4843 114.589 21.0256C113.655 19.5442 113.187 17.8689 113.187 16C113.187 14.1311 113.655 12.4672 114.589 11.0085C115.524 9.52707 116.811 8.37607 118.452 7.55555C120.116 6.73504 121.985 6.32479 124.059 6.32479C126.156 6.32479 128.025 6.73504 129.666 7.55555C131.33 8.37607 132.618 9.52707 133.529 11.0085C134.464 12.4672 134.931 14.1311 134.931 16C134.931 17.8689 134.464 19.5442 133.529 21.0256C132.618 22.4843 131.33 23.6353 129.666 24.4786C128.025 25.2991 126.156 25.7094 124.059 25.7094ZM124.059 19.6923C124.948 19.6923 125.678 19.3732 126.247 18.735C126.817 18.0741 127.102 17.1624 127.102 16C127.102 14.8376 126.817 13.9373 126.247 13.2991C125.678 12.661 124.948 12.3419 124.059 12.3419C123.17 12.3419 122.441 12.661 121.871 13.2991C121.301 13.9373 121.017 14.8376 121.017 16C121.017 17.1624 121.301 18.0741 121.871 18.735C122.441 19.3732 123.17 19.6923 124.059 19.6923Z"
                        fill="#FF5256"/>
                    <path
                        d="M144.7 8.68376C146.067 7.11111 148.084 6.32479 150.751 6.32479V13.1624C150.136 13.0712 149.566 13.0256 149.042 13.0256C146.398 13.0256 145.076 14.3704 145.076 17.0598V25.3675H137.349V6.66667H144.7V8.68376Z"
                        fill="#FF5256"/>
                    <path
                        d="M172.671 16C172.671 16.114 172.637 16.718 172.569 17.812H159.577C159.851 18.5185 160.307 19.0655 160.945 19.453C161.583 19.8177 162.381 20 163.338 20C164.159 20 164.842 19.8974 165.389 19.6923C165.959 19.4872 166.575 19.1339 167.236 18.6325L171.27 22.7009C169.446 24.7066 166.723 25.7094 163.099 25.7094C160.842 25.7094 158.86 25.2991 157.15 24.4786C155.441 23.6353 154.119 22.4729 153.184 20.9915C152.25 19.51 151.783 17.8462 151.783 16C151.783 14.1311 152.238 12.4672 153.15 11.0085C154.085 9.52707 155.35 8.37607 156.945 7.55555C158.563 6.73504 160.375 6.32479 162.381 6.32479C164.273 6.32479 165.993 6.70085 167.543 7.45299C169.116 8.20513 170.358 9.31054 171.27 10.7692C172.204 12.2279 172.671 13.9715 172.671 16ZM162.449 11.5897C161.652 11.5897 160.991 11.8063 160.466 12.2393C159.942 12.6724 159.6 13.2878 159.441 14.0855H165.458C165.298 13.3105 164.956 12.7066 164.432 12.2735C163.908 11.8177 163.247 11.5897 162.449 11.5897Z"
                        fill="#FF5256"/>
                    <path
                        d="M195.794 0V25.3675H188.443V23.8291C187.326 25.0826 185.617 25.7094 183.315 25.7094C181.674 25.7094 180.158 25.3219 178.768 24.547C177.4 23.7493 176.306 22.6097 175.486 21.1282C174.688 19.6467 174.289 17.9373 174.289 16C174.289 14.0627 174.688 12.3647 175.486 10.906C176.306 9.4245 177.4 8.2963 178.768 7.52137C180.158 6.72365 181.674 6.32479 183.315 6.32479C185.389 6.32479 186.973 6.8604 188.067 7.93162V0H195.794ZM185.161 19.6923C186.05 19.6923 186.779 19.3732 187.349 18.735C187.919 18.0741 188.204 17.1624 188.204 16C188.204 14.8376 187.919 13.9373 187.349 13.2991C186.779 12.661 186.05 12.3419 185.161 12.3419C184.272 12.3419 183.543 12.661 182.973 13.2991C182.403 13.9373 182.118 14.8376 182.118 16C182.118 17.1624 182.403 18.0741 182.973 18.735C183.543 19.3732 184.272 19.6923 185.161 19.6923Z"
                        fill="#FF5256"/>
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M208.633 20.2395C208.291 20.3762 207.676 20.4446 206.787 20.4446C205.67 20.4446 204.519 20.2965 203.334 20.0002C202.52 19.7967 201.781 19.5395 201.118 19.2285C200.815 19.0867 200.528 18.9336 200.257 18.7694L198.137 23.8634C199.094 24.4104 200.348 24.8549 201.898 25.1967C203.448 25.5386 205.02 25.7096 206.616 25.7096C208.69 25.7096 210.456 25.4247 211.915 24.8549C213.374 24.2851 214.468 23.5215 215.197 22.5643C215.926 21.607 216.291 20.5472 216.291 19.3848C216.291 17.8577 215.881 16.6839 215.06 15.8634C214.262 15.0429 213.328 14.4845 212.257 14.1882C211.208 13.8919 209.921 13.6526 208.393 13.4703C207.413 13.3563 206.695 13.2423 206.24 13.1284C205.784 12.9916 205.556 12.7751 205.556 12.4788C205.556 11.8862 206.399 11.5899 208.086 11.5899C209.705 11.5899 211.215 11.9009 212.616 12.5229C212.912 12.6539 213.202 12.7988 213.487 12.9574L215.607 7.86341C214.65 7.36199 213.487 6.98592 212.12 6.73521C210.775 6.4617 209.396 6.32495 207.983 6.32495C205.955 6.32495 204.211 6.60985 202.752 7.17965C201.317 7.74945 200.234 8.51299 199.505 9.47025C198.775 10.4275 198.411 11.5101 198.411 12.7181C198.411 14.2452 198.809 15.419 199.607 16.2395C200.428 17.06 201.374 17.6184 202.445 17.9147C203.516 18.1882 204.815 18.4161 206.342 18.5985C207.345 18.7124 208.063 18.8264 208.496 18.9403C208.952 19.0543 209.18 19.2594 209.18 19.5557C209.18 19.852 208.997 20.0799 208.633 20.2395ZM208.737 17.9995C209.043 18.0765 209.382 18.2088 209.659 18.4577C209.969 18.7372 210.151 19.1215 210.151 19.5557C210.151 20.3747 209.595 20.8786 209.022 21.1293L209.008 21.1355L208.993 21.1413C208.46 21.3548 207.673 21.4159 206.787 21.4159C205.583 21.4159 204.353 21.2562 203.098 20.9424C202.248 20.7298 201.462 20.4589 200.744 20.126L199.382 23.4008C200.119 23.7239 201.023 24.0092 202.107 24.2483C203.588 24.5749 205.09 24.7383 206.616 24.7383C208.606 24.7383 210.245 24.4643 211.561 23.9502C212.903 23.4261 213.831 22.7544 214.424 21.9756C215.03 21.1811 215.32 20.3266 215.32 19.3848C215.32 18.0308 214.96 17.1364 214.373 16.5502L214.369 16.5454L214.364 16.5405C213.683 15.8398 212.898 15.3732 211.998 15.1243L211.995 15.1236L211.993 15.1228C211.009 14.8448 209.775 14.6134 208.28 14.4349C207.294 14.3202 206.524 14.2006 206.004 14.0706L205.982 14.0651L205.961 14.0587C205.655 13.9671 205.324 13.8208 205.058 13.5676C204.764 13.2885 204.585 12.9108 204.585 12.4788C204.585 12.0727 204.739 11.7062 205.009 11.4214C205.258 11.1591 205.572 10.9992 205.866 10.8958C206.446 10.692 207.212 10.6187 208.086 10.6187C209.828 10.6187 211.466 10.9532 212.99 11.626L214.35 8.35596C213.66 8.08224 212.861 7.85843 211.945 7.69054L211.936 7.68884L211.926 7.68697C210.647 7.42681 209.333 7.2962 207.983 7.2962C206.043 7.2962 204.426 7.56907 203.108 8.08342C201.792 8.60612 200.873 9.27711 200.277 10.0589C199.677 10.8463 199.382 11.7219 199.382 12.7181C199.382 14.0756 199.733 14.9724 200.299 15.5577C201.003 16.2598 201.798 16.7265 202.695 16.9761C203.71 17.2347 204.961 17.4553 206.455 17.6337C207.456 17.7476 208.231 17.867 208.737 17.9995Z"
                          fill="#FF5256"/>
                </svg>
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
                        disabled={isAdmin  ? false : isAgencyUser ? i.key === 'zth' : (i.key === 'dayparting' || i.key === 'analytics')}
                    >
                        {buttonText(i)}
                    </Link>
                </li>)}
            </ul>
        </div>
    )
}

export default Home