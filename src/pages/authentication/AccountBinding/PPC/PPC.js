import React, {Component} from 'react';
import {Icon} from 'antd'
import {connect} from 'react-redux';

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
                        href={this.props.ppcLink}
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

const mapStateToProps = state => ({
    ppcLink: state.user.account_links.amazon_ppc.connect_link
});

export default connect(mapStateToProps)(PPC);