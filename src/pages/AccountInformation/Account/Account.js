import React, { Component } from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

class Account extends Component {
    state = {};

    handleChangeTab = key => {
        console.log('key :', key);
    };

    render() {
        return (
            <div className="dashboard-ao">
                <div className="zth-content">
                    <div className="container">
                        <div className="user-cabinet">
                            <div className="cabiner-card">
                                <Tabs
                                    defaultActiveKey="1"
                                    onChange={this.callback}
                                >
                                    <TabPane tab="Tab 1" key="1">
                                        Content of Tab Pane 1
                                    </TabPane>
                                    <TabPane tab="Tab 2" key="2">
                                        Content of Tab Pane 2
                                    </TabPane>
                                    <TabPane tab="Tab 3" key="3">
                                        Content of Tab Pane 3
                                    </TabPane>
                                </Tabs>

                                <ul className="cabinet-navigation">
                                    <li className="current-page">
                                        <a href="index.html">Account</a>
                                    </li>
                                    <li>
                                        <a href="no-data-new.html">
                                            Account (New)
                                        </a>
                                    </li>
                                    <li>
                                        <a href="billing.html">
                                            Billing (One Card)
                                        </a>
                                    </li>
                                    <li>
                                        <a href="billing-multiple-cards.html">
                                            Billing (Multiple)
                                        </a>
                                    </li>
                                    <li>
                                        <a href="billing-no-data.html">
                                            Billing (No Data)
                                        </a>
                                    </li>
                                    <li>
                                        <a href="subscriptions.html">
                                            Subscriptions
                                        </a>
                                    </li>
                                    <li>
                                        <a href="modals.html">Modals </a>
                                    </li>
                                </ul>
                                <div className="personal-information">
                                    <div className="inner-container">
                                        <div className="row">
                                            <div className="col-md-2 avatar-col">
                                                <form
                                                    method="GET"
                                                    action="https://profitwhales.com/settings/save-avatar"
                                                >
                                                    <input
                                                        type="hidden"
                                                        name="_token"
                                                        value="sIGq5CfMKq2Irl6XhY2croJZQpMbZlqhuourpQ9P"
                                                    />
                                                    <div className="avatar">
                                                        <div className="avatar-photo">
                                                            <img
                                                                src=""
                                                                alt="avatar"
                                                            />
                                                        </div>
                                                        <div className="delete hide">
                                                            <img
                                                                src="../img/admin/delete-icon.svg"
                                                                alt="delete"
                                                            />
                                                        </div>
                                                    </div>
                                                    <input
                                                        id="avatar-file"
                                                        onchange="this.form.submit();"
                                                        type="file"
                                                        name="avatar_file"
                                                    />
                                                </form>
                                            </div>
                                            <div className="col-md-10">
                                                <form
                                                    id="personal-information"
                                                    method="POST"
                                                    action="https://profitwhales.com/settings"
                                                >
                                                    <input
                                                        type="hidden"
                                                        name="_token"
                                                        value="sIGq5CfMKq2Irl6XhY2croJZQpMbZlqhuourpQ9P"
                                                    />
                                                    <div className="row top-row">
                                                        <div className="col-md-6 description-col">
                                                            <h3>
                                                                Your Personal
                                                                Information
                                                            </h3>
                                                            <p>
                                                                Upload your
                                                                photo and paste
                                                                the relevant
                                                                information
                                                            </p>
                                                        </div>
                                                        <div className="col-md-6 form-group check-toggle-group">
                                                            <label>
                                                                Are you privat
                                                                lable seller?
                                                            </label>
                                                            <label className="toggle-container">
                                                                <input type="checkbox" />
                                                                <div className="check">
                                                                    <span className="circle"></span>
                                                                </div>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-3 form-group">
                                                            <label>
                                                                First Name
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                id="name"
                                                                type="text"
                                                                name="name"
                                                                value="Ihor"
                                                                data-current="Ihor"
                                                                required=""
                                                                autofocus=""
                                                            />
                                                        </div>
                                                        <div className="col-md-3 form-group">
                                                            <label>
                                                                Last Name
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                id="surname"
                                                                type="text"
                                                                name="surname"
                                                                value="Ihor"
                                                                data-current="Ihor"
                                                                required=""
                                                            />
                                                        </div>
                                                        <div className="col-md-3 form-group">
                                                            <label>
                                                                Email Adress
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                id="email"
                                                                type="email"
                                                                name="email"
                                                                value="profitwhales.soft@gmail.com"
                                                                data-current="profitwhales.soft@gmail.com"
                                                                required=""
                                                            />
                                                        </div>
                                                        <div className="col-md-3 btn-col">
                                                            <button
                                                                className="btn btn-violet uppercase"
                                                                disabled=""
                                                            >
                                                                save changes
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="passwords cabiner-card">
                                <div className="inner-container">
                                    <div className="row">
                                        <div className="col-md-2 lock-col">
                                            <img
                                                src="../img/admin/lock.svg"
                                                alt="lock"
                                            />
                                        </div>
                                        <div className="col-md-10">
                                            <h3>Passwords</h3>
                                            <form
                                                id="passwords-form"
                                                method="POST"
                                                action="https://profitwhales.com/settings/force-change-password"
                                            >
                                                <input
                                                    type="hidden"
                                                    name="_token"
                                                    value="sIGq5CfMKq2Irl6XhY2croJZQpMbZlqhuourpQ9P"
                                                />
                                                <div className="row">
                                                    <div className="col-md-3 form-group">
                                                        <label>
                                                            Old Password
                                                        </label>
                                                        <div className="input-wrap">
                                                            <input
                                                                className="form-control"
                                                                id="current_password"
                                                                type="password"
                                                                name="current_password"
                                                                required=""
                                                            />
                                                            <span className="show-password">
                                                                <img
                                                                    className="opened"
                                                                    src="../img/admin/eye.svg"
                                                                    alt="eye"
                                                                />
                                                                <img
                                                                    className="closed"
                                                                    src="../img/admin/eye-closed.svg"
                                                                    alt="eye"
                                                                />
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3 form-group">
                                                        <label>
                                                            New Password
                                                        </label>
                                                        <div className="input-wrap">
                                                            <input
                                                                className="form-control"
                                                                id="password"
                                                                type="password"
                                                                name="password"
                                                                value=""
                                                                required=""
                                                                autofocus=""
                                                            />
                                                            <span className="show-password">
                                                                <img
                                                                    className="opened"
                                                                    src="../img/admin/eye.svg"
                                                                    alt="eye"
                                                                />
                                                                <img
                                                                    className="closed"
                                                                    src="../img/admin/eye-closed.svg"
                                                                    alt="eye"
                                                                />
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3 form-group">
                                                        <label>
                                                            Repeat New Password
                                                        </label>
                                                        <div className="input-wrap">
                                                            <input
                                                                className="form-control"
                                                                id="password-confirm"
                                                                type="password"
                                                                name="password_confirmation"
                                                                required=""
                                                            />
                                                            <span className="show-password">
                                                                <img
                                                                    className="opened"
                                                                    src="../img/admin/eye.svg"
                                                                    alt="eye"
                                                                />
                                                                <img
                                                                    className="closed"
                                                                    src="../img/admin/eye-closed.svg"
                                                                    alt="eye"
                                                                />
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3 form-group button-col align-bottom">
                                                        <button
                                                            className="btn btn-violet btn-long uppercase"
                                                            disabled=""
                                                        >
                                                            Change
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="connectors cabiner-card">
                                <div className="inner-container">
                                    <div className="title-connectors">
                                        <h2>ProfitWhales Connectors</h2>
                                        <div className="sub">
                                            Certain Helium 10 tools require
                                            acess to third party services (such
                                            as Amazon Seller Central, Amazon
                                            Advertising or Facebook Marketing
                                            account). You can use the section
                                            below to grant or revoke access.
                                        </div>
                                    </div>
                                    <div className="table-container">
                                        <table id="helium-table">
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div className="product-title">
                                                            <div className="title">
                                                                Amazon MWS
                                                                (Seller Central)
                                                                - North America
                                                                (US/CA/MX/BR)
                                                            </div>
                                                            <a
                                                                className="more-link"
                                                                href="https://profitwhales.com/automation"
                                                            >
                                                                Show me what to
                                                                do
                                                            </a>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-violet add-token">
                                                            Add token
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="product-title">
                                                            <div className="title">
                                                                Amazon MWS
                                                                (Seller Central)
                                                                - Europe
                                                                (UK/DE/FR/ES/IT/IN/TR)
                                                            </div>
                                                            <a
                                                                className="more-link"
                                                                href="https://profitwhales.com/automation"
                                                            >
                                                                Show me what to
                                                                do
                                                            </a>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-violet add-token">
                                                            Soon...
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="product-title">
                                                            <div className="title">
                                                                Amazon MWS
                                                                (Seller Central)
                                                                - North America
                                                                (US/CA/MX)
                                                            </div>
                                                            <a
                                                                className="more-link"
                                                                href="https://profitwhales.com/automation"
                                                            >
                                                                Show me what to
                                                                do
                                                            </a>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="actions">
                                                            <a href="https://profitwhales.com/automation">
                                                                <span className="img">
                                                                    <img
                                                                        src="../img/admin/check-blue.svg"
                                                                        alt="check"
                                                                    />
                                                                </span>
                                                            </a>
                                                            <a href="https://profitwhales.com/automation">
                                                                <span className="img">
                                                                    <img
                                                                        src="../img/admin/remove-blue.svg"
                                                                        alt="remove"
                                                                    />
                                                                </span>
                                                            </a>
                                                            <a href="https://profitwhales.com/automation">
                                                                <span className="img">
                                                                    <img
                                                                        src="../img/admin/refresh-blue.svg"
                                                                        alt="refresh"
                                                                    />
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Account;
