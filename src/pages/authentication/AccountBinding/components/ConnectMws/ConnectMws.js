import React, {Fragment, useEffect, useState} from "react"
import CustomSelect from "../../../../../components/Select/Select"
import {Input, Select, Spin} from "antd"
import './ConnectMws.less'
import loader from '../../../../../assets/img/loader.svg'

import {SVG} from "../../../../../utils/icons"
import {popupCenter} from "../../../../../utils/newWindow"
import {userService} from "../../../../../services/user.services"

const Option = Select.Option

const ConnectMws = ({fields, onGoBackStep, onChangeInput, onConnectMws, connectMwsStatus, onClose, tryAgainMws, onCancel, disabled = false}) => {
    const [connectLink, setConnectLink] = useState(''),
        [processing, setProcessing] = useState(true)

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

    useEffect(() => {
        getConnectLink()
    }, [])


    if (connectMwsStatus === 'connect') {
        return (
            <section className='connect-mws-section'>
                <h2>Connect Seller Account</h2>
                <p className={'section-description'}>
                    To use Sponsoreds we need programmatic access to your Seller Account. <br/>
                    This access can be granted via Amazon MWS API (<a
                    href="http://docs.developer.amazonservices.com/en_US/dev_guide/DG_IfNew.html" target={"_blank"}>read
                    more about it</a>). <br/>
                    Сlick “Get Credentials” button below to open Amazon Seller Central MWS registration page. <br/>
                    Follow authorization workflow to grant Sponsoreds access to MWS API. <br/>
                    At the last step, copy your {!disabled && '“Seller Id” and'} “MWS Authorization Token” and paste
                    them below.
                    <br/>
                    <br/>
                    Please note that you need to log into your Amazon seller account as the primary account holder.
                </p>

                <div className="form-group select-marketplace">
                    <label htmlFor="">You are connecting {fields.region_type === 'NORTH_AMERICA' ? 'North America (US, CA, MX, BR)' : 'Europe (UK, DE, FR, ES, IT, IN, TR)'}  region</label>

                    <button disabled={processing} className='btn default' onClick={getCredentialsHandler}>
                        Get Credentials

                        {processing && <Spin size={'small'}/>}
                    </button>
                </div>

                <h4>Paste your credentials below:</h4>

                <div className="mws-credentials">
                    <div className="form-group required">
                        <label htmlFor="">Seller ID <i>*</i></label>
                        <Input
                            type="text"
                            placeholder="e.g. A1BCDE23F4GHIJ"
                            name={'seller_id'}
                            onChange={onChangeInput}
                            value={fields.seller_id}
                            disabled={disabled}
                        />
                    </div>
                    <div className="form-group required">
                        <label htmlFor="">MWS Authorization Token <i>*</i></label>
                        <Input
                            type="text"
                            placeholder="e.g. amzn.mws. 01234567"
                            name={'mws_auth_token'}
                            onChange={onChangeInput}
                        />
                    </div>
                </div>

                <div className="actions">
                    <div className="row">
                        {onGoBackStep && <button type={'button'} className="btn grey back" onClick={onGoBackStep}>
                            <SVG id={'left-grey-arrow'}/>
                            Back
                        </button>}

                        <button disabled={!fields.seller_id || !fields.mws_auth_token} className="btn default next"
                                onClick={onConnectMws}>
                            Next
                            <SVG id={'right-white-arrow'}/>
                        </button>
                    </div>

                    <button className="btn cancel" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </section>
        )
    } else if (connectMwsStatus === 'processing') {
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
    } else if (connectMwsStatus === 'error') {
        return (
            <Fragment>
                <section className='connect-mws-section error'>
                    <h2>There was an error connecting your <br/> Seller Account</h2>
                    <p>
                        Please connect our support to help you connecting your Seller Account with Sponsoreds.
                    </p>

                    <div className="actions">
                        <button className="btn default" onClick={tryAgainMws}>
                            Try Again
                        </button>

                        <button type={'button'} className="btn home" onClick={onClose}>
                            Back To Home
                        </button>
                    </div>

                    {/*<div className="mws-error-links">*/}
                    {/*    <p>Not the primary account holder?</p>*/}
                    {/*    <p>Click <Link to={'/'}>here</Link> to send them instructions to connect.</p>*/}
                    {/*</div>*/}
                </section>
            </Fragment>
        )
    }
}

export default ConnectMws