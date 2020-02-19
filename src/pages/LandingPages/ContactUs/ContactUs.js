import React, {useState, Fragment} from "react";
import './ContactUs.less';
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import callHelpImage from '../../../assets/img/landing-contact-us/call-help.svg';
import proposalImage from '../../../assets/img/landing-contact-us/proposal.svg';
import helpCenterImage from '../../../assets/img/landing-contact-us/help-center.svg';
import addressImage from '../../../assets/img/landing-contact-us/address-image.svg';
import helpDjoImage from '../../../assets/img/landing-contact-us/helpDjo.svg';
import checkedIcon from '../../../assets/img/landing-contact-us/checked.svg';
import ModalWindow from "../../../components/ModalWindow/ModalWindow";

const ContactUs = () => {
    const [visibleWindow, switchWindow] = useState(false),
        [completed, setStatus] = useState(false);

    function openWindowHandler() {
        switchWindow(true)
    }

    function submitFormHandler() {
        setStatus(true)
    }

    return (
        <Fragment>
            <div className="landing-contact-us">
                <Header/>

                <section>
                    <div className="container">
                        <div className="title">
                            <h2>Contact Us</h2>
                            <p>Have any questions? We’d love to hear from you.</p>
                        </div>


                        <div className="row">
                            <div className='item'>
                                <img src={callHelpImage} alt=""/>
                                <h3>How could we help you?</h3>
                                <p>Our support team is spread across the globe to give you answers fast.</p>
                                <button onClick={openWindowHandler} className='btn green-btn'>Send a request</button>
                            </div>

                            <div className='item'>
                                <img src={proposalImage} alt=""/>
                                <h3>Partnership? Of course, let’s discuss</h3>
                                <p>Don't be shy. If you've got something to create and move forward with Profit
                                    Whales.</p>
                                <button onClick={openWindowHandler} className='btn green-btn'>Send a proposal</button>
                            </div>

                            <div className='item'>
                                <img src={helpCenterImage} alt=""/>
                                <h3>Software Help Center</h3>
                                <p>All answers about our software. Click and go through all knowledge that we collected
                                    for
                                    you.</p>
                                <button onClick={openWindowHandler} className='btn green-btn'>Get more info</button>

                                <img src={helpDjoImage} alt="" className='djo'/>
                            </div>
                        </div>

                        <div className="address">
                            <img src={addressImage} alt=""/>

                            <div className="col">
                                <h4>Mailing Address:</h4>
                                <span>ProfitWhales</span>
                                <span>st. Konovalca 32 G Kyiv, 02000</span>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer/>
            </div>

            <ModalWindow
                className={'contact-us-window'}
                visible={visibleWindow}
                handleCancel={() => switchWindow(false)}
                footer={false}
                destroyOnClose={true}
            >
                {completed ?
                    <div className="message-set-out">
                        <img src={checkedIcon} alt=""/>
                        <h2>Thank you for letter</h2>

                        <p>We’ll reach you within 24 hours.</p>

                        <button className='btn green-btn' onClick={() => {switchWindow(false); setStatus(false)}}>Done</button>
                    </div>
                    :

                    <form onSubmit={submitFormHandler}>
                        <h2>Fill the form: </h2>
                        <div className="input-group">
                            <label htmlFor="">First & Last Name</label>
                            <input type="text"/>
                        </div>

                        <div className="input-group email-block">
                            <label htmlFor="">E-mail</label>
                            <input type="email"/>
                            <span>@</span>
                        </div>

                        <div className="input-group">
                            <label htmlFor="">Comment</label>
                            <textarea/>
                        </div>

                        <button className='btn green-btn'>send</button>
                    </form>
                }

            </ModalWindow>
        </Fragment>
    )
};

export default ContactUs;