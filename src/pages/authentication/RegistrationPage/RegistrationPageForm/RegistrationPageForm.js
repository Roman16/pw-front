import React, {Component, useEffect} from 'react';
import {Form, Input, Spin} from 'antd';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {notification} from '../../../../components/Notification';

import {userActions} from '../../../../actions/user.actions';
import Cookies from 'js-cookie';

class RegistrationPage extends Component {
    state = {
        name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    onSubmit = async (e) => {
        e.preventDefault();

        if (!this.props.notFirstEntry) {
            this.props.resetState()
        }

        const {
            name,
            last_name,
            email,
            password,
            confirmPassword,
        } = this.state;

        // eslint-disable-next-line no-useless-escape
        const fieldEmailValid = /^([a-zA-Z0-9_\.-]+)@([a-zA-Z0-9_\.-]+)\.([a-zA-Z\.]{2,6})$/.test(
            email
        );

        if (!name) {
            notification.error({
                title: 'Name must be filled out.',
            });
            return;
        } else if (password.length < 6) {
            notification.error({
                title: 'The password must be at least 6 characters.',
            });
            this.setState({
                isLoading: false
            });
            return;
        } else if (!fieldEmailValid) {
            notification.error({
                title: 'Invalid email address',
            });
            this.setState({
                isLoading: false
            });
            return;
        } else if (password !== confirmPassword) {
            notification.error({
                title: 'Your passwords don’t match',
            });
            this.setState({
                isLoading: false
            });
            return;
        } else {
            if (this.props.match.params.tag && this.props.match.params.tag === 'from-agency') {
                localStorage.setItem('userFromAgency', email);
            }

            this.props.regist({
                name,
                last_name,
                email,
                password,
                ...this.props.match.params.tag && this.props.match.params.tag === 'from-agency' && {is_agency_client: 1},
                ...Cookies.get('_ga') && {'ga_cid': Cookies.get('_ga')}
            });
        }
    };


    onChange = ({target: {name, value}}) => this.setState({[name]: value});

    componentDidMount() {
        this.setState({isLoading: false});
    }

    render() {
        const {
            name,
            last_name,
            email,
            password,
            confirmPassword,
            registerSuccess,
            isLoading,
        } = this.state;

        if (isLoading) {
            return (
                <div className="example">
                    <Spin size="large"/>
                </div>
            );
        }

        if (registerSuccess) {
            return <Redirect to="/optimization"/>;
        }

        return (
            <Form className="form " id="payment-form2" onSubmit={this.onSubmit}>
                <div className='row'>
                    <Form.Item className="input-form-group">
                        <Input
                            className="email-input"
                            type="text"
                            name="name"
                            id="name"
                            placeholder="First name"
                            value={name}
                            onChange={this.onChange}
                            required={true}
                        />
                    </Form.Item>

                    <Form.Item className="input-form-group">
                        <Input
                            className="email-input"
                            type="text"
                            name="last_name"
                            id="last-name"
                            placeholder="Last name"
                            value={last_name}
                            onChange={this.onChange}
                        />
                    </Form.Item>
                </div>

                <Form.Item className="input-form-group">
                    <Input
                        className="email-input"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={this.onChange}
                        required={true}
                    />
                </Form.Item>

                <Form.Item className="input-form-group">
                    <Input
                        className="password-input"
                        type={'password'}
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={this.onChange}
                        required={true}
                    />
                </Form.Item>

                <Form.Item className="input-form-group">
                    <Input
                        className="password-input"
                        type={'password'}
                        name="confirmPassword"
                        placeholder="Repeat password"
                        value={confirmPassword}
                        onChange={this.onChange}
                    />
                </Form.Item>

                <div className='terms-and-privacy'>
                    By signing in, you agree to Profit Whales <b><Link target="_blank" to={'/terms-and-conditions'}> Terms
                    and <br/> Conditions</Link> & <Link target="_blank" to={'/policy'}>Privacy Policy</Link></b>
                </div>

                <button type='submit'
                        className="btn default"
                >
                    sign up
                </button>
            </Form>
        );
    }
}

const mapStateToProps = state => ({
    notFirstEntry: state.user.notFirstEntry
});

const mapDispatchToProps = dispatch => ({
    regist: user => {
        dispatch(userActions.regist(user));
    },
    resetState: () => {
        dispatch(userActions.reSetState())
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegistrationPage);
