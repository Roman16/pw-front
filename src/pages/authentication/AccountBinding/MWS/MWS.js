import React, {Component} from 'react';
import {Icon} from 'antd'
import logo from '../../../../assets/img/zth.svg';
import './MWS.less';
import { connect } from 'react-redux';
import {userActions} from "../../../../actions/user.actions";

class MWS extends Component {
    state = {
        sellerId: '',
        MWSToken: ''
    };

    handleChangeInput = (e) => {
        const name = e.target.name,
            value = e.target.value;

        this.setState({
            [name]: value
        })
    };

    saveParams = (e) => {
        e.preventDefault();

        console.log(this.state)
    };

    render() {
        const {
            sellerId,
            MWSToken
        } = this.state;

        console.log(this.props);

        return (
            <div className='mws-page'>
                <img src={logo} alt=""/>

                <h2 className="h2">Sign in and start selling</h2>
                <div className="inner-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </div>

                <a href={this.props.mwsLink} target='_blank' className="link">
                    Link with Amazon MWS
                    <Icon type="arrow-right"/>
                </a>

                <form className="send_form_ajax form-zth-sign" onSubmit={this.saveParams}>
                    <input type="hidden" name="_token" value="bM1NHRW2fTMfNW98AsWNbCXj5uHVIvTlC5mAgtFB"/>

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

                    <button type="submit" className="btn">
                        Save
                        <Icon type="check"/>
                    </button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    mwsLink: state.user.account_links.amazon_mws.connect_link
});

const mapDispatchToProps = dispatch => ({
    login: data => {
        dispatch(userActions.login(data));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MWS);