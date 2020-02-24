import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import './TermsOfUse.less';
import {Link} from "react-router-dom";

const TermsOfUse = () => {

    return(
        <div className="terms-page">
            <Header/>

            <div className="box">
                <div className="h1-wrap">
                    <h1>PROFIT WHALES Terms Of Use</h1>
                    <p>Last Updated July 31, 2019</p>
                </div>

                <div className="page-content">
                    <blockquote>
                        Please read these Terms of Service carefully before using any PROFIT WHALES Services accessed at
                        this website. You the Customer may only use PROFIT WHALES Services if you accept and comply with
                        the Terms of Service, which apply to all visitors, users and others who access or use the
                        Services. By accessing or using the Services, you agree to be bound by these Terms and
                        Conditions. If you disagree with any part of the Terms and Conditions, then you do not have
                        permission to access or use the Services.
                    </blockquote>
                    <h4>Services</h4>
                    <p>PROFIT WHALES will provide PROFIT WHALES Optimization Services ("the Services") to Customer for
                        Amazon-related online marketing and sales.</p>
                    <h4>Standard of Services</h4>
                    <p>PROFIT WHALES will provide the Services in conformity to the PROFIT WHALES Help Center, as found
                        here and subject to change by PROFIT WHALES from time to time without notice.</p>
                    <h4>Payment for Services</h4>
                    <p>Customer shall pay PROFIT WHALES’ standard fees for the Services, monthly or more frequently as
                        PROFIT WHALES may direct from time to time, in such manner as PROFIT WHALES directs for
                        payments. PROFIT WHALES reserves the right to changes its fees effective upon notice to
                        Customer.</p>
                    <h4>Customer Cooperation</h4>
                    <p>Customer understands that performance of the Services requires timely information from Customer
                        and agrees to comply with all requests from PROFIT WHALES for information and cooperation
                        related to the Services. Customer agrees that PROFIT WHALES may identify Customer publicly as a
                        PROFIT WHALES customer.</p>
                    <h4>Confidentiality</h4>
                    <p>PROFIT WHALES agrees to keep data received from Customer confidential and to use Customer’s data
                        only for purposes of providing and improving the Service, including optimization routines
                        specifically for Customer, design and implementation of optimization routines for customers more
                        generally, and development of algorithms and systems related to the Service and the improvement
                        of the Service over time. Customer agrees to keep confidential any information provided by
                        PROFIT WHALES that is identified verbally or in writing as confidential, to use such information
                        only for purposes related to this Agreement, and to disclose such information to no other person
                        or party.</p>
                    <h4>Waiver of Warranties</h4>
                    <p>Customer and PROFIT WHALES agree to waive all implied warranties, including the warranties of
                        merchantability, fitness for particular purpose, and non-infringement.</p>
                    <h4>Limitation of Liability.</h4>
                    <p>IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR CONSEQUENTIAL DAMAGES, LOST PROFITS, PUNITIVE OR
                        EXEMPLARY DAMAGES, OR LOST DATA.</p>
                    <h4>Limitation of Damages</h4>
                    <p>IN NO EVENT SHALL PROFIT WHALES’ LIABILITY TO CUSTOMER EXCEED THE AMOUNT PAID BY CUSTOMER TO
                        PROFIT WHALES DURING THE SIX MONTH PERIOD BEFORE SUCH LIABILITY ACCRUES.</p>
                    <h4>Term</h4>
                    <p>The term of this Agreement is month to month, and may be terminated at the end of each one-month
                        period by either party at will. We may terminate or suspend your account and bar access to the
                        Service immediately without notice if you violate these Terms and Conditions or misuse the
                        Services, impair the effective use of the Services by others, or use the Services to violate the
                        rights of others. Despite termination, the following sections of the Agreement shall survive and
                        continue in force and effect: Confidentiality, Intellectual Property, Waiver of Warranties,
                        Limitation of Liability, Limitation of Damages.</p>
                    <h4>Assignment</h4>
                    <p>Customer shall not assign this Agreement nor allow any other entity than the Customer entity
                        signatory to the Agreement, to use or benefit from the Services directly or indirectly. PROFIT
                        WHALES may assign this Agreement in the event of sale of PROFIT WHALES or its assets or
                        operations related to this Agreement.</p>
                    <h4>Force Majeure</h4>
                    <p>The performance by the parties shall be excused temporarily if rendered impracticable by forces
                        outside their control, including changes in Amazon’s manner of operation. If such force majeure
                        persists for more than 10 days, either of the parties may terminate this Agreement
                        immediately.</p>
                    <h4>Service Irregularities</h4>
                    <p>Due to PROFIT WHALES maintenance and updates, and other less predictable factors affecting the
                        Services, Customer may experience delays, interruptions or other irregularities in the Services.
                        PROFIT WHALES reserves the right to change or update information and to correct errors,
                        inaccuracies, or omissions at any time without prior notice.</p>
                    <h4>Intellectual Property</h4>
                    <p>The Service is and shall remain Intellectual Property of PROFIT WHALES, including without
                        limitation all rights to patents, trade secrets, copyrights, trademarks, service marks and trade
                        dress related to the Services and any future development, improvement and implementation of the
                        Services.</p>
                    <p>Notices. Any notices of errors or problems related to the Services should be sent to <a
                        href="mailto:support@profitwhales.agency">support@profitwhales.agency</a>
                    </p>
                    <br/>
                        <h3>Contact Us</h3>
                        <p>
                            If you have any questions about this Agreement, please
                            <Link to={'/contact-us'}>contact us</Link>
                        </p>
                </div>
            </div>

            <Footer/>
        </div>
    )
};

export default TermsOfUse;