import React from "react"
import {Link} from "react-router-dom"

const SuccessSend = ({active}) => {
    return (
        <section className={`success ${active ? 'active' : ''}`}>
            <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="64" cy="64" r="64" fill="#F3F7FD"/>
                <path
                    d="M69.1227 56.9445C69.3316 56.6809 69.4343 56.3498 69.4108 56.0154C69.3873 55.6809 69.2393 55.3671 68.9955 55.1348C68.7517 54.9024 68.4295 54.7681 68.0914 54.758C67.7534 54.7478 67.4236 54.8625 67.166 55.0798L42.7074 75.704L29.7914 70.7531C29.2296 70.54 28.7413 70.1714 28.3845 69.6913C28.0278 69.2112 27.8176 68.6397 27.7789 68.0446C27.7403 67.4496 27.8748 66.8561 28.1666 66.3346C28.4583 65.8131 28.8949 65.3856 29.4246 65.1028L83.0452 35.3319C83.4667 35.1069 83.9418 34.9996 84.42 35.0213C84.8981 35.043 85.3614 35.1931 85.7602 35.4553C86.1591 35.7176 86.4786 36.0823 86.6847 36.5105C86.8908 36.9387 86.9757 37.4144 86.9304 37.8866L82.2268 86.4823C82.1797 86.9808 82.0159 87.4614 81.7484 87.886C81.4809 88.3106 81.1171 88.6675 80.686 88.9283C80.2548 89.189 79.7682 89.3464 79.2649 89.388C78.7615 89.4295 78.2554 89.3541 77.7867 89.1676L62.0673 83.1351L52.1992 92.3004C51.835 92.6376 51.3791 92.8617 50.8878 92.9448C50.3965 93.0279 49.8913 92.9665 49.4349 92.768C48.9784 92.5696 48.5907 92.2429 48.3196 91.8284C48.0485 91.4138 47.906 90.9296 47.9096 90.4356V83.2377L69.1227 56.9445Z"
                    fill="#6D6DF6"/>
            </svg>

            <h2>
                <span> Name,</span> we will contact you in 2 business days!
            </h2>

            <p>
                Now, you can read some our insights:
            </p>

            <div className="buttons">
                <Link to={'/'} className="btn white">
                    back to home
                </Link>

                <a className="btn default">
                    see profit whales in action

                    <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="17"
                              height="12">
                            <rect width="16.8" height="12" fill="#C4C4C4"/>
                        </mask>
                        <g mask="url(#mask0)">
                            <path
                                d="M11.1002 1.2002L15.6002 6.0002M15.6002 6.0002L11.1002 10.8002M15.6002 6.0002L1.20019 6.0002"
                                stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                    </svg>
                </a>
            </div>
        </section>
    )
}

export default SuccessSend