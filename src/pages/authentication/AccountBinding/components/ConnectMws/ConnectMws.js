import React, {Fragment, useState} from "react";
import {Link} from "react-router-dom";
import CustomSelect from "../../../../../components/Select/Select";
import {Input, Select} from "antd";
import './ConnectMws.less';
import loader from '../../../../../assets/img/loader.svg';

import {SVG} from "../../../../../utils/icons";
import {useSelector} from "react-redux";

const Option = Select.Option;

const ConnectMws = ({onGoBackStep, onChangeInput, onConnectMws, connectMwsStatus, onClose, tryAgainMws}) => {

    const {mwsLink} = useSelector(state => ({
        mwsLink: state.user.account_links.length > 0 ? state.user.account_links[0].amazon_mws.connect_link : '',
    }))


    if (connectMwsStatus === 'connect') {
        return (
            <section className='connect-mws-section'>
                <form onSubmit={onConnectMws}>
                    <h2>Connect MWS</h2>
                    <Link to={'/videos'}>View Detailed Instructions</Link>
                    <h4>Please note that you need to connect the primary account holder. Click <br/> button below to
                        open
                        the
                        Seller Central.</h4>

                    <div className="select-marketplace">
                        <label htmlFor="">Select your Amazon Marketplaces:</label>

                        <CustomSelect value={'USACAMX'}>
                            <Option value={'USACAMX'}>North America (USA, CA, MX)</Option>
                            <Option value={'UKDEFRESITINTR'} disabled>Europe (UK, DE, FR, ES, IT, IN, TR)</Option>
                        </CustomSelect>

                        <button className='btn default'>
                            <a href={mwsLink} target={'_blank'}>Get Credentials</a>
                        </button>
                    </div>

                    <h4>Then, copy and paste your credentials below:</h4>

                    <div className="mws-credentials">
                        <div className="form-group">
                            <label htmlFor="">Seller ID</label>
                            <Input
                                required
                                type="text"
                                placeholder="This will look like A1BCDE23F4GHIJ"
                                name={'merchant_id'}
                                onChange={onChangeInput}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">MWS Authorization Token</label>
                            <Input
                                required
                                type="text"
                                placeholder="This will look like amzn.mws. 01234567"
                                name={'mws_auth_token'}
                                onChange={onChangeInput}
                            />
                        </div>
                    </div>

                    <div className="actions">
                        {onGoBackStep && <button type={'button'} className="btn white" onClick={onGoBackStep}>
                            <SVG id={'left-grey-arrow'}/>
                            Back
                        </button>}

                        <button className="btn default">
                            Next
                            <SVG id={'right-white-arrow'}/>
                        </button>
                    </div>
                </form>
            </section>
        )
    } else if (connectMwsStatus === 'processing') {
        return (
            <section className='connect-mws-section'>
                <div className="progress">
                    <h2>Account Sync.</h2>
                    <p>We are syncing your data from Amazon Advertising API and MWS API. <br/>It could take up to a few
                        minutes.</p>

                    <img src={loader} alt=""/>
                </div>
            </section>
        )
    } else if (connectMwsStatus === 'error') {
        return (
            <Fragment>
                <section className='connect-mws-section'>
                    <div className="error">
                        <h2>There was an error connecting your <br/> MWS account</h2>
                        <p>
                            Please connect our support to help you connect with Profit Whales.
                        </p>
                    </div>

                    <div className="actions">
                        <button type={'button'} className="btn white" onClick={onClose}>
                            Home
                        </button>

                        <button className="btn default" onClick={tryAgainMws}>
                            Try Again
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
};

export default ConnectMws;