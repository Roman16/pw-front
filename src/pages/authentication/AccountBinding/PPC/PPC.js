import React from 'react';
import {Icon} from 'antd'
import {useSelector} from 'react-redux';

import logo from '../../../../assets/img/zth.svg';
import './PPC.less';

const PPC = () => {
    const {ppcLink, token} = useSelector(state => ({
        ppcLink: state.user.account_links ? state.user.account_links.amazon_ppc.connect_link : '',
        token: state.user.access_token
    }));

    const redirectLink = `${ppcLink}&token=${token}`;

    return (
        <div className="ppc-page">
            <div className="sign-inner">
                <img src={logo} alt=""/>

                <h2 className="h2">Sign in and start selling</h2>

                <iframe
                    style={{width: '750px', height: '422px'}}
                    src="https://www.youtube.com/embed/dBCnEJ4Rjo4"
                    frameBorder="0"
                    title='video'
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen=""/>

                <br/>
                <br/>

                <a
                    href={redirectLink}
                    className="link"
                >
                    Link with Amazon PPC
                    <Icon type="arrow-right"/>
                </a>
            </div>
        </div>
    );
};


export default PPC;