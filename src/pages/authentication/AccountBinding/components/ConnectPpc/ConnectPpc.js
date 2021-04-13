import React, {Fragment, useEffect, useState} from "react"
import './ConnectPpc.less'
import {Link} from "react-router-dom"
import {SVG} from "../../../../../utils/icons"
import {useDispatch, useSelector} from "react-redux"
import loader from '../../../../../assets/img/loader.svg'
import {userActions} from "../../../../../actions/user.actions"
import {notification} from "../../../../../components/Notification"


const popupCenter = ({url, title, w, h}) => {
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY

    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : window.screen.width
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : window.screen.height

    const systemZoom = width / window.screen.availWidth
    const left = (width - w) / 2 / systemZoom + dualScreenLeft
    const top = (height - h) / 2 / systemZoom + dualScreenTop
    return window.open(url, title,
        `
      scrollbars=yes,
      width=${w / systemZoom}, 
      height=${h / systemZoom}, 
      top=${top}, 
      left=${left}
     `)
}

let intervalId

const ConnectPpc = ({onGoNextStep, onGoBackStep, onClose}) => {
    const [pageStatus, setPageStatus] = useState('connect')
    const dispatch = useDispatch()

    const {ppcLink} = useSelector(state => ({
        ppcLink: state.user.account_links.length > 0 ? state.user.account_links[0].amazon_ppc.connect_link : null,
    }))

    const openConnectLink = () => {
        setPageStatus('getting-token')

        const win = popupCenter({url: ppcLink, title: 'xtf', w: 520, h: 570})

        let timer = setInterval(() => {
            if (win.closed) {
                clearInterval(timer)
                setPageStatus('error')
            }
        }, 2000)

        const checkWindowLocation = () => {
            const windowLocation = win.location

            if (windowLocation.origin === 'https://front1.profitwhales.com' || windowLocation.origin === 'https://profitwhales.com') {
                try {
                    if (windowLocation.href && windowLocation.href.split('?status=').includes('FAILED')) {
                        setPageStatus('error')
                    } else if (windowLocation.href && ((windowLocation.href.split('?status=').includes('SUCCESS')) || (windowLocation.href.split('?status=').includes('IN_PROGRESS')))) {
                        setPageStatus('syncing-data')

                        win.close()
                        clearInterval(timer)
                    } else if (windowLocation.href && windowLocation.href.indexOf('?error_message=') !== -1) {
                        notification.error({title: decodeURIComponent(windowLocation.href.split('?error_message=')[1].split('+').join(' '))})
                        setPageStatus('error')
                    }

                    win.close()
                    clearInterval(timer)
                    clearInterval(intervalId)
                } catch (e) {
                    console.log(e)
                }
            }

        }

        intervalId = setInterval(checkWindowLocation, 2000)
    }

    const tryAgain = () => setPageStatus('connect')

    useEffect(() => {
        return (() => {
            window.removeEventListener('message', () => {
            })
        })
    }, [])

    if (pageStatus === 'connect') {
        return (
            <Fragment>
                <section className='connect-ppc-section'>
                    <h2>Connect Amazon Advertising</h2>
                    <Link to={'/videos/mws'} target="_blank">View Detailed Instructions</Link>
                    <p>To use Profit Whales, we need access to your Amazon Advertising
                        profile that is attached to the primary account that you used when connecting MWS. Click the
                        button below to grant access.
                    </p>

                    <div className="actions">
                        <button className={'btn default'} onClick={openConnectLink}>Connect Amazon Advertising</button>
                    </div>
                </section>

                <div className="section-description">
                    <p>Don’t have access to Seller Central?</p>
                    <p><Link to={'/affiliates'}>Invite person who does</Link></p>
                </div>
            </Fragment>
        )
    } else if (pageStatus === 'getting-token') {
        return (
            <section className='connect-mws-section'>
                <div className="progress">
                    <h2>Advertising Account Connect</h2>
                    <p>We are waiting for access to your Advertising Account</p>

                    <img src={loader} alt=""/>
                </div>
            </section>
        )
    } else if (pageStatus === 'syncing-data') {
        return (
            <section className='connect-mws-section'>
                <div className="progress">
                    <h2>Advertising Account Sync </h2>
                    <p>We are syncing your data from Amazon Advertising API. <br/>
                        It could take up to a few minutes.</p>

                    <img src={loader} alt=""/>
                </div>
            </section>
        )
    } else if (pageStatus === 'error') {
        return (<Fragment>
            <section className='connect-ppc-section'>
                <div className="error">
                    <h2>There was an error connecting your <br/> PPC account</h2>
                    <p>
                        Please connect our support to help you connect with Profit Whales.
                    </p>
                </div>

                <div className="actions">
                    <button type={'button'} className="btn white" onClick={onClose}>
                        Home
                    </button>

                    <button className="btn default" onClick={tryAgain}>
                        Try Again
                    </button>
                </div>
            </section>

            <div className="section-description">
                <p>Not the primary account holder?</p>
                <p><Link to={'/'}>Click here</Link> to send them instructions to connect.</p>
            </div>
        </Fragment>)
    } else if (pageStatus === 'success') {
        return (
            <Fragment>
                <section className='connect-ppc-section'>
                    <h2>Amazon Advertising successfully <br/> connected</h2>
                    <p>In the next step we will connect Amazon MWS API. We need it to sync. <br/> your data from Seller
                        Central with Profit Whales.</p>

                    <div className="actions">
                        <button className="btn default" onClick={onGoNextStep}>
                            Next
                            <SVG id={'right-white-arrow'}/>
                        </button>
                    </div>
                </section>

                <div className="section-description">
                    <p>Not the primary account holder?</p>
                    <p><Link to={'/'}>Click here</Link> to send them instructions to connect.</p>
                </div>
            </Fragment>
        )
    }
}

export default ConnectPpc