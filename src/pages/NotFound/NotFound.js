import React from 'react';
import './NotFound.less';

import img from '../../assets/img/404.svg';

class NotFound extends React.Component {
    render() {
        return (
            <section className="not-found-page">
                <div className="box">
                    <div className="img">
                        <img src={img} alt="Page Not Found" />
                    </div>
                    <h1>We sincerely apologize </h1>
                    {/* eslint-disable-next-line max-len */}
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec posuere nunc id odio euismod, vitae hendrerit erat finibus. </p>
                    <button className="btn ripple" type="submit">Back to site</button>
                </div>
            </section>
        );
    }
}

export default NotFound;
