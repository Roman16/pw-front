import React from "react";
import './Ebook.less';
import Header from "../components/Header/Header";
import booksImage from '../../../assets/img/landing-ebook/books.png'

const Ebook = () => {

    return (
        <div className='ebook-landing'>
            <Header/>

            <section>
                <div className="container">
                    <div className="col">
                        <h1>Want to take your Amazon <br/> business <span>to the next level?</span></h1>

                        <h4>Get this FREE Amazon PPC Blueprint to crush your Sales in 2020.</h4>

                        <form id="ebook_email_form" className="email_form"
                              action="https://profitwhales.com/get-amazon-ppc-blueprint">
                            <label>
                                <span>Email Address</span>
                                <input type="email" name="email" required="required" placeholder="E-mail Address"/>
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