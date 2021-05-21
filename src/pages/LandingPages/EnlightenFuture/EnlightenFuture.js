import React from "react"
import './EnlightenFuture.less'
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import educationImg from '../../../assets/img/landing-enlightenFuture/education-image.png'
import {Link} from "react-router-dom"

const EnlightenFuture = () => {

    return (<div className={'enlighten-future landing-page'}>
        <Header/>

        <section className="pre-header">
            <div className="container">
                <h1><span>Enlighten</span> <br/> your future</h1>
            </div>
        </section>

        <section className={'education'}>
            <div className="container">
                <h2>Education</h2>

                <div className="row">
                    <img src={educationImg} alt=""/>

                    <ul>
                        <li>
                            Knowledge and development through scientific approach is what differentiates Profit Whales
                            and makes it to be unique in the market of Amazon advertising as well as knowledge
                            development.
                        </li>

                        <li>
                            We strive to educate our team on a continuous basis within their knowledge of marketing,
                            data science, market trends, algorithms development, causal relations, and logical
                            operations and these are enriched by the AI technologies, solutions, and decisions. In such
                            synergy, we reach highly effective results in our own performance approach, which results in
                            the improvement of our clients’ activities, positioning, sales, and competitiveness.
                        </li>

                        <li>
                            We analyze the Amazon market as well as global e-commerce one, dive into market data, make
                            out interesting cases, and share our insights through our blog, social media pages, and
                            podcasts.
                        </li>
                    </ul>
                </div>

                <p>
                    Profit Whales believes that only <span>through learning and <br/>
                    focusing</span> on innovations, it is possible to create real <br/>
                    value and promote <span>sustainable development</span> to <br/>
                    communities.
                </p>
            </div>
        </section>

        <section className={'advertising-course'}>
            <div className="container">
                <div className="col">
                    <h2>
                        <span>Amazon Advertising</span> <br/> Course
                    </h2>

                    <p>
                        The Amazon sphere is one of the most developing today. It is characterized by rapid growth,
                        changes,
                        and volutations. Amazon sellers have to continuously research the market, niche, and competitors
                        as
                        well as customers’ purchasing changes, needs and wants shifts. At the same time, the Amazon
                        platform
                        itself is modifying, increasing the pressure on business. Knowledge of the advertising
                        strategies on
                        the market is able to improve the products positioning, account attractiveness, and business
                        effectiveness. The changes in the advertising approach can significantly boost sales and promote
                        products as well as account. As a result, knowledge of the Amazon platform from inside,
                        understanding of its unique internal specificity, and ability to manage data within the account
                        would raise the business to a whole new level.
                    </p>

                    <p>
                        If you are ready to boost your business on Amazon, start off by acquiring knowledge about
                        advertising capabilities you have. Right now, you are able to learn from the inventor of an
                        innovative approach of Amazon advertising campaigns management.
                    </p>

                    <h3>
                        Start your <span>Success Journey</span> today!
                    </h3>

                    <Link to={'/course'} className={'btn default'}>learn more</Link>
                </div>
            </div>
        </section>

        <Footer/>
    </div>)
}

export default EnlightenFuture