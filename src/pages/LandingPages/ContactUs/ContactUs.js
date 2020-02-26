import React, {useState, Fragment, useEffect} from "react";
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
import {userService} from "../../../services/user.services";
import {notification} from "../../../components/Notification";

const ContactUs = () => {
    const [visibleWindow, switchWindow] = useState(false),
        [completed, setStatus] = useState(false),
        [formValue, setForm] = useState({});

    function openWindowHandler() {
        switchWindow(true)
    }

    async function submitFormHandler(e) {
        e.preventDefault();

        try {
            await userService.sendContacts(formValue);
            setStatus(true);
            // switchWindow(false);
        } catch (e) {
            console.log(e);
        }
    }

    function inputChangeHandler({target: {value, name}}) {
        setForm({
            ...formValue,
            [name]: value
        })
    }

    useEffect(() => {
       return(() => {
           document.querySelector('body').classList.remove('visible-intercom');
       })
    }, []);


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
                                <button onClick={() => {
                                    document.querySelector('body').classList.add('visible-intercom');
                                    window.Intercom('show')
                                }}
                                        className='btn green-btn'>Send a request
                                </button>
                            </div>

                            <div className='item'>
                                <img src={proposalImage} alt=""/>
                                <h3>Partnership? Of course, let’s discuss</h3>
                                <p>Don't be shy. If you've got something to create and move forward with Profit
                                    Whales.</p>
                                <button
                                    onClick={() => window.open('https://calendly.com/vitalii-pw-success-manager/profit-whales-collaboration')}
                                    className='btn green-btn'>Send a proposal
                                </button>
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
                                <h4>Just shoot me a message</h4>
                                <a href="mailto:official@profitwhales.com">official@profitwhales.com</a>
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

                        <button className='btn green-btn' onClick={() => {
                            switchWindow(false);
                            setStatus(false)
                        }}>Done
                        </button>
                    </div>
                    :

                    <form onSubmit={submitFormHandler}>
                        <h2>Fill the form: </h2>
                        <div className="input-group">
                            <label htmlFor="">First & Last Name</label>
                            <input type="text" name='first_name' onChange={inputChangeHandler}/>
                        </div>

                        <div className="input-group email-block">
                            <label htmlFor="">E-mail</label>
                            <input type="email" name='email' required onChange={inputChangeHandler}/>
                            <span>@</span>
                        </div>

                        <div className="input-group">
                            <label htmlFor="">Comment</label>
                            <textarea name='comment' required onChange={inputChangeHandler}/>
                        </div>

                        <button className='btn green-btn'>send</button>
                    </form>
                }

            </ModalWindow>
        </Fragment>
    )
};

export default ContactUs;