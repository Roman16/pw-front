import React, {useEffect, useState} from "react"
import './ConnectAdsApi.less'
import {SVG} from "../../../../../utils/icons"
import loader from '../../../../../assets/img/loader.svg'
import {popupCenter} from "../../../../../utils/newWindow"
import {Checkbox} from "antd"
import {userService} from "../../../../../services/user.services"
import {userActions} from "../../../../../actions/user.actions"
import {useDispatch} from "react-redux"

let intervalId

const ConnectAdsApi = ({onGoNextStep, onGoBackStep, onClose, regionId}) => {
    const [pageStatus, setPageStatus] = useState('connect'),
        [connectLink, setConnectLink] = useState(''),
        [disabledConnect, setDisabledConnect] = useState(true)

    const dispatch = useDispatch()

    const getConnectLink = async () => {
        try {
            const {result} = await userService.getPPCConnectLink({
                regionId: regionId,
                callbackUrl: `${window.location.origin}/amazon-ads-api-oauth-callback`
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

            if (windowLocation.pathname === '/amazon-ads-api-oauth-callback') {
                clearInterval(intervalId)

                const urlParams = new URLSearchParams(windowLocation.search)
                const code = urlParams.get('code'),
                    scope = urlParams.get('scope')

                try {
                    const {result} = await userService.attachAdsCredentials({
                        amazon_region_account_id: regionId,
                        code,
                        scope,
                        callback_redirect_uri: `${window.location.origin}/amazon-ads-api-oauth-callback`
                    })

                    dispatch(userActions.updateAmazonRegionAccount(result))

                    onGoNextStep()
                    win.close()
                    clearInterval(timer)
                } catch (e) {
                    win.close()
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
                <h2>Connect Amazon Ads API</h2>
                <p>
                    For you to use Sponsoreds services we need programmatic access to your Amazon advertising account via Amazon Ads API (<a
                    href="https://advertising.amazon.com/API/docs/en-us/index" target={'_blank'}>read more about it</a>). <br/>
                    At Sponsoreds, we are dedicated to keeping your information secure and encrypted. <br/>
                    We never share your data with any third-parties. <br/>
                    For any questions related to the security of your data, please feel free to email us at <a
                    href="mailto: info@sponsoreds.com">info@sponsoreds.com</a>.
                    <br/>
                    <br/>
                    Click “Connect” button below and follow authorization workflow <br/> to grant Sponsoreds access to Amazon Ads API.
                    <br/>
                    <br/>
                    Please note that you need to log into your Amazon seller account as a primary account holder.
                </p>

                <Checkbox checked={!disabledConnect} onChange={({target: {checked}}) => setDisabledConnect(!checked)}>
                    Connect Amazon Ads API
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
                <p>We are syncing your data from SP API and Amazon Advertising API <br/> with our system. It could take
                    up to a few minutes.</p>

                <img src={loader} alt=""/>
            </section>
        )
    } else if (pageStatus === 'error') {
        return (
            <section className='connect-ppc-section error'>
                <h2>There was an error connecting your <br/> PPC account</h2>
                <p>
                    Please contact our support to help you connect with Sponsoreds.
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

export default ConnectAdsApi