import React from "react"
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import {Link} from "react-router-dom"
import '../TermsOfUse/TermsOfUse.less'

const PrivacyPolicy = () => {
    return (
        <div className="privacy-page  landing-page">
            <Header/>

            <div className="container">
                <div className="part">
                    <h2><span>This</span> Privacy Policy <span>was last modified on</span> February 03, 2021.</h2>

                    <p>
                        Profit Whales LLC (“us”, “we”, or “our”) operates www.profitwhales.com (the “Site”). This page
                        informs you of our policies regarding the collection, use and disclosure of Personal Information
                        we receive from users of the Site.
                    </p>

                    <p>
                        We use your Personal Information only for providing and improving the Site. By using the Site,
                        you agree to the collection and use of information in accordance with this policy. Unless
                        otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same
                        meanings as in our Terms and Conditions, accessible at www.profitwhales.com.
                    </p>
                </div>

                <div className="part">
                    <h2>Information Collection <span>And Use</span></h2>

                    <p>
                        While using our Site, we may ask you to provide us with certain personally identifiable
                        information that can be used to contact or identify you. Personally identifiable information may
                        include, but is not limited to, your name, email address, postal address and phone number
                        (“Personal Information”). Profit Whales may share non-personal and non-confidential identifiers,
                        such as the advertiser or seller id, with third parties for purposes of troubleshooting and
                        auditing.
                    </p>
                </div>

                <div className="part">
                    <h2><span>Log</span> Data</h2>

                    <p>
                        Like many site operators, we collect information that your browser sends whenever you visit our
                        Site (“Log Data”). This Log Data may include information such as your computer’s Internet
                        Protocol (“IP”) address, browser type, browser version, the pages of our Site that you visit,
                        the time and date of your visit, the time spent on those pages and other statistics.
                    </p>
                </div>

                <div className="part">
                    <h2>Cookies</h2>

                    <p>
                        Cookies are files with small amount of data, which may include an anonymous unique identifier.
                        Cookies are sent to your browser from a web site and stored on your computer’s hard drive.
                    </p>

                    <p>
                        Like many sites, we use “cookies” to collect information. You can instruct your browser to
                        refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept
                        cookies, you may not be able to use some portions of our Site.
                    </p>
                </div>

                <div className="part">
                    <h2>Communications</h2>

                    <p>
                        We may use your Personal Information to contact you with newsletters, marketing or promotional
                        materials and other information that may be of interest to you. You may opt out of receiving
                        any, or all, of these communications from us by following the unsubscribe instructions provided
                        in any email we send.
                    </p>
                </div>

                <div className="part">
                    <h2>Compliance <span>With Laws</span></h2>

                    <p>
                        Profit Whales LLC will disclose your Personal Information where required to do so by law or
                        subpoena or if we believe that such action is necessary to comply with the law and the
                        reasonable requests of law enforcement or to protect the security or integrity of our Site.
                    </p>
                </div>

                <div className="part">
                    <h2><span>Business</span> Transaction</h2>

                    <p>
                        If Profit Whales LLC is involved in a merger, acquisition or asset sale, your Personal
                        Information may be transferred. We will provide notice before your Personal Information is
                        transferred and becomes subject to a different Privacy Policy.
                    </p>
                </div>

                <div className="part">
                    <h2>Security</h2>

                    <p>
                        The security of your Personal Information is important to us, but remember that no method of
                        transmission over the Internet, or method of electronic storage, is 100% secure. While we strive
                        to use commercially acceptable means to protect your Personal Information, we cannot guarantee
                        its absolute security.
                    </p>
                </div>

                <div className="part">
                    <h2>Links <span>To Other Sites</span></h2>

                    <p>
                        Our Site may contain links to other sites that are not operated by us. If you click on a third
                        party link, you will be directed to that third party’s site. We strongly advise you to review
                        the Privacy Policy of every site you visit.
                    </p>

                    <p>
                        Profit Whales LLC has no control over, and assumes no responsibility for, the content, privacy
                        policies, or practices of any third party sites or services.
                    </p>
                </div>

                <div className="part">
                    <h2><span>Children’s</span> Privacy</h2>

                    <p>
                        Our Site does not address anyone under the age of 13 (“Children”). We do not knowingly collect
                        personally identifiable information from children under 13. If you are a parent or guardian and
                        are aware that your Children has provided us with Personal Information, please contact us. If we
                        discover that a Children under 13 has provided us with Personal Information, we will delete such
                        information from our servers immediately.
                    </p>
                </div>

                <div className="part">
                    <h2><span>Changes To This</span> Privacy Policy</h2>

                    <p>
                        Profit Whales LLC may update this Privacy Policy from time to time. We will notify you of any
                        changes by posting the new Privacy Policy on the Site. You are advised to review this Privacy
                        Policy periodically for any changes.
                    </p>
                </div>

                <div className="part">
                    <h2>Contact Us</h2>

                    <p>
                        If you have any questions about this Privacy Policy, please <Link to={'/contact-us'} target={'_blank'}>contact us</Link>.
                    </p>
                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default PrivacyPolicy
