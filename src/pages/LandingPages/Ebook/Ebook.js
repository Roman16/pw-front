import React, {useState} from "react";
import './Ebook.less';
import Header from "../components/Header/Header";
import booksImage from '../../../assets/img/landing-ebook/books.png'
import {userService} from "../../../services/user.services";
import {history} from "../../../utils/history";

const Ebook = () => {
    const [email, setEmail] = useState();

    function onSubscribe(e) {
        console.log(window.location);
        e.preventDefault();
        userService.ebookOnSubscribe({
            email
        })
            .then(() => {
                history.push('/thank-you');
            })
    }

    return (
        <div className='ebook-landing'>
            <Header/>

            <section>
                <div className="container">
                    <div className="col">
                        <h1>Learn how to structure your <br/> Amazon PPC campaigns properly.</h1>

                        <h4>Get this FREE Amazon PPC Blueprint to crush your Sales in 2020.</h4>

                        <form id="ebook_email_form" className="email_form" onSubmit={onSubscribe}>
                            <label>
                                <span>Email Address</span>
                                <input
                                    onChange={e => setEmail(e.target.value)}
                                    type="email"
                                    name="email"
                                    required="required"
                                    placeholder="E-mail Address"
                                />
                            </label>

                            <button className="btn ripple legitRipple">Get It Now</button>
                        </form>
                    </div>

                    <div className="image">
                        <img src={booksImage} alt=""/>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default Ebook;
