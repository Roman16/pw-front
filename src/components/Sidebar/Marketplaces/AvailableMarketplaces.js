import React from "react"

const AvailableMarketplaces = ({visible, collapsed}) => {
    return (<div
        className={`available-marketplaces ${visible ? 'visible' : ''} ${collapsed && visible ? 'with-sidebar' : ''}`}>
        <div className="form-group search">
            <input type="text" placeholder={'Search'}/>

            <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M13 13.5L9.32215 9.82215M9.32215 9.82215C10.2043 8.93994 10.75 7.72119 10.75 6.375C10.75 3.68261 8.56739 1.5 5.875 1.5C3.18261 1.5 1 3.68261 1 6.375C1 9.06739 3.18261 11.25 5.875 11.25C7.22119 11.25 8.43994 10.7043 9.32215 9.82215Z"
                    stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>

        <h3>MY ACCOUNTS</h3>
        <h3>SHARED WITH ME</h3>

        <button className="btn transparent">
            See more
        </button>
    </div>)

}

export default React.memo(AvailableMarketplaces)
