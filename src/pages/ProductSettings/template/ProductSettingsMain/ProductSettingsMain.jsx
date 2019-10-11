import React, { Component } from 'react';
import TableSettings from '../../components/TableSettings';
import './ProductSettingsMain.less';
import Button from '../../../../components/Buttons';

class ProductSettingsMain extends Component {
    state = {};

    render() {
        return (
            <div className="ProductSettingsMain">
                {/* todo create component */}
                <div className="TrialInfo">
                    <div className="page-caption">
                        <h3> Analytics Product Settings</h3>
                    </div>
                    <div className="additional">
                        <div>
                            Free Trial
                            <span className="free-trial">7</span>
                            Days Left
                        </div>
                        <div>
                            <Button
                                onClick={() => {
                                    window.open(
                                        `${window.BASE_URL}/account/subscriptions`,
                                    );
                                }}
                            >
                                Upgrade Now
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="reminder">
                    <div className="reminder-title">Reminder</div>
                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Pellentesque augue eros, convallis a est id, sodales
                        vulputate nisi. Cras dignissim porttitor tortor ut
                        laoreet. Nam in metus id nunc eleifend lacinia ut nec
                        mauris. Nunc posuere sit amet tortor ac laoreet.
                        Pellentesque blandit fringilla ultricies.
                    </div>
                </div>
                <TableSettings />
            </div>
        );
    }
}

ProductSettingsMain.propTypes = {};
ProductSettingsMain.defaultProps = {};

export default ProductSettingsMain;
