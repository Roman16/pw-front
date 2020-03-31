import React from "react";
import {Form, Row, Input, Checkbox, Spin} from "antd";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";
import {notification} from "../../../../components/Notification";
import {userActions} from "../../../../actions/user.actions";
import amazonImage from '../../../../assets/img/amazon.png';
import {SVG} from "../../../../utils/icons";

class LoginPageForm extends React.Component {
    state = {
        email: "",
        password: "",
        remember_me: false,
        isLoading: false,
        loginSuccess: false,
        passwordType: true
    };

    onChange = ({target}) => {
        this.setState({[target.name]: target.value});
    };

    onSubmit = e => {
        e.preventDefault();
        if (!this.props.notFirstEntry) {
            this.props.resetState();
        }

        const {email, password, remember_me} = this.state;
        this.setState({isLoading: true});

        // eslint-disable-next-line no-useless-escape
        const fieldEmailValid = /^([a-zA-Z0-9_\.-]+)@([a-zA-Z0-9_\.-]+)\.([a-zA-Z\.]{2,6})$/.test(
            email
        );

        if (password.length < 6) {
            notification.error({
                title: "The password must be at least 6 characters."
            });
            this.setState({
                isLoading: false
            });
            return;
        } else if (email.length === 0) {
            notification.error({
                title: "The letter must contain at least 1 character."
            });
            this.setState({
                isLoading: false
            });
            return;
        } else if (!fieldEmailValid) {
            notification.error({
                title: "Invalid email address"
            });
            this.setState({
                isLoading: false
            });
            return;
        }

        this.props.login({
            email,
            password,
            remember_me,
        });

        this.setState({
            isLoading: false
        });
    };

    switchPasswordType = () => {
        this.setState((state) => ({
            passwordType: !state.passwordType
        }))
    };

    componentDidMount() {
        this.setState({isLoading: false});
    }


    render() {
        const {email, password, isLoading, loginSuccess, passwordType} = this.state;

        if (isLoading) {
            return (
                <div className="example">
                    <Spin size="large"/>
                </div>
            );
        }

        if (loginSuccess) {
            return <Redirect to="/ppc/optimization"/>;
        }


        return (
            <Form className="login-form" onSubmit={this.onSubmit}>
                <Form.Item className="input-form-group">
                    <Input
                        className="email-input"
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="off"
                        placeholder="E-mail"
                        value={email}
                        onChange={this.onChange}
                    />
                </Form.Item>

                <Form.Item className="input-form-group">
                    <Input
                        className="password-input"
                        type={passwordType ? 'password' : 'text'}
                        name="password"
                        placeholder="Password"
                        autoComplete="off"
                        value={password}
                        onChange={this.onChange}
                        suffix={<span onClick={this.switchPasswordType}><SVG id={passwordType ? 'eye-closed' : 'eye-opened'}/></span>}
                    />
                </Form.Item>

                <Row type="flex" justify="space-between" align='middle' className="form-bottom">
                    <Checkbox
                        onChange={e => this.setState({remember_me: e.target.checked})}
                    >
                        Remember me
                    </Checkbox>

                    <a
                        className="login-form-forgot forget"
                        href="https://profitwhales.com/password/reset"
                    >
                        Forgot password?
                    </a>
                </Row>

                <div className='terms-and-privacy'>
                    By signing in, you agree to Profit Whales <b>
                    <Link
                        target="_blank"
                        to={'/terms-and-conditions'}>
                        Terms and <br/>Conditions
                    </Link> & <Link target="_blank" to={'/policy'}>
                    Privacy Policy</Link></b>
                </div>

                <button className="btn default">
                    sign in
                </button>

                {/*<div className="login-with-amazon">*/}
                {/*    <img src={amazonImage} alt=""/>*/}
                {/*</div>*/}
            </Form>
        );
    }
}

const mapStateToProps = state => ({
    notFirstEntry: state.user.notFirstEntry
});

const mapDispatchToProps = dispatch => ({
    login: user => {
        dispatch(userActions.login(user));
    },
    resetState: () => {
        dispatch(userActions.reSetState());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPageForm);
