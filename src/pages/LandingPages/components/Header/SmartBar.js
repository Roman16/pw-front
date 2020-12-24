import React from "react"
import {Link} from "react-router-dom"

const SmartBar = () => {
    return (
        <div className="smart-bar">
            <div className="container">
                <div className="contacts">
                    <a href="tel:+18143519477" className="phone">
                        <i>
                            <svg width="11" height="15" viewBox="0 0 11 15" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M6.19707 11.1594C7.34373 10.3821 8.01814 10.2006 9.56361 11.2675C11.2937 12.462 11.6142 13.8309 8.70633 15C3.01441 14.5303 -1.78875 6.21103 0.650431 1.04685C3.11676 -0.886996 4.14217 0.0750042 4.31145 2.17067C4.46283 4.04252 3.96834 4.53584 2.72188 5.14036C2.89334 7.40276 4.32326 9.87972 6.19707 11.1595L6.19707 11.1594Z"
                                      fill="white"/>
                            </svg>
                        </i>
                        +18143519477
                    </a>

                    <a href={'mailto:info@profitwhales.agency'} className="email">
                        <i>
                            <svg width="19" height="12" viewBox="0 0 19 12" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M1.38461 0C1.11245 0 0.862644 0.0817614 0.649038 0.216346L8.55287 7.11778C8.97054 7.48265 9.47588 7.48263 9.89422 7.11778L17.8125 0.209134C17.5996 0.0759114 17.3476 0 17.0769 0H1.38461ZM0.0793268 0.937499C0.0313615 1.07827 0 1.22721 0 1.38461V10.6154C0 11.3824 0.617552 12 1.38461 12H17.0769C17.844 12 18.4615 11.3824 18.4615 10.6154V1.38461C18.4615 1.22721 18.4302 1.07827 18.3822 0.937499L10.5 7.8173C9.76564 8.4578 8.68128 8.45147 7.94711 7.81014L0.0793268 0.937555V0.937499Z"
                                    fill="white"/>
                            </svg>
                        </i>
                        info@profitwhales.agency
                    </a>

                    <a href={'https://goo.gl/maps/tb9N3fFTe197WgFK9'} target={'_blank'} className="location">
                        <i>
                            <svg width="12" height="15" viewBox="0 0 12 15" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M5.7261 0C2.56355 0 0 2.56355 0 5.7261C0 9.28676 2.8763 12.285 5.1308 14.7388C5.45098 15.0871 6.00122 15.0871 6.3214 14.7388C8.5759 12.285 11.4522 9.28676 11.4522 5.7261C11.4522 2.56355 8.88865 0 5.7261 0V0ZM5.7261 3.10371C7.17432 3.10371 8.34849 4.27788 8.34849 5.7261C8.34849 7.17432 7.17432 8.34849 5.7261 8.34849C4.27788 8.34849 3.10371 7.17432 3.10371 5.7261C3.10371 4.27788 4.27788 3.10371 5.7261 3.10371Z"
                                      fill="white"/>
                            </svg>
                        </i>
                        Coral Springs, FL 33065
                    </a>
                </div>

                <Link to={'/login'} className={'login-link'}>
                    Login
                </Link>
            </div>
        </div>

    )
}

export default SmartBar
