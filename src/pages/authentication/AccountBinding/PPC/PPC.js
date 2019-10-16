import React, {Component} from 'react';
import {Icon} from 'antd'
import logo from '../../../../assets/img/zth.svg';
import './PPC.less';

class PPC extends Component {
    state = {
        sellerId: '',
        MWSToken: ''
    };

    render() {
        return (
            <div className="ppc-page">
                <div className="sign-inner">
                    <img src={logo} alt="" />

                    <h2 className="h2">Sign in and start selling</h2>

                    <iframe
                        style={{ width: '750px', height: '422px' }}
                        src="https://www.youtube.com/embed/dBCnEJ4Rjo4"
                        frameBorder="0"
                        title='video'
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen="" />

                    <br />
                    <br />

                    <a
                        href="https://www.amazon.com/ap/oa?client_id=amzn1.application-oa2-client.8868f12ea2514f79b0348dfcf7ee06ae&amp;scope=cpc_advertising:campaign_management&amp;response_type=code&amp;redirect_uri=https://profitwhales.com/amazon/lwa/callback"
                        className="link"
                    >
                        Link with Amazon PPC
                        <Icon type="arrow-right" />
                    </a>
                </div>
            </div>
        );
    }
}

export default PPC;