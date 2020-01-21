import React, {Component, useEffect} from 'react';
import {Icon} from 'antd';
import logo from '../../../../assets/img/zth.svg';
import './MWS.less';
import {connect} from 'react-redux';
import {userActions} from '../../../../actions/user.actions';
import {userService} from '../../../../services/user.services';
import {history} from "../../../../utils/history";

const tapfiliateKey = process.env.REACT_APP_TAPFILIATE_KEY;


class MWS extends Component {
    state = {
        sellerId: '',
        MWSToken: '',
        disabled: false
    };

    handleChangeInput = e => {
        const name = e.target.name,
            value = e.target.value;

        this.setState({
            [name]: value
        });
    };

    saveParams = e => {
        e.preventDefault();
        this.setState({
            disabled: true
        });

        userService
            .setMWS({
                merchant_id: this.state.sellerId,
                mws_auth_token: this.state.MWSToken
            })
            .then(res => {
                this.setState({
                    disabled: false
                });
                this.props.setMWS(res);
                history.push('/ppc');
            });
    };

    componentDidMount() {
        if (this.props.mwsConnected) {
            history.push('/ppc')
        } else if (this.props.mwsConnected && this.props.ppcConnected) {
            history.push('/ppc/dashboard')
        }

        (function (t, a, p) {
            t.TapfiliateObject = a;
            t[a] = t[a] || function () {
                (t[a].q = t[a].q || []).push(arguments)
            }
        })(window, 'tap');

        window.tap('create', tapfiliateKey, {integration: "stripe"});
        window.tap('trial', this.props.stripeId, {meta_data: {status: 'Just registered'}});
    }

    render() {
        const {sellerId, MWSToken, disabled} = this.state;

        return (
            <div className="mws-page">
                <img src={logo} alt="logo"/>

                <h2 className="h2">Sign in and start selling</h2>
                <iframe
                    className="video"
                    src="https://www.youtube.com/embed/lKbV7iOOtDw"
                    frameBorder="0"
                    title="video"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />

                <a
                    className="link"
                    href={this.props.mwsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Link with Amazon MWS
                    <Icon type="arrow-right"/>
                </a>

                <form
                    className="send_form_ajax form-zth-sign"
                    onSubmit={this.saveParams}
                >
                    <input
                        type="hidden"
                        name="_token"
                        value="bM1NHRW2fTMfNW98AsWNbCXj5uHVIvTlC5mAgtFB"
                    />

                    <div className="form-group">
                        <label htmlFor="merchant_id">Seller ID</label>
                        <input
                            type="text"
                            name="sellerId"
                            id="sellerId"
                            value={sellerId}
                            className="form-control"
                            required
                            onChange={this.handleChangeInput}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="mws_auth_token">MWS Auth Token</label>
                        <input
                            type="text"
                            name="MWSToken"
                            id="mws_auth_token"
                            value={MWSToken}
                            className="form-control"
                            required
                            onChange={this.handleChangeInput}
                        />
                    </div>

                    <button type="submit" className="btn green-btn" disabled={disabled}>
                        Save
                        <Icon type="check"/>
                    </button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    mwsLink: state.user.account_links.length > 0 ? state.user.account_links[0].amazon_mws.connect_link : '',
    mwsConnected: state.user.account_links.length > 0 ? state.user.account_links[0].amazon_mws.is_connected : false,
    ppcConnected: state.user.account_links.length > 0 ? state.user.account_links[0].amazon_ppc.is_connected : false,
    stripeId: state.user.user.stripe_id
});

const mapDispatchToProps = dispatch => ({
    setMWS: data => {
        dispatch(userActions.setMWS(data));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MWS);
