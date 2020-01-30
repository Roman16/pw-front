import React from "react";
import './Ebook.less';
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import thankImage from '../../../assets/img/landing-ebook/thank.svg';
import {history} from "../../../utils/history";

const ThankYou = () => {
    return (
        <div className='thank-page'>
            <Header/>

            <section>
                <div className="container">
                    <div className="col">
                        <h1>Thank <br/> You!</h1>
                        <p>Check your email. P.S. You’ll <br/> find the Ebook there:)</p>
                        <button
                            onClick={() => history.push('/')}
                            className="btn green-btn">
                            Back to site</button>
                    </div>

                    <div className="image">
                        <img src={thankImage} alt=""/>
                    </div>
                </div>
            </section>

            <Footer/>
        </div>

    )
};

export default ThankYou;