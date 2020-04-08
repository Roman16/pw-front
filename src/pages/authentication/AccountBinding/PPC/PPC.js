import React, {useEffect} from 'react';
import {Icon} from 'antd';
import {useSelector, useDispatch} from 'react-redux';

import logo from '../../../../assets/img/zth.svg';
import './PPC.less';
import {history} from "../../../../utils/history";
import {userActions} from "../../../../actions/user.actions";
import {notification} from "../../../../components/Notification";

let intervalId = null;

const PPC = (props) => {
    const {ppcLink, mwsConnected, ppcConnected} = useSelector(state => ({
            ppcLink: state.user.account_links.length > 0 ? state.user.account_links[0].amazon_ppc.connect_link : '',
            mwsConnected: state.user.account_links.length > 0 ? state.user.account_links[0].amazon_mws.is_connected : false,
            ppcConnected: state.user.account_links.length > 0 ? state.user.account_links[0].amazon_ppc.is_connected : false,
        })),
        token = localStorage.getItem('token');

    const dispatch = useDispatch();

    const redirectLink = `${ppcLink}&state=${token}`;

    function getStatus() {
        if (!ppcConnected) {
            intervalId = setTimeout(() => {
                dispatch(userActions.getPersonalUserInfo());

                getStatus();
            }, 5000)
        } else {
            clearTimeout(intervalId);
        }
    }

    useEffect(() => {
        if (ppcConnected) {
            clearTimeout(intervalId);
            history.push('/ppc/dashboard')
        }
    }, [ppcConnected]);

    useEffect(() => {
        if (!mwsConnected) {
            history.push('/mws')
        } else if (ppcConnected) {
            history.push('/ppc/dashboard')
        } else if (props.location.search && props.location.search.indexOf('?status=') !== -1) {
            // userActions.setPpcStatus({status: props.location.search.split('?status=')[1]})
        } else if (props.location.search && props.location.search.indexOf('?error_message=') !== -1) {
            notification.error({title: props.location.search.split('?error_message=')[1].split('+').join(' ')})
        } else {
            getStatus();
        }

        return (() => {
            clearTimeout(intervalId);
        })
    }, []);

    return (
        <div className="ppc-page">
            <img src={logo} alt=""/>

            <h2 className="h2">Sign in and start selling</h2>

            <iframe
                className="video"
                src="https://www.youtube.com/embed/SRhhgDVB0jk"
                frameBorder="0"
                title="video"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />

            <a
                className="link"
                href={redirectLink}
                rel="noopener noreferrer"
            >
                Link with Amazon PPC
                <Icon type="arrow-right"/>
            </a>
        </div>
    );
};

export default PPC;
