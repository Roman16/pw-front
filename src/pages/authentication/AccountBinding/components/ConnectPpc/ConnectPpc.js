import React, {Fragment, useState} from "react";
import './ConnectPpc.less';
import {Link} from "react-router-dom";
import {SVG} from "../../../../../utils/icons";
import {useSelector} from "react-redux";
import loader from '../../../../../assets/img/loader.svg';


const popupCenter = ({url, title, w, h}) => {
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : window.screen.width;
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : window.screen.height;

    const systemZoom = width / window.screen.availWidth;
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


const ConnectPpc = ({onGoNextStep}) => {
    const [pageStatus, setPageStatus] = useState('connect');

    const {ppcLink} = useSelector(state => ({
        ppcLink: state.user.account_links.length > 0 ? state.user.account_links[0].amazon_ppc.connect_link : null,
    }));

    const openConnectLink = () => {
        const win = popupCenter({url: ppcLink, title: 'xtf', w: 520, h: 570});

        setPageStatus('processing');

        window.addEventListener('message', event => {
            if (event.origin === 'https://front1.profitwhales.com' || event.origin === 'https://profitwhales.com') {
                win.close();
                setPageStatus('success');
            }
        })
    }

    if (pageStatus === 'connect') {
        return (
            <Fragment>
                <section className='connect-ppc-section'>
                    <h2>Connect Amazon Advertising</h2>
                    <p>To use Profit Whales we need access to your Amazon Advertising <br/> account. Please grant
                        access.
                    </p>

                    <div className="actions">
                        <button className={'btn white'}>Cancel</button>
                        <button className={'btn default'} onClick={openConnectLink}>Connect Amazon Advertising</button>
                    </div>
                </section>

                <div className="section-description">
                    <p>Don’t have access to Seller Central?</p>
                    <p><Link to={'/affiliates'}>Invite person who does</Link></p>
                </div>
            </Fragment>
        )
    } else if (pageStatus === 'processing') {
        return (
            <section className='connect-mws-section'>
                <div className="progress">
                    <h2>Account Sync.</h2>
                    <p>We are syncing your data from Amazon Advertising API. <br/>It could take up to a few
                        minutes.</p>

                    <img src={loader} alt=""/>
                </div>
            </section>
        )
    } else if (pageStatus === 'error') {
        return '';
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
};

export default ConnectPpc;