import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import {Link} from 'react-router-dom'

import './NotFound.less'

import img from '../../../assets/img/404.svg'

const authorized = localStorage.getItem('token')

const NotFound = () => (
    <section className="not-found-page  landing-page">
        <Header/>

        <div className="box">
            <div className="container">
                <div className="modal-window">
                    <div className="window-header">
                        <div/>
                        <div/>
                        <div/>
                    </div>

                    <svg width="428" height="193" viewBox="0 0 428 193" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="285" height="193">
                            <rect x="0.5" y="0.5" width="284" height="192" fill="#C4C4C4" stroke="#6D6DF6"/>
                        </mask>
                        <g mask="url(#mask0)">
                            <path d="M136.179 121.291V119.291H134.179H117.362V10.038V8.03799H115.362H84.1642H83.1265L82.529 8.88643L1.56381 123.856L1.19902 124.374V125.008V147.556V149.556H3.19902H85.383V185.962V187.962H87.383H115.362H117.362V185.962V149.556H134.179H136.179V147.556V121.291ZM263.366 165.514L263.377 165.496L263.389 165.478C268.726 157.084 272.765 147.208 275.531 135.632C278.293 124.074 279.795 111.529 279.795 97.9999C279.795 84.4679 278.292 72.1705 275.531 60.6159C272.765 49.0397 268.726 39.1632 263.389 30.7694L263.377 30.7515L263.366 30.7338C257.75 22.3049 250.835 15.8889 242.627 11.2685C234.37 6.6209 224.864 4.32129 214.657 4.32129C204.207 4.32129 194.7 6.61889 186.44 11.2685C178.239 15.8847 171.314 22.3019 165.937 30.7516C160.338 39.1612 156.3 49.0489 153.536 60.6159C150.769 72.195 149.519 84.4962 149.519 97.9999C149.519 111.501 150.768 124.05 153.536 135.632C156.3 147.199 160.338 157.086 165.937 165.496C171.314 173.946 178.239 180.363 186.44 184.979C194.728 189.645 204.246 191.679 214.657 191.679C224.825 191.679 234.342 189.643 242.627 184.979C250.835 180.359 257.75 173.943 263.366 165.514ZM424.401 121.291V119.291H422.401H405.584V10.038V8.03799H403.584H372.386H371.348L370.751 8.88643L289.786 123.856L289.421 124.374V125.008V147.556V149.556H291.421H373.605V185.962V187.962H375.605H403.584H405.584V185.962V149.556H422.401H424.401V147.556V121.291ZM85.383 119.291H40.7432L85.383 56.3539V119.291ZM214.657 36.816C219.702 36.816 224.033 38.0439 227.723 40.4419C231.423 42.8466 234.59 46.5021 237.174 51.5267C242.372 61.6333 245.093 77.0468 245.093 97.9999C245.093 118.953 242.372 134.367 237.174 144.473C234.59 149.498 231.423 153.153 227.723 155.558C224.033 157.956 219.702 159.184 214.657 159.184C209.546 159.184 205.184 157.954 201.485 155.557C197.776 153.153 194.618 149.5 192.049 144.477C186.881 134.372 184.222 118.959 184.222 97.9999C184.222 77.0409 186.881 61.628 192.049 51.5226C194.618 46.4999 197.776 42.8468 201.485 40.4434C205.184 38.0461 209.546 36.816 214.657 36.816ZM373.605 119.291H328.965L373.605 56.3538V119.291Z" fill="#6D6DF6" stroke="#6D6DF6" stroke-width="4"/>
                        </g>
                        <mask id="mask1" mask-type="alpha" maskUnits="userSpaceOnUse" x="289" y="0" width="139" height="193">
                            <rect x="-0.5" y="0.5" width="138" height="192" transform="matrix(-1 0 0 1 427 0)" fill="#C4C4C4" stroke="#6D6DF6"/>
                        </mask>
                        <g mask="url(#mask1)">
                            <path d="M579.853 121.291V119.291H581.853H598.671V10.038V8.03799H600.671H631.868H632.906L633.504 8.88643L714.469 123.856L714.834 124.374V125.008V147.556V149.556H712.834H630.65V185.962V187.962H628.65H600.671H598.671V185.962V149.556H581.853H579.853V147.556V121.291ZM452.667 165.514L452.655 165.496L452.644 165.478C447.306 157.084 443.268 147.208 440.501 135.632C437.74 124.074 436.238 111.529 436.238 97.9999C436.238 84.4679 437.74 72.1705 440.501 60.6159C443.268 49.0397 447.306 39.1632 452.644 30.7694L452.655 30.7515L452.667 30.7338C458.282 22.3049 465.198 15.8889 473.406 11.2685C481.662 6.6209 491.169 4.32129 501.376 4.32129C511.825 4.32129 521.333 6.61889 529.593 11.2685C537.793 15.8847 544.719 22.3019 550.096 30.7516C555.695 39.1612 559.733 49.0489 562.497 60.6159C565.264 72.195 566.514 84.4962 566.514 97.9999C566.514 111.501 565.265 124.05 562.497 135.632C559.733 147.199 555.695 157.086 550.096 165.496C544.719 173.946 537.793 180.363 529.593 184.979C521.304 189.645 511.787 191.679 501.376 191.679C491.207 191.679 481.691 189.643 473.406 184.979C465.198 180.359 458.282 173.943 452.667 165.514ZM291.631 121.291V119.291H293.631H310.449V10.038V8.03799H312.449H343.647H344.684L345.282 8.88643L426.247 123.856L426.612 124.374V125.008V147.556V149.556H424.612H342.428V185.962V187.962H340.428H312.449H310.449V185.962V149.556H293.631H291.631V147.556V121.291ZM630.65 119.291H675.289L630.65 56.3539V119.291ZM501.376 36.816C496.331 36.816 491.999 38.0439 488.31 40.4419C484.61 42.8466 481.443 46.5021 478.858 51.5267C473.66 61.6333 470.94 77.0468 470.94 97.9999C470.94 118.953 473.66 134.367 478.858 144.473C481.443 149.498 484.61 153.153 488.31 155.558C491.999 157.956 496.331 159.184 501.376 159.184C506.486 159.184 510.849 157.954 514.548 155.557C518.257 153.153 521.415 149.5 523.983 144.477C529.151 134.372 531.811 118.959 531.811 97.9999C531.811 77.0409 529.151 61.628 523.983 51.5226C521.415 46.4999 518.257 42.8468 514.548 40.4434C510.849 38.0461 506.486 36.816 501.376 36.816ZM342.428 119.291H387.068L342.428 56.3538V119.291Z" fill="#6D6DF6" stroke="#6D6DF6" stroke-width="4"/>
                        </g>
                    </svg>

                    <h2>OOOPS...</h2>

                    <p>Looks like something went wrong, let’s take you home.</p>
                    <Link
                        className="btn default"
                        to={authorized ? '/ppc/optimization' : '/'}
                    >
                        Back to home
                    </Link>
                </div>

                <div className="background-text">
                    {Array(13)
                        .fill(0)
                        .map(() => (
                            <p>
                                404 Page Not Found 404 Page Not Found 404 Page Not Found 404 Page Not Found 404 Page Not
                                Found 404 Page Not Found
                            </p>
                        ))}
                </div>
            </div>
        </div>

        <Footer/>
    </section>
)

export default NotFound
