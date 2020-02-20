import React from "react";
import Header from "../components/Header/Header";
import './DemoCall.less';

import demoImage from '../../../assets/img/landing-demo-call/demo-call-image.svg';

const DemoCall = () => {

    return (
        <div className="landing-demo-call">
            <Header type={'dark'}/>

            <section>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h1>
                                Want to take your Amazon business <span>to the next level?</span>
                            </h1>
                            <p>
                                See how you can transform your Amazon FBA <br/>
                                business with our data-driven Amazon Advertising <br/>
                                optimization software.
                            </p>
                        </div>

                        <div className="image">
                            <img src={demoImage} alt=""/>
                        </div>
                    </div>

                    <h2>Request your demo</h2>

                    <form action="">
                        <div className="input-group">
                            <label htmlFor="">Name</label>
                            <input type="text"/>
                            <span>We treat your contact information according to our policy</span>
                        </div>

                        <div className="input-group">
                            <label htmlFor="">E-mail</label>
                            <input type="email"/>
                        </div>

                        <button className='btn default'>request</button>
                    </form>

                </div>
            </section>
        </div>
    )
};

export default DemoCall;