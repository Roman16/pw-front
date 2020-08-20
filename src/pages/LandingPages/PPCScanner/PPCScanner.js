import React, {useEffect, useState} from "react";
import './PPCScanner.less';
import Header from "../components/Header/Header";
import afterScanImage from '../../../assets/img/landing-ppc-scanner/after-scan.png';
import howItWork1 from '../../../assets/img/landing-ppc-scanner/how_it_works_1.svg';
import howItWork2 from '../../../assets/img/landing-ppc-scanner/how_it_works_2.png';
import howItWork3 from '../../../assets/img/landing-ppc-scanner/how_it_works_3.png';
import howItWork4 from '../../../assets/img/landing-ppc-scanner/how_it_works_4.png';
import notebookImage from '../../../assets/img/landing-ppc-scanner/Notebook.svg';
import ebookImage from '../../../assets/img/landing-ppc-scanner/ebook.svg';
import readBookImage from '../../../assets/img/landing-ppc-scanner/read-book.svg';
import willGetImage from '../../../assets/img/landing-ppc-scanner/will-get.svg';
import Footer from "../components/Footer/Footer";
import Slider from "react-slick";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import {userService} from "../../../services/user.services";
import {history} from "../../../utils/history";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PPCScanner = () => {
    const [selectedSlide, setSlide] = useState(0),
        [email, setEmail] = useState('');

    let slider = null;

    function goToSlide(index) {
        slider.slickGoTo(index);
        setSlide(index);
    }

    function SampleNextArrow({currentSlide, onClick}) {
        if (selectedSlide < 3) {
            return (<div className='next' onClick={() => {
                onClick();
                setSlide(currentSlide === 3 ? 0 : currentSlide + 1)
            }}><FontAwesomeIcon icon={faPlay}/></div>)
        } else {
            return '';
        }
    }

    function SamplePrevArrow({currentSlide, onClick}) {
        if (selectedSlide > 0) {
            return (
                <div className='prev' onClick={() => {
                    onClick();
                    setSlide(currentSlide === 0 ? 3 : currentSlide - 1)
                }}><FontAwesomeIcon icon={faPlay}/></div>
            );
        } else {
            return '';
        }
    }

    function subscribeHandler(e) {
        e.preventDefault();

        userService.ebookOnSubscribe({
            email
        })
            .then(() => {
                history.push('/thank-you');
            })
    }

    function goToScanPage() {
        // history.push('/ppc/scanner');
    }

    useEffect(() => {
        const dots = document.querySelectorAll('.dots i');

        dots.forEach((item, index) => {
            if (index < selectedSlide) {
                dots[index].classList.add('loaded')
            } else {
                dots[index].classList.remove('loaded')
            }
        });
    }, [selectedSlide]);

    return (
        <div className='landing-ppc-scanner  landing-page'>
            <section className="hero" id="hero">
                <Header type={'dark'}/>

                <div className="hero_inner">
                    <div className="box">
                        <h1 className="animateIt animateUp">Scan your Amazon PPC to find<br/>expensive mistakes</h1>

                        <div className="txt animateIt animateUp">
                            <p>
                                The Software is automatically scanning your advertising campaigns and showing you all
                                <br/>
                                the mistakes and recommendations. Wanna test how good you are?
                            </p>

                            <div className="row">
                                <h3>Completely FREE</h3>

                                <button className="btn green-btn" onClick={goToScanPage}>scan it</button>
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
                                PPC scanner quickly finds duplicate keywords that costing you a lot of money. It detects
                                keywords that eating your budget and raising your CPC.
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
                    <h2>How does it look after the scan?</h2>

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
                            <li className={selectedSlide === 0 && 'active'} onClick={() => goToSlide(0)}>
                                <span>Choose product</span>
                            </li>

                            <i/>

                            <li className={selectedSlide === 1 && 'active'} onClick={() => goToSlide(1)}>
                                <span>Enter your COGS</span>
                            </li>

                            <i/>

                            <li className={selectedSlide === 2 && 'active'} onClick={() => goToSlide(2)}>
                                <span>See all the mistakes<br/>your are making</span>
                            </li>

                            <i/>

                            <li className={selectedSlide === 3 && 'active'} onClick={() => goToSlide(3)}>
                                <span>Done</span>
                            </li>
                        </ul>
                    </div>

                    <Slider
                        ref={ref => {
                            slider = ref
                        }}
                        dots={false}
                        infinite={true}
                        speed={500}
                        slidesToShow={1}
                        slidesToScroll={1}
                        nextArrow={<SampleNextArrow/>}
                        prevArrow={<SamplePrevArrow/>}
                        afterChange={e => {
                            setSlide(e);
                        }}
                    >
                        <div className="item step_1">
                            <div className="text">
                                <div className="ttl">
                                    <span>01/</span>Choose your product
                                </div>
                                <div className="desc">
                                    <p>
                                        After connecting to your Amazon Store with Amazon API, you will be able to
                                        choose
                                        a product. Our software will download all your campaigns and start looking for
                                        mistakes.
                                    </p>

                                    <p>
                                        Note! You can scan only 1 product at the same time, and it works only
                                        for North America accounts.
                                    </p>
                                </div>
                            </div>

                            <div className="image"><img src={howItWork1} alt=""/></div>
                        </div>

                        <div className="item step_2">
                            <div className="image"><img src={howItWork2} alt=""/></div>
                            <div className="text">
                                <div className="ttl">
                                    <span>02/</span>
                                    Enter your Product Margin, so we can calculate your Target ACoS
                                </div>

                                <div className="desc">
                                    <p>
                                        Price - (Product Cost + Amazon Fees + Shipping Cost + Overhead + Labor + Taxes +
                                        Insurance) = Net Profit
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="item step_3">
                            <div className="image"><img src={howItWork3} alt=""/></div>
                            <div className="text">
                                <div className="ttl">
                                    <span>03/</span>See all the mistakes you are making inside our terminal and on the
                                    graph
                                </div>
                                <div className="desc">
                                    <p>
                                        The problems graph is showing in what risk zone you are now. The terminal is
                                        showing the exact mistakes you are doing in your Amazon PPC campaigns so you can
                                        go to your Seller Central and fix them or you can use our Optimization tool to
                                        automate this process.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="item step_4">
                            <div className="image"><img src={howItWork4} alt=""/></div>
                            <div className="text">
                                <div className="ttl">
                                    <span>04/</span>Done. You can also download the report with all the mistakes.
                                </div>
                                <div className="desc">
                                    <p>
                                        After finishing scanning one product, you can choose another. Want to know how
                                        good your PPC is? Let PPC Scanner figure it out now.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </Slider>


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
                        Data-Driven advertising campaign scanner. Let’s see what you’re missing.
                        <br/>
                        PPC Scanner is completely free forever.
                    </p>

                    <button className='btn green-btn' onClick={goToScanPage}>scan it</button>
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

                        <form onSubmit={subscribeHandler}>
                            <div>
                                <label htmlFor="">Email Address</label>
                                <input
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder={'E-MAIL ADDRESS'}
                                    type="email"
                                />
                            </div>

                            <button className='btn green-btn' onClick={goToScanPage}>Get It Now</button>
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
                                traffic to a website came to exist. It was a paid search advertising. Sounds epic, and
                                it actually was an epic breakthrough in the Internet business.
                            </p>

                            <p>
                                Nowadays, we see the same with Amazon PPC when people are starting to search for
                                products on Amazon first. The latest studies show that it brings the highest ROI among
                                all PPC platforms, and we are predicting that it will be the game-changer for e-commerce
                                sellers for the next ten years.
                            </p>
                        </div>

                        <div className="image">
                            <img src={readBookImage} alt=""/>
                        </div>
                    </div>

                    <h3>What will you get</h3>

                    <div className="row">
                        <div className="image will-get">
                            <img src={willGetImage} alt=""/>
                        </div>

                        <div className="col">
                            <ul>
                                <li>Why do you need Amazon PPC for your business</li>
                                <li>How does Amazon PPC affect positions in organic results</li>
                                <li>How to increase your business using Amazon PPC dramatically</li>
                                <li>Long-tail theory to save money</li>
                                <li>How to find more keywords for your Amazon PPC campaigns</li>
                                <li>What is a Semantic Core and why do you need it</li>
                                <li>What goals are you able to achieve using Amazon PPC</li>
                                <li>How to set up PPC for a product launch</li>
                                <li>And many more inside the book.</li>
                            </ul>

                            <button className='btn green-btn' onClick={() => history.push('/amazon-ppc-blueprint')}>get
                                it now
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer/>
        </div>
    )
};

export default PPCScanner;