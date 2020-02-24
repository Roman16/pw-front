import React from "react";
import './PrivacyPolicy.less';
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import {Link} from "react-router-dom";

const PrivacyPolicy = () => {
    return (
        <div className="privacy-page">
            <Header/>

            <div className="box">
                <div className="h1-wrap">
                    <h1>Privacy Policy</h1>
                    <p>Last Updated July 31, 2019</p>
                </div>

                <div className="page-content">
                    <blockquote>
                        <p>PROFIT WHALES, LLC ("us", "we", or "our") operates <a href="#">https://profitwhales.com</a>
                            (the "Site"). This page informs you of our policies regarding the collection, use and
                            disclosure of Personal Information we receive from users of the Site.</p>
                        <p>We use your Personal Information only for providing and improving the Site. By using the
                            Site, you agree to the collection and use of information in accordance with this policy.
                            Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the
                            same meanings as in our Terms and Conditions, accessible at <a
                                href="#">https://profitwhales.com.</a>
                        </p>
                    </blockquote>
                    <h4>Information Collection And Use</h4>
                    <p>While using our Site, we may ask you to provide us with certain personally identifiable
                        information that can be used to contact or identify you. Personally identifiable information may
                        include, but is not limited to, your name, email address, postal address and phone number
                        ("Personal Information").</p>
                    <h4>Log Data</h4>
                    <p>Like many site operators, we collect information that your browser sends whenever you visit our
                        Site ("Log Data"). This Log Data may include information such as your computer's Internet
                        Protocol ("IP") address, browser type, browser version, the pages of our Site that you visit,
                        the time and date of your visit, the time spent on those pages and other statistics.</p>
                    <h4>Cookies</h4>
                    <p>Cookies are files with small amount of data, which may include an anonymous unique identifier.
                        Cookies are sent to your browser from a web site and stored on your computer's hard drive.</p>
                    <p>Like many sites, we use "cookies" to collect information. You can instruct your browser to refuse
                        all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies,
                        you may not be able to use some portions of our Site.</p>
                    <h4>Communications</h4>
                    <p>We may use your Personal Information to contact you with newsletters, marketing or promotional
                        materials and other information that may be of interest to you. You may opt out of receiving
                        any, or all, of these communications from us by following the unsubscribe instructions provided
                        in any email we send.</p>
                    <h4>Compliance With Laws</h4>
                    <p>PROFIT WHALES, LLC will disclose your Personal Information where required to do so by law or
                        subpoena or if we believe that such action is necessary to comply with the law and the
                        reasonable requests of law enforcement or to protect the security or integrity of our Site.</p>
                    <h4>Business Transaction</h4>
                    <p>If PROFIT WHALES, LLC is involved in a merger, acquisition or asset sale, your Personal
                        Information may be transferred. We will provide notice before your Personal Information is
                        transferred and becomes subject to a different Privacy Policy.</p>
                    <h4>Security</h4>
                    <p>The security of your Personal Information is important to us, but remember that no method of
                        transmission over the Internet, or method of electronic storage, is 100% secure. While we strive
                        to use commercially acceptable means to protect your Personal Information, we cannot guarantee
                        its absolute security.</p>
                    <h4>Links To Other Sites</h4>
                    <p>Our Site may contain links to other sites that are not operated by us. If you click on a third
                        party link, you will be directed to that third party's site. We strongly advise you to review
                        the Privacy Policy of every site you visit.</p>
                    <p>PROFIT WHALES, LLC has no control over, and assumes no responsibility for, the content, privacy
                        policies, or practices of any third party sites or services.</p>
                    <h4>Children's Privacy</h4>
                    <p>Our Site does not address anyone under the age of 13 ("Children"). We do not knowingly collect
                        personally identifiable information from children under 13. If you are a parent or guardian and
                        are aware that your Children has provided us with Personal Information, please contact us. If we
                        discover that a Children under 13 has provided us with Personal Information, we will delete such
                        information from our servers immediately.</p>
                    <h4>Changes To This Privacy Policy</h4>
                    <p>PROFIT WHALES, LLC may update this Privacy Policy from time to time. We will notify you of any
                        changes by posting the new Privacy Policy on the Site. You are advised to review this Privacy
                        Policy periodically for any changes.</p>
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

export default PrivacyPolicy;