import React from "react";
import './PPCScanner.less';
import Header from "../components/Header/Header";
import afterScanImage from '../../../assets/img/landing-ppc-scanner/after-scan.png';
import howItWork1 from '../../../assets/img/landing-ppc-scanner/how_it_works_1.png';
import howItWork2 from '../../../assets/img/landing-ppc-scanner/how_it_works_2.png';
import howItWork3 from '../../../assets/img/landing-ppc-scanner/how_it_works_3.png';
import howItWork4 from '../../../assets/img/landing-ppc-scanner/how_it_works_4.png';
import notebookImage from '../../../assets/img/landing-ppc-scanner/Notebook.svg';
import ebookImage from '../../../assets/img/landing-ppc-scanner/ebook.svg';
import readBookImage from '../../../assets/img/landing-ppc-scanner/read-book.svg';
import willGetImage from '../../../assets/img/landing-ppc-scanner/will-get.svg';
import Footer from "../components/Footer/Footer";


const PPCScanner = () => {

    return (
        <div className='landing-ppc-scanner'>
            <section className="hero" id="hero">
                <Header type={'dark'}/>

                <div className="hero_inner">
                    <div className="box">
                        <h1 className="animateIt animateUp">Scan your Amazon PPC to find<br/>expensive mistakes</h1>

                        <div className="txt animateIt animateUp">
                            <p>
                                The Software Automatically scanning your advertising Campaigns and showing you all
                                <br/>
                                the mistakes Wanna know how good you are?
                            </p>

                            <div className="row">
                                <h3>Completely FREE</h3>

                                <button className="btn green-btn">scan it</button>
                            </div>

                            {/*<div className="scroll-down" onClick={() => {*/}
                            {/*    $('body, html').animate({scrollTop: $('#our-story').offset().top}, 750);*/}
                            {/*}}/>*/}
                        </div>

                        {/*<div className="image animateIt animateUp">*/}
                        {/*    <img src={heroImage} alt=""/>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </section>

            <section className='mistakes'>
                <div className="container">
                    <h2>What mistakes does the tool find?</h2>

                    <div className="list">
                        <div className="item animateIt animateUp">
                            <div className="ttl">Duplicate Keywords</div>
                            <div className="desc">
                                PPC scanner quickly finds duplicate keywords that costing you a lot of money. The
                                software detects not only the same keywords but the keywords that Amazon recognizes as
                                duplicates.
                            </div>
                        </div>
                        <div className="item animateIt animateUp">
                            <div className="ttl">Bad-performing keywords</div>
                            <div className="desc">
                                The software finds bad-performing keywords such as keywords with high ACoS (more than
                                your target ACoS- calculated based on your COGS and Amazon fees), keywords with a lot of
                                Сlicks and no Sales, etc.
                            </div>
                        </div>
                        <div className="item animateIt animateUp">
                            <div className="ttl">Poor Semantic Core</div>
                            <div className="desc">
                                The Software analyzing your semantic core and indicates if you don’t have any Brand name
                                keywords, Negative keywords for auto/broad/phrase campaigns, long-tail keywords.
                            </div>
                        </div>
                        <div className="item animateIt animateUp">
                            <div className="ttl">No Keywords Harvesting</div>
                            <div className="desc">
                                The Software shows if you aren’t using broad and auto campaigns for collecting valuable
                                keywords from search term reports.
                            </div>
                        </div>
                        <div className="item animateIt animateUp">
                            <div className="ttl">No PAT’s</div>
                            <div className="desc">
                                Displays if you are using Product Advertising Attribute campaigns to target specific
                                ASIN’s and categories.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='after-scan'>
                <div className="container">
                    <h2>How it looks after scan?</h2>

                    <div className="image">
                        <img src={afterScanImage} alt=""/>
                    </div>
                </div>
            </section>

            <section className="how-it-works" id="how_it_works">
                <div className="container">
                    <h2>How it works?</h2>


                    <div className="nav_wrap animateIt animateUp">
                        <div className="nav"/>
                        <ul className="dots">
                            <li className="active"><i/><span>Choose product</span></li>
                            <li><i/><span>Enter your COGS</span></li>
                            <li><i/><span>See all the mistakes<br/>your are making</span></li>
                            <li><span>Done</span></li>
                        </ul>
                    </div>

                    {/*<div className="box">*/}
                    {/*    <div className="slider animateIt animateUp">*/}
                    {/*        <div className="item step_1">*/}
                    {/*            <div className="image"><img src={howItWork1} alt=""/></div>*/}
                    {/*            <div className="text">*/}
                    {/*                <div className="ttl"><span>01</span>Choose*/}
                    {/*                    your*/}
                    {/*                    product*/}
                    {/*                </div>*/}
                    {/*                <div className="desc">*/}
                    {/*                    <p>After connecting to your Amazon Store, you will be able to choose a product*/}
                    {/*                        to*/}
                    {/*                        scan.</p>*/}
                    {/*                    <p>Note! You can scan only 1 product at the same time.</p>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}

                    {/*        <div className="item step_2">*/}
                    {/*            <div className="image"><img src={howItWork2} alt=""/></div>*/}
                    {/*            <div className="text">*/}
                    {/*                <div className="ttl"><span>02</span>Enter*/}
                    {/*                    your*/}
                    {/*                    Cost of goods sold (COGS), so we can calculate your Target ACoS*/}
                    {/*                </div>*/}
                    {/*                <div className="desc">*/}
                    {/*                    <p>Calculating your target ACoS will make scanning of your advertising campaigns*/}
                    {/*                        more data-driven and deliver you accurate results.</p>*/}
                    {/*                    <p><strong>* COGS is the inventory cost + freight + duty.</strong></p>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}

                    {/*        <div className="item step_3">*/}
                    {/*            <div className="image"><img src={howItWork3} alt=""/></div>*/}
                    {/*            <div className="text">*/}
                    {/*                <div className="ttl"><span>03</span>See all*/}
                    {/*                    the*/}
                    {/*                    mistakes you are making inside our terminal and on the graph*/}
                    {/*                </div>*/}
                    {/*                <div className="desc">*/}
                    {/*                    <p>The graph is showing in what risk zone you are locating. The terminal is*/}
                    {/*                        showing*/}
                    {/*                        the exact mistakes you are doing in your Amazon PPC campaigns.</p>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}

                    {/*        <div className="item step_4">*/}
                    {/*            <div className="image"><img src={howItWork4} alt=""/></div>*/}
                    {/*            <div className="text">*/}
                    {/*                <div className="ttl"><span>04</span>Done.*/}
                    {/*                    You*/}
                    {/*                    can also download the report with all the mistakes.*/}
                    {/*                </div>*/}
                    {/*                <div className="desc">*/}
                    {/*                    <p>Whant to know how good your PPC is? Let PPC Scanner figure it out now.</p>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </section>

            <section className="secure">
                <div className="container">
                    <div className="image">
                        <img src={notebookImage} alt=""/>
                    </div>

                    <div className="col">
                        <h2>Data Secure</h2>

                        <p>
                            Your data security and privacy is very important to us!
                            <br/>
                            We are aware of the responsibility that comes along with handling your
                            <br/>
                            data and take considerable efforts to meet the highest requirements.
                        </p>
                    </div>
                </div>
            </section>

            <section className="scan-now">
                <div className="container">
                    <h3>
                        Ever wonder why your sales are low?
                        <br/>
                        Scan your PPC to find out!
                    </h3>

                    <p>
                        Big Data Driven Advertising Campaign Scanner. Let’s see what you’re missing.
                        <br/>
                        PPC Scanner is completely free.
                    </p>

                    <button className='btn green-btn'>scan it</button>
                </div>
            </section>

            <section className="ebooks">
                <div className="container">
                    <div className="image">
                        <img src={ebookImage} alt=""/>
                    </div>

                    <div className="col">
                        <h3>Ebooks</h3>

                        <p>
                            Want to take your Amazon business to the next level?
                            <br/>
                            Get this FREE Amazon PPC Blueprint to crash your
                            <br/>
                            Sales in 2020.
                        </p>

                        <form action="">
                            <div>
                                <label htmlFor="">Email Address</label>
                                <input placeholder={'E-MAIL ADDRESS'} type="text"/>
                            </div>

                            <button className='btn green-btn'>Get It Now</button>
                        </form>
                    </div>
                </div>
            </section>

            <section className='who-we-are'>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h3>
                                Who we are and <br/> why you should read <br/> this Book?
                            </h3>

                            <p>
                                Since the ancient days when Google just appeared, and nobody knew how to find something
                                useful on the Internet, the arguably fastest and most reliable way to obtain relevant
                                traffic to a website came to exist. It was a paid search advertising. Sounds epic and it
                                actually was an epic breakthrough in the Internet business.
                            </p>

                            <p>
                                You may not believe it, but
                                there were days when Google was on the edge of the bankruptcy. Savior came in 2000, and
                                his name was Pay Per Click (PPC) advertising model. It was the PPC that gave a hand to
                                save search engine giant from the money pit.
                            </p>
                        </div>

                        <div className="image">
                            <img src={readBookImage} alt=""/>
                        </div>
                    </div>

                    <h3>What will you get</h3>

                    <div className="row">
                        <div className="image">
                            <img src={willGetImage} alt=""/>
                        </div>

                        <div className="col">
                            <ul>
                                <li>Semantic Core Collection</li>
                                <li>Sort a Search Term Report report by maximum conversion</li>
                                <li>Black Box building</li>
                                <li>Negative keywords list building</li>
                                <li>Semantic Core Segmentation</li>
                                <li>Build Structure</li>
                                <li>Tracking organic results</li>
                                <li>Elimination of keyword competition</li>
                                <li>Choose your betting strategy</li>
                                <li>Increase Semantic Core to 300-5000 + keywords. Hard PPC Launch</li>
                                <li>Conclusion</li>
                            </ul>

                            <button className='btn green-btn'>get it now</button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer/>
        </div>
    )
};

export default PPCScanner;