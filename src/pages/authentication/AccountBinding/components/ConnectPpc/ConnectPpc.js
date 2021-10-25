import React, {Fragment, useEffect, useState} from "react"
import './ConnectPpc.less'
import {Link} from "react-router-dom"
import {SVG} from "../../../../../utils/icons"
import {useDispatch, useSelector} from "react-redux"
import loader from '../../../../../assets/img/loader.svg'
import {userActions} from "../../../../../actions/user.actions"
import {notification} from "../../../../../components/Notification"
import {popupCenter} from "../../../../../utils/newWindow"
import {Checkbox} from "antd"


let intervalId

const ConnectPpc = ({onGoNextStep, onGoBackStep, onClose}) => {
    const [pageStatus, setPageStatus] = useState('connect'),
        [disabledConnect, setDisabledConnect] = useState(true)
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

            if (windowLocation.origin === 'https://front1.profitwhales.com' || windowLocation.origin === 'https://profitwhales.com' || windowLocation.origin === 'https://app.sponsoreds.com') {
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
            <section className='connect-ppc-section'>
                <h2>Connect Advertising Account</h2>
                <p>To use Sponsoreds we need programmatic access to your Advertising Account. <br/>
                    This access can be granted via Amazon Advertising API (<a target={'_blank'}
                                                                              href="https://advertising.amazon.com/API/docs/en-us/what-is/amazon-advertising-api">read
                        more about it</a>). <br/>
                    Click “Connect” button below and follow authorization workflow to grant Sponsoreds <br/> access to
                    Amazon Advertising API.
                </p>

                <Checkbox checked={disabledConnect} onChange={({target: {checked}}) => setDisabledConnect(!checked)}>
                    Connect Amazon Advertising API
                </Checkbox>

                <div className="actions">
                    <div className="row">
                        {onGoBackStep && <button type={'button'} className="btn grey back" onClick={onGoBackStep}>
                            <SVG id={'left-grey-arrow'}/>
                            Back
                        </button>}

                        <button disabled={disabledConnect} className="btn default next"
                                onClick={openConnectLink}>
                            Connect
                        </button>
                    </div>

                    <button className="btn cancel" onClick={onClose}>
                        Cancel
                    </button>
                </div>

                {/*<div className="connect-ppc-links">*/}
                {/*    <p>Don’t have access to Seller Central?</p>*/}
                {/*    <p><Link to={'/affiliates'}>Invite person who does</Link></p>*/}
                {/*</div>*/}
            </section>
        )
    } else if (pageStatus === 'getting-token' || pageStatus === 'syncing-data') {
        return (
            <section className='connect-mws-section progress'>
                <h2>Amazon Account Synchronization</h2>
                <p>We are syncing your data from MWS API and Amazon Advertising API <br/> with our system. It could take
                    up to a few minutes.</p>

                <img src={loader} alt=""/>
            </section>
        )
    } else if (pageStatus === 'error') {
        return (
            <section className='connect-ppc-section error'>
                <h2>There was an error connecting your <br/> PPC account</h2>
                <p>
                    Please connect our support to help you connect with Profit Whales.
                </p>

                <div className="actions">
                    <button className="btn default" onClick={tryAgain}>
                        Try Again
                    </button>

                    <button type={'button'} className="btn white" onClick={onClose}>
                        Back To Home
                    </button>
                </div>

                {/*<div className="connect-ppc-links">*/}
                {/*    <p>Not the primary account holder?</p>*/}
                {/*    <p><Link to={'/'}>Click here</Link> to send them instructions to connect.</p>*/}
                {/*</div>*/}
            </section>)
    }
}

export default ConnectPpc