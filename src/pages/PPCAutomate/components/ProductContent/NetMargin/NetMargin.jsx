import React, { Component } from 'react';
import { Modal } from 'antd';
import Button from '../../../../../components/Buttons';
import Warning from '../../../../../assets/img/icons/warning.svg';
import './NetMargin.less';


class NetMargin extends Component {
    render() {
        const { isShowModal = true } = this.props;

        console.log(isShowModal);


        return (
            <Modal
                visible={isShowModal}
            >
                <div className="NetMargin">

                    <div className="net-margin-content">
                        <div className="net-margin-header">
                            <img src={Warning} alt="warning" />
                            <h3>Attention!</h3>
                            <p>We need your Product Net Margin to start the optimization.</p>
                        </div>
                        NetMargin
                        <Button> Start </Button>
                    </div>
                </div>
            </Modal>

        );
    }
}

NetMargin.propTypes = {};

NetMargin.defaultProps = {};

export default NetMargin;
