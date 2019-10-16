import React, {Component} from 'react';
import {Icon} from 'antd'
import logo from '../../../../assets/img/zth.svg';
import './MWS.less';

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

                <a href="https://sellercentral.amazon.com/gp/mws/registration/register.html?signInPageDisplayed=1&amp;developerName=Profit+Whales&amp;devMWSAccountId=055276142352"
                   className="link">
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

export default MWS;