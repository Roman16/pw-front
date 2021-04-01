import React, {useState} from "react"
import './Contact.less'
import {Checkbox, Input} from "antd"
import {Link} from "react-router-dom"
import Header, {email, phone} from "../components/Header/Header"
import Footer, {SocialLinks} from "../components/Footer/Footer"
import {userActions} from "../../../actions/user.actions"
import {userService} from "../../../services/user.services"

const TextArea = Input.TextArea

const Contact = () => {
    return (
        <div className={'contact-page landing-page'}>
            <Header/>

            <ContactForm/>

            <Footer/>
        </div>
    )
}

export const ContactForm = () => {
    const [successSend, setSuccessSend] = useState(false),
        [agreeWithTerms, setAgreeWithTerms] = useState(false),
        [requestData, setRequestData] = useState({
            name: '',
            email: '',
            comment: ''
        })

    const changeInputHandler = (key, value) => {
        setRequestData({
            ...requestData,
            [key]: value
        })
    }

    const submitFormHandler = async (e) => {
        e.preventDefault()

        if (agreeWithTerms) {
            try {
                await userService.sendShortContactForm(requestData)
                setSuccessSend(true)

                setTimeout(() => {
                    setRequestData({
                        name: '',
                        email: '',
                        comment: ''
                    })
                }, 5000)

            } catch (e) {
                console.log(e)
            }
        }
    }

    return (
        <section className={'new-contact-form'}>
            <div className="container">
                <ul className={'form-list'}>
                    <li className={!successSend && 'active'}>
                        <form onSubmit={submitFormHandler}>
                            <h3><span>Contact</span> Us</h3>

                            <div className="form-group">
                                <label htmlFor="">Your Name</label>
                                <Input
                                    required={true}
                                    placeholder={'Your Name'}
                                    value={requestData.name}
                                    onChange={({target: {value}}) => changeInputHandler('name', value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="">E-mail</label>
                                <Input
                                    required={true}
                                    placeholder={'E-mail'}
                                    value={requestData.email}
                                    onChange={({target: {value}}) => changeInputHandler('email', value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Message</label>
                                <TextArea
                                    placeholder={'Message'}
                                    value={requestData.comment}
                                    onChange={({target: {value}}) => changeInputHandler('comment', value)}
                                />
                            </div>

                            <Checkbox
                                onChange={({target: {checked}}) => setAgreeWithTerms(checked)}
                            >
                                Yes, I agree to Profit Whales <Link to={'/terms-and-conditions'} target={'_blank'}>Terms
                                and
                                Conditions</Link> & <Link to={'/policy'} target={'_blank'}> Privacy Policy</Link>
                            </Checkbox>

                            <button
                                className={'btn default'}
                                disabled={requestData.name === '' || requestData.email === '' || requestData.comment === '' || !agreeWithTerms}
                            >
                                let’s talk
                            </button>
                        </form>
                    </li>

                    <li className={`success ${successSend ? 'active' : ''}`}>
                        <i>
                            <svg width="110" height="110" viewBox="0 0 110 110" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <circle cx="55" cy="55" r="55" fill="#F3F7FD"/>
                                <path
                                    d="M59.4035 48.9369C59.5831 48.7103 59.6713 48.4258 59.6511 48.1384C59.6309 47.851 59.5037 47.5813 59.2942 47.3816C59.0847 47.1819 58.8078 47.0665 58.5173 47.0578C58.2268 47.0491 57.9433 47.1476 57.722 47.3343L36.7029 65.0583L25.6032 60.8036C25.1204 60.6204 24.7007 60.3038 24.3941 59.8912C24.0876 59.4785 23.9069 58.9874 23.8737 58.476C23.8405 57.9647 23.9561 57.4546 24.2068 57.0065C24.4575 56.5583 24.8328 56.1909 25.2879 55.9479L71.3682 30.3635C71.7304 30.1702 72.1387 30.0779 72.5496 30.0966C72.9605 30.1153 73.3586 30.2442 73.7014 30.4696C74.0442 30.695 74.3188 31.0084 74.4959 31.3764C74.673 31.7444 74.746 32.1531 74.707 32.559L70.6649 74.3209C70.6244 74.7493 70.4836 75.1623 70.2537 75.5272C70.0239 75.8921 69.7112 76.1988 69.3407 76.4229C68.9702 76.647 68.552 76.7822 68.1195 76.818C67.6869 76.8537 67.2519 76.7888 66.8491 76.6286L53.3403 71.4444L44.8599 79.3208C44.5469 79.6106 44.1551 79.8032 43.7329 79.8746C43.3107 79.946 42.8766 79.8932 42.4843 79.7227C42.0921 79.5522 41.7588 79.2714 41.5259 78.9152C41.2929 78.5589 41.1704 78.1428 41.1735 77.7183V71.5325L59.4035 48.9369Z"
                                    fill="#6D6DF6"/>
                            </svg>
                        </i>

                        <h2>
                            <span>Thank</span> You!
                        </h2>

                        <p>
                            Your message has been successfully sent. We will contact you very soon!
                        </p>

                        <button
                            type={'button'}
                            className={'btn default'}
                            onClick={() => setSuccessSend(false)}>
                            OK
                        </button>
                    </li>
                </ul>

                <div className="col">
                    <h2>
                        Get an <span>instant reply!</span>
                    </h2>

                    <p>
                        Contact us with any questions or inquiries. We would be happy to get in <br/>
                        touch and set up a meeting with you. <br/>
                        Look forward to hearing from you!
                    </p>

                    <a href={`tel:${phone}`} className="phone">
                        <i>
                            <svg width="24" height="26" viewBox="0 0 24 26" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M23.4752 20.2384L23.3308 19.9495C22.9263 18.9961 17.957 17.5515 17.5525 17.5226L17.2347 17.5515C16.628 17.6671 15.9635 18.216 14.6634 19.3428C14.4034 19.5739 14.0567 19.6317 13.7389 19.4584C12.0343 18.5049 9.95415 16.5981 8.91406 15.4425C7.7873 14.2001 6.42941 12.1489 5.79381 10.5021C5.67824 10.1843 5.79381 9.83756 6.02494 9.60643C7.49839 8.27744 8.134 7.64183 8.19178 6.94844C8.22067 6.54396 7.35393 1.43021 6.4583 0.939059L6.19828 0.765711C5.62046 0.390125 4.75372 -0.158809 3.80031 0.0434301C3.56918 0.101213 3.33805 0.187886 3.13581 0.303451C2.5002 0.707929 0.911184 1.8058 0.188903 3.22147C-0.244465 4.1171 -0.446704 12.2355 5.62046 19.0828C11.6298 25.8722 19.0549 26.1611 20.1528 25.93H20.1816L20.2683 25.9011C21.7707 25.3522 23.0419 23.9365 23.533 23.3298C24.4287 22.2608 23.8219 20.9607 23.4752 20.2384Z"
                                    fill="#6D6DF6"/>
                            </svg>
                        </i>
                        {phone}
                    </a>

                    <a href={`mailto:${email}`} className="email">
                        <i>
                            <svg width="24" height="21" viewBox="0 0 24 21" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M1 0C0.447715 0 0 0.447716 0 1V2.68925C0 3.08578 0.234305 3.44486 0.597261 3.60456L11.1945 8.26735C11.7078 8.49318 12.2922 8.49318 12.8055 8.26735L23.4027 3.60456C23.7657 3.44486 24 3.08578 24 2.68924V1C24 0.447715 23.5523 0 23 0H1ZM24 7.05932C24 6.33727 23.2582 5.85321 22.5973 6.14401L13.611 10.098C12.5845 10.5496 11.4155 10.5496 10.389 10.098L1.40274 6.14401C0.74183 5.85321 0 6.33727 0 7.05933V19.5714C0 20.1237 0.447716 20.5714 1 20.5714H23C23.5523 20.5714 24 20.1237 24 19.5714V7.05932Z"
                                      fill="#6D6DF6"/>
                            </svg>
                        </i>
                        {email}
                    </a>

                    <a href="https://goo.gl/maps/c5iFucpi8GkcfEAK9" target={'_blank'}>
                        <i>
                            <svg width="24" height="31" viewBox="0 0 24 31" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12 0C5.36646 0 0 5.36646 0 12C0 18 5 24.5 9.57764 29.5C10.9509 31 13.0098 30.9334 14.4224 29.5C18.8571 25 24 17.5 24 12C24 5.36646 18.6335 0 12 0ZM12 18.8571C8.23602 18.8571 5.14286 15.8012 5.14286 12C5.14286 8.23602 8.19876 5.14286 12 5.14286C15.764 5.14286 18.8571 8.19876 18.8571 12C18.8571 15.8012 15.764 18.8571 12 18.8571Z"
                                    fill="#6D6DF6"/>
                            </svg>
                        </i>
                        15805 Biscayne blvd. 201 Aventure, FL 33160
                    </a>

                    <p className={'time'}>
                        <i>
                            <svg width="24" height="30" viewBox="0 0 24 30" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M20.4852 6.02305V2.96973H3.5127V6.02305C3.5127 9.66195 6.20457 12.7989 10.0827 13.5936C10.6302 13.7191 11.0408 14.1792 11.0408 14.6811C11.0408 15.183 10.6302 15.6431 10.0827 15.7686C6.20457 16.5633 3.5127 19.7003 3.5127 23.3392V26.3925H20.4852V23.3392C20.4852 19.7003 17.7933 16.5633 13.9152 15.7686C13.3677 15.6431 12.9571 15.183 12.9571 14.6811C12.9571 14.1792 13.3677 13.7191 13.9152 13.5936C17.7477 12.7571 20.4852 9.66195 20.4852 6.02305Z"
                                    fill="#6D6DF6"/>
                                <path
                                    d="M23.9987 1.08749C23.9987 0.501917 23.4512 0 22.8125 0H1.18625C0.547499 0 0 0.501917 0 1.08749C0 1.67306 0.547499 2.17497 1.18625 2.17497H22.7669C23.4512 2.13315 23.9987 1.67306 23.9987 1.08749Z"
                                    fill="#6D6DF6"/>
                                <path
                                    d="M0.046875 28.2747C0.046875 28.8602 0.594375 29.3622 1.23313 29.3622H22.8137C23.4525 29.3622 24 28.8602 24 28.2747C24 27.6891 23.4525 27.229 22.8137 27.229H1.1875C0.54875 27.229 0.046875 27.6891 0.046875 28.2747Z"
                                    fill="#6D6DF6"/>
                            </svg>

                        </i>
                        10:00 - 10:00 EST
                    </p>

                    <div className="media">
                        <p>We’re in social media:</p>

                        <SocialLinks/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact
