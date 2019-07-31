import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Header.less';

class Header extends Component {
    render() {
        return (
            <header className="Header">
                <Link to="/"> Atomic Design</Link>
            </header>
        );
    }
}


export default Header;
