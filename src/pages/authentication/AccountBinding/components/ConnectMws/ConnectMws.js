import React, {Fragment, useEffect, useState} from "react"
import CustomSelect from "../../../../../components/Select/Select"
import {Checkbox} from "antd"
import './ConnectMws.less'
import loader from '../../../../../assets/img/loader.svg'

import {SVG} from "../../../../../utils/icons"
import {popupCenter} from "../../../../../utils/newWindow"
import {userService} from "../../../../../services/user.services"
import {userActions} from "../../../../../actions/user.actions"

let intervalId

const ConnectMws = ({fields, onGoBackStep, onChangeInput, onClose, tryAgainMws, onCancel, disabled = false}) => {
    const [connectLink, setConnectLink] = useState(''),
        [pageStatus, setPageStatus] = useState('connect'),
        [processing, setProcessing] = useState(true),
        [disabledConnect, setDisabledConnect] = useState(true)


    const getCredentialsHandler = () => {
        popupCenter({url: connectLink, title: 'xtf', w: 700, h: 750, importantWidth: true})
    }


    const getConnectLink = async () => {
        setProcessing(true)

        try {
            const {result} = await userService.getMWSConnectLink(fields.region_type)

            setConnectLink(result.connection_link)
        } catch (e) {
            console.log(e)
        }

        setProcessing(false)
    }

    const openConnectLink = () => {
        setPageStatus('getting-token')

        // const win = popupCenter({url: connectLink, title: 'xtf', w: 520, h: 570})

        // let timer = setInterval(() => {
        //     if (win.closed) {
        //         clearInterval(timer)
        //         setPageStatus('error')
        //     }
        // }, 2000)

        // const checkWindowLocation = async () => {
        //     const windowLocation = win.location
        //
        //     if (windowLocation.pathname === '/amazon-ads-api-oauth-callback') {
        //         clearInterval(intervalId)
        //
        //         const urlParams = new URLSearchParams(windowLocation.search)
        //         const id = urlParams.get('selling_partner_id'),
        //             state = urlParams.get('state'),
        //             code = urlParams.get('spapi_oauth_code')
        //
        //         try {
        //             // const {result} = await userService.attachAmazonAds({
        //             //     code,
        //             //     scope,
        //             //     callback_redirect_uri: `${window.location.origin}/amazon-ads-api-oauth-callback`
        //             // })
        //
        //             // dispatch(userActions.updateAmazonRegionAccount(result))
        //
        //             // onGoNextStep()
        //             win.close()
        //             clearInterval(timer)
        //         } catch (e) {
        //             win.close()
        //             setPageStatus('error')
        //         }
        //     }
        // }

        // intervalId = setInterval(checkWindowLocation, 2000)
    }


    useEffect(() => {
        getConnectLink()
    }, [])


    if (pageStatus === 'connect') {
        return (
            <section className='connect-mws-section'>
                <h2>Connect Selling Partner API</h2>

                <p className={'section-description'}>
                    For you to use Sponsoreds services we need programmatic access to your Amazon seller account via
                    Selling Partner API (<a
                    href="https://developer-docs.amazon.com/sp-api/docs" target={'_blank'}>read more about
                    it</a>). <br/>
                    At Sponsoreds, we are dedicated to keeping your information secure and encrypted. <br/>
                    We never share your data with any third-parties. <br/>
                    For any questions related to the security of your data, please feel free to email us at <a
                    href="mailto: info@sponsoreds.com">info@sponsoreds.com</a>.
                    <br/>
                    <br/>
                    Click “Connect” button below and follow authorization workflow <br/>
                    to grant Sponsoreds access to Selling Partner API.
                    <br/>
                    <br/>
                    Please note that you need to log into your Amazon seller account as a primary account holder.
                </p>

                <Checkbox checked={!disabledConnect} onChange={({target: {checked}}) => setDisabledConnect(!checked)}>
                    Connect Selling Partner API
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
    } else if (pageStatus === 'processing') {
        return (
            <section className='connect-mws-section progress'>
                <h2>MWS Account Sync</h2>
                <p>
                    We are syncing your data from MWS API. <br/>
                    It could take up to a few minutes.
                </p>

                <img src={loader} alt=""/>
            </section>
        )
    } else if (pageStatus === 'error') {
        return (
            <Fragment>
                <section className='connect-mws-section error'>
                    <h2>There was an error connecting your <br/> Seller Account</h2>
                    <p>
                        Please contact our support to help you connecting your Seller Account with Sponsoreds.
                    </p>

                    <div className="actions">
                        <button className="btn default" onClick={tryAgainMws}>
                            Try Again
                        </button>

                        <button type={'button'} className="btn home" onClick={onClose}>
                            Back To Home
                        </button>
                    </div>
                </section>
            </Fragment>
        )
    }
}

export default ConnectMws