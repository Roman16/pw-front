import React, {useState} from "react";
import {Link} from "react-router-dom";
import CustomSelect from "../../../../../components/Select/Select";
import {Select} from "antd";
import './ConnectMws.less';
import loader from '../../../../../assets/img/loader.svg';

import {SVG} from "../../../../../utils/icons";
import {useSelector} from "react-redux";

const Option = Select.Option;

const ConnectMws = ({onGoBackStep}) => {
    const [pageStatus, setPageStatus] = useState('connect');

    const [mwsLink] = useSelector(state => ({
        mwsLink: state.user.account_links.length > 0 ? state.user.account_links[0].amazon_mws.connect_link : '',
    }))

    if (pageStatus === 'connect') {
        return (
            <section className='connect-mws-section'>
                <h2>Connect MWS</h2>
                <Link to={'/'}>View Detailed Instructions</Link>
                <h4>Please note that you need to connect the primary account holder. Click <br/> button below to open
                    the
                    Seller Central.</h4>

                <div className="select-marketplace">
                    <label htmlFor="">Select your Amazon Marketplaces:</label>

                    <CustomSelect value={'USACAMX'}>
                        <Option value={'USACAMX'}>North America (USA, CA, MX)</Option>
                        <Option value={'UKDEFRESITINTR'} disabled>Europe (UK, DE, FR, ES, IT, IN, TR)</Option>
                    </CustomSelect>

                    <button className='btn default' onClick={() => window.open(mwsLink)}>Get Credentials</button>
                </div>

                <h4>Then, copy and paste your credentials below:</h4>

                <div className="mws-credentials">
                    <div className="form-group">
                        <label htmlFor="">Seller ID</label>
                        <input
                            type="text"
                            placeholder="This will look like A1BCDE23F4GHIJ"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">MWS Authorization Token</label>
                        <input
                            type="text"
                            placeholder="This will look like amzn.mws. 01234567"
                        />
                    </div>
                </div>

                <div className="actions">
                    <button type={'button'} className="btn white" onClick={onGoBackStep}>
                        <SVG id={'left-grey-arrow'}/>
                        Back
                    </button>
                    <button className="btn default">
                        Next
                        <SVG id={'right-white-arrow'}/>
                    </button>
                </div>
            </section>
        )
    } else if (pageStatus === 'processing') {
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
    }
};

export default ConnectMws;