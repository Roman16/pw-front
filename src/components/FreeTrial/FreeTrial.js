import React from 'react';
import { connect } from 'react-redux';
import { Icon, Button } from 'antd';
import moment from 'moment';

import './FreeTrial.less';

const FreeTrial = ({ expireIn }) => {
    const todaysDate = moment(new Date());
    const oDate = moment(expireIn * 1000);
    const freeTrial = oDate.diff(todaysDate, 'days');

    return (
        <div className="additional">
            <p className="free-trial">
                Free Trial
                <span>{freeTrial >= 0 ? freeTrial : 0}</span>
                Days Left
            </p>
            <div className="btn-upgrade">
                <Button
                    onClick={() => {
                        window.open(`/account/subscriptions`);
                    }}
                >
                    Upgrade Now
                    <Icon type="arrow-up" style={{ color: '#8fd39d' }} />
                </Button>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    expireIn: state.user.plans && state.user.plans.ppc_automation.expire_in
});

export default connect(mapStateToProps)(FreeTrial);
