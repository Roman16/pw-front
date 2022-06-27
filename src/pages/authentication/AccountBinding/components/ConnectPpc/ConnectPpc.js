import React, {useEffect, useState} from "react"
import './ConnectPpc.less'
import {SVG} from "../../../../../utils/icons"
import loader from '../../../../../assets/img/loader.svg'
import {popupCenter} from "../../../../../utils/newWindow"
import {Checkbox} from "antd"
import {userService} from "../../../../../services/user.services"
import {userActions} from "../../../../../actions/user.actions"
import {useDispatch} from "react-redux"

let intervalId

const ConnectPpc = ({onGoNextStep, onGoBackStep, onClose, regionId}) => {
    const [pageStatus, setPageStatus] = useState('connect'),
        [connectLink, setConnectLink] = useState(''),
        [disabledConnect, setDisabledConnect] = useState(true)

    const dispatch = useDispatch()

    const getConnectLink = async () => {
        try {
            const {result} = await userService.getPPCConnectLink({
                regionId: regionId,
                callbackUrl: `${window.location.origin}/ads-callback`
            })

            setConnectLink(result.connection_link)
        } catch (e) {
            console.log(e)
        }
    }

    const openConnectLink = () => {
        setPageStatus('getting-token')

        const win = popupCenter({url: connectLink, title: 'xtf', w: 520, h: 570})

        let timer = setInterval(() => {
            if (win.closed) {
                clearInterval(timer)
                setPageStatus('error')
            }
        }, 2000)

        const checkWindowLocation = async () => {
            const windowLocation = win.location

            if (windowLocation.pathname === '/ads-callback') {
                clearInterval(intervalId)

                const urlParams = new URLSearchParams(windowLocation.search)
                const code = urlParams.get('code'),
                    scope = urlParams.get('scope')

                try {
                    const {result} = await userService.attachAmazonAds({
                        amazon_region_account_id: regionId,
                        code,
                        scope,
                        callback_redirect_uri: `${window.location.origin}/ads-callback`
                    })

                    dispatch(userActions.updateAmazonRegionAccounts(result))

                    onGoNextStep()
                    win.close()
                    clearInterval(timer)
                } catch (e) {
                    setPageStatus('error')
                }
            }
        }

        intervalId = setInterval(checkWindowLocation, 2000)
    }

    const tryAgain = () => setPageStatus('connect')

    useEffect(() => {
        getConnectLink()

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

                <Checkbox checked={!disabledConnect} onChange={({target: {checked}}) => setDisabledConnect(!checked)}>
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
                    Please connect our support to help you connect with Sponsoreds.
                </p>

                <div className="actions">
                    <button className="btn default" onClick={tryAgain}>
                        Try Again
                    </button>

                    <button type={'button'} className="btn white" onClick={onClose}>
                        Back To Home
                    </button>
                </div>
            </section>)
    }
}

export default ConnectPpc