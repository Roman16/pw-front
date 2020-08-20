import React from "react";
import './Ebook.less';
import Header from "../components/Header/Header";
import thankImage from '../../../assets/img/landing-ebook/thank.svg';
import {history} from "../../../utils/history";

const ThankYou = () => {
    return (
        <div className='thank-page  landing-page'>
            <Header type={'dark'}/>

            <section>
                <div className="container">
                    <div className="image">
                        <img src={thankImage} alt=""/>
                    </div>

                    <div className="col">
                        <h1>Thank you!</h1>
                        <p>Check your email.</p>
                        <p>P.S. You’ll find the <strong>Ebook</strong> there:)</p>

                        <button
                            onClick={() => history.push('/')}
                            className="btn">
                            back to site
                        </button>
                    </div>
                </div>
            </section>
        </div>

    )
};

export default ThankYou;