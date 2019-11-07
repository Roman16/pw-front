import React, {Component} from 'react';

import Sidebar from '../components/Sidebar/Sidebar';

class AuthorizedUser extends Component {
    componentDidMount() {
        let badge = document.querySelector('.grecaptcha-badge');
        badge && badge.classList.add('hide-badge');
    }
    componentWillUnmount() {
        let badge = document.querySelector('.grecaptcha-badge');
        badge && badge.classList.remove('hide-badge');
    }

    render() {
        return (
            <div className="main-pages">
                <Sidebar />

                <div className="main-container">{this.props.children}</div>
            </div>
        );
    }
};

export default AuthorizedUser;
