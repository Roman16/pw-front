import React from "react"
import {Link} from "react-router-dom"
import {LogoLink} from "../components/Header/Header"

const Header = () => {
    return (<header>
        <div className="container">
            <Link to={'/'} className={'back-to-site'}>
                <i>
                    <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="17"
                              height="12">
                            <rect width="16.8" height="12" transform="matrix(-1 0 0 1 16.7998 0)" fill="#C4C4C4"/>
                        </mask>
                        <g mask="url(#mask0)">
                            <path
                                d="M5.69961 1.20001L1.19961 6.00001M1.19961 6.00001L5.69961 10.8M1.19961 6.00001L15.5996 6.00001"
                                stroke="#6D6DF6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                    </svg>
                </i>

                back to site
            </Link>

            <LogoLink/>
        </div>
    </header>)
}

export default Header