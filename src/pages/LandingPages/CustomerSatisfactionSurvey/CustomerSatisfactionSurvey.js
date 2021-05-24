import React, {useState} from "react"
import './CustomerSatisfactionSurvey.less'
import Header from "../GetAudit/Header"
import Footer from "../GetAudit/Footer"
import "../GetAudit/GetAudit.less"
import {Radio, Input, Rate, Form, Button} from "antd"
import {Link} from "react-router-dom"
import {notification} from "../../../components/Notification"
import {userService} from "../../../services/user.services"

const TextArea = Input.TextArea

const CustomerSatisfactionSurvey = () => {
    const [formData, setFormData] = useState({
            working_with_pw_mark: undefined,
            ppc_performance_mark: undefined,
            careteam_performance_mark: undefined,
            achieving_your_goals_mark: undefined,
            marks_comment: undefined,
            how_long_you_with_pw: undefined,
            how_do_you_feel_about_pw: undefined,
            how_we_can_improve: undefined,
            what_we_can_do_better: undefined,
            additional_comments: undefined,
            your_contacts: undefined,
        }),
        [successSend, setSuccessSend] = useState(false)

    const changeFormHandler = (value) => {
        setFormData({
            ...formData,
            ...value
        })
    }

    const sendFormHandler = async (e) => {
        e.preventDefault()
        const desc = ['very_unsatisfied', 'unsatisfied', 'neutral', 'satisfied', 'very_satisfied']

        if (Object.values(formData).some(item => item === undefined)) {
            notification.error({title: 'Please enter all fields!'})
        } else {
            try {
                await userService.sendCustomerSatisfactionSurveyForm({
                    ...formData,
                    working_with_pw_mark: desc[formData.working_with_pw_mark],
                    ppc_performance_mark: desc[formData.ppc_performance_mark],
                    careteam_performance_mark: desc[formData.careteam_performance_mark],
                    achieving_your_goals_mark: desc[formData.achieving_your_goals_mark],
                })
                setSuccessSend(true)
            } catch (e) {
                console.log(e)
            }
        }
    }

    const RateBlock = ({title, id}) => {
        return (<div className="rate-block">
            <h4>{title}</h4>

            <Rate
                value={formData[id]}
                onChange={value => changeFormHandler({[id]: value})}
            />


            <Radio.Group
                value={formData[id]}
                onChange={({target: {value}}) => changeFormHandler({[id]: value})}
            >
                <Radio value={1}>
                    very unsatisfied
                </Radio>
                <Radio value={2}>
                    unsatisfied
                </Radio>
                <Radio value={3}>
                    neutral
                </Radio>
                <Radio value={4}>
                    satisfied
                </Radio>
                <Radio value={5}>
                    very satisfied
                </Radio>
            </Radio.Group>
        </div>)
    }


    return <div className="customer-satisfaction-survey get-audit-page landing-page">
        <Header/>

        {successSend ? <section className="pre-header success">
                <div className="container">
                    <i>
                        <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="64" cy="64" r="64"/>
                            <path
                                d="M40.1247 58.4265H46.9534V90.376H40.1247C39.296 90.376 38.5012 90.0468 37.9152 89.4609C37.3292 88.8749 37 88.0801 37 87.2514V61.5512C37 61.1408 37.0808 60.7345 37.2379 60.3554C37.3949 59.9763 37.625 59.6319 37.9152 59.3417C38.2053 59.0516 38.5498 58.8214 38.9289 58.6644C39.308 58.5073 39.7143 58.4265 40.1247 58.4265Z"
                                fill="#6D6DF6"/>
                            <path
                                d="M85.1236 56.8023H66.3661L67.5342 37.7314C67.5397 37.1315 67.3457 36.5468 66.9827 36.0691C66.6198 35.5915 66.1084 35.2479 65.529 35.0925C64.9495 34.937 64.3349 34.9784 63.7816 35.2103C63.2283 35.4421 62.7676 35.8512 62.4721 36.3732L50.6382 55.9665C50.3253 56.5129 50.1615 57.1319 50.1633 57.7616V88.41C50.1633 88.8814 50.2562 89.3482 50.4366 89.7838C50.617 90.2194 50.8815 90.6151 51.2148 90.9485C51.5482 91.2819 51.944 91.5463 52.3795 91.7267C52.8151 91.9071 53.2819 92 53.7534 92H75.4456C77.2149 92.0012 78.9387 91.4396 80.3678 90.3964C81.7968 89.3532 82.857 87.8825 83.395 86.197L89.0935 69.9278C89.6843 68.2526 89.9893 66.49 89.9958 64.7137C89.9958 63.4221 89.9958 62.1399 89.9958 62.0639C90.0425 61.3937 89.9514 60.721 89.7282 60.0872C89.5049 59.4535 89.1543 58.8723 88.6978 58.3793C88.2413 57.8863 87.6886 57.492 87.0739 57.2208C86.4592 56.9496 85.7954 56.8072 85.1236 56.8023Z"
                                fill="#6D6DF6"/>
                        </svg>
                    </i>
                    <h2>
                        Thank You for Your <span>valuable feedback!</span>
                    </h2>
                    <p>
                        Now, you can read some our insights:
                    </p>

                    <div className="buttons">
                        <Link to={'/'} className="btn white">
                            back to home
                        </Link>

                        <a
                            target={'_blank'}
                            href={'https://blog.profitwhales.com/'} className="btn default">
                            <span className={'desk'}>see profit whales in action</span>
                            <span className={'mob'}>read insignts</span>

                            <Arrow/>
                        </a>
                    </div>
                </div>
            </section>
            :
            <>
                <section className="pre-header">
                    <div className="container">
                        <div className="col">
                            <h2>
                                Customer <span>Satisfaction</span> <br/> Survey
                            </h2>
                            <p>
                                Help Us to Serve you Better
                            </p>
                        </div>
                    </div>
                </section>

                <section className={'satisfaction-form'}>
                    <form onSubmit={sendFormHandler} className="container">
                        <h2>
                            Your opinion is <span>very important</span> to us
                        </h2>

                        <p>
                            Thank you for taking the Customer Satisfaction Survey. The survey should take <br/>
                            less than five minutes of your time.
                        </p>

                        <div className="step step-0">
                            <lable className="step-label">
                                step 1/7
                            </lable>

                            <h3>
                                How can You measure Your experience with Profit Whales?
                            </h3>

                            <div className="rate-list">
                                <RateBlock
                                    title={'Working with Profit Whales'}
                                    id={'working_with_pw_mark'}
                                />
                                <RateBlock
                                    title={'PPC specialists\' performance'}
                                    id={'ppc_performance_mark'}
                                />
                                <RateBlock
                                    title={'Client Manager specialists\' performance'}
                                    id={'careteam_performance_mark'}
                                />
                                <RateBlock
                                    title={'Achieving your goals with the company '}
                                    id={'achieving_your_goals_mark'}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Please comment your marks here</label>
                                <TextArea
                                    value={formData.marks_comment}
                                    onChange={({target: {value}}) => changeFormHandler({marks_comment: value})}
                                    placeholder={'Write your answer here'}
                                />
                            </div>
                        </div>

                        <div className="step step-1">
                            <lable className="step-label">
                                step 2/7
                            </lable>

                            <h3>
                                How long are you working with Profit Whales?
                            </h3>

                            <Radio.Group
                                value={formData.how_long_you_with_pw}
                                onChange={({target: {value}}) => changeFormHandler({how_long_you_with_pw: value})}
                            >
                                <ul>
                                    <li
                                        className={formData.how_long_you_with_pw === 'less_1_month' && 'active'}
                                        onClick={() => changeFormHandler({how_long_you_with_pw: 'less_1_month'})}
                                    >
                                        <i>
                                            <div/>
                                        </i>
                                        <p>{'<1 month'}</p>
                                        <Radio value={'less_1_month'}/>
                                    </li>

                                    <li
                                        className={formData.how_long_you_with_pw === '1_3_month' && 'active'}
                                        onClick={() => changeFormHandler({how_long_you_with_pw: '1_3_month'})}
                                    >
                                        <i>
                                            <div/>
                                            <div/>
                                        </i>
                                        <p>1-3 months</p>
                                        <Radio value={'1_3_month'}/>
                                    </li>

                                    <li
                                        className={formData.how_long_you_with_pw === '3_6_month' && 'active'}
                                        onClick={() => changeFormHandler({how_long_you_with_pw: '3_6_month'})}
                                    >
                                        <i>
                                            <div/>
                                            <div/>
                                            <div/>
                                        </i>
                                        <p>3-6 months</p>
                                        <Radio value={'3_6_month'}/>
                                    </li>

                                    <li
                                        className={formData.how_long_you_with_pw === '6_12_month' && 'active'}
                                        onClick={() => changeFormHandler({how_long_you_with_pw: '6_12_month'})}
                                    >
                                        <i>
                                            <svg width="33" height="32" viewBox="0 0 33 32" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M11.1967 18.2678C12.173 17.2915 12.173 15.7085 11.1967 14.7322C10.2204 13.7559 8.63748 13.7559 7.66117 14.7322C6.68486 15.7085 6.68486 17.2915 7.66117 18.2678C8.63748 19.2441 10.2204 19.2441 11.1967 18.2678Z"
                                                    fill="#6D6DF6"/>
                                                <path
                                                    d="M18.2678 25.3388C19.2441 24.3625 19.2441 22.7796 18.2678 21.8033C17.2915 20.827 15.7085 20.827 14.7322 21.8033C13.7559 22.7796 13.7559 24.3625 14.7322 25.3388C15.7085 26.3151 17.2915 26.3151 18.2678 25.3388Z"
                                                    fill="#6D6DF6"/>
                                                <path
                                                    d="M18.2678 11.1967C19.2441 10.2204 19.2441 8.6375 18.2678 7.66119C17.2915 6.68488 15.7085 6.68488 14.7322 7.66119C13.7559 8.6375 13.7559 10.2204 14.7322 11.1967C15.7085 12.173 17.2915 12.173 18.2678 11.1967Z"
                                                    fill="#6D6DF6"/>
                                                <path
                                                    d="M25.3388 18.2678C26.3151 17.2915 26.3151 15.7085 25.3388 14.7322C24.3625 13.7559 22.7796 13.7559 21.8033 14.7322C20.827 15.7085 20.827 17.2915 21.8033 18.2678C22.7796 19.2441 24.3625 19.2441 25.3388 18.2678Z"
                                                    fill="#6D6DF6"/>
                                            </svg>
                                        </i>
                                        <p>6-12 months</p>
                                        <Radio value={'6_12_month'}/>
                                    </li>

                                    <li
                                        className={formData.how_long_you_with_pw === 'more_1_year' && 'active'}
                                        onClick={() => changeFormHandler({how_long_you_with_pw: 'more_1_year'})}
                                    >
                                        <i>
                                            <svg width="33" height="32" viewBox="0 0 33 32" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M9.27324 17.8182C10.0264 17.8182 10.6369 17.2076 10.6369 16.4545C10.6369 15.7014 10.0264 15.0909 9.27324 15.0909C8.52013 15.0909 7.90961 15.7014 7.90961 16.4545C7.90961 17.2076 8.52013 17.8182 9.27324 17.8182Z"
                                                    fill="#6D6DF6"/>
                                                <path
                                                    d="M11.0906 23.2727C11.8437 23.2727 12.4542 22.4586 12.4542 21.4545C12.4542 20.4503 11.8437 19.6363 11.0906 19.6363C10.3374 19.6363 9.72693 20.4503 9.72693 21.4545C9.72693 22.4586 10.3374 23.2727 11.0906 23.2727Z"
                                                    fill="#6D6DF6"/>
                                                <path
                                                    d="M17.0009 25.091C18.005 25.091 18.819 24.4805 18.819 23.7273C18.819 22.9742 18.005 22.3637 17.0009 22.3637C15.9967 22.3637 15.1827 22.9742 15.1827 23.7273C15.1827 24.4805 15.9967 25.091 17.0009 25.091Z"
                                                    fill="#6D6DF6"/>
                                                <path
                                                    d="M22.9098 23.2727C23.6629 23.2727 24.2734 22.4586 24.2734 21.4545C24.2734 20.4503 23.6629 19.6363 22.9098 19.6363C22.1567 19.6363 21.5461 20.4503 21.5461 21.4545C21.5461 22.4586 22.1567 23.2727 22.9098 23.2727Z"
                                                    fill="#6D6DF6"/>
                                                <path
                                                    d="M17.0658 17.948C18.1058 17.948 18.9489 17.1049 18.9489 16.0649C18.9489 15.0249 18.1058 14.1818 17.0658 14.1818C16.0258 14.1818 15.1827 15.0249 15.1827 16.0649C15.1827 17.1049 16.0258 17.948 17.0658 17.948Z"
                                                    fill="#6D6DF6"/>
                                                <path
                                                    d="M24.7271 17.8182C25.4802 17.8182 26.0907 17.2076 26.0907 16.4545C26.0907 15.7014 25.4802 15.0909 24.7271 15.0909C23.974 15.0909 23.3635 15.7014 23.3635 16.4545C23.3635 17.2076 23.974 17.8182 24.7271 17.8182Z"
                                                    fill="#6D6DF6"/>
                                                <path
                                                    d="M11.61 12.4934C12.6501 12.4934 13.4932 11.6503 13.4932 10.6103C13.4932 9.57027 12.6501 8.72717 11.61 8.72717C10.57 8.72717 9.72693 9.57027 9.72693 10.6103C9.72693 11.6503 10.57 12.4934 11.61 12.4934Z"
                                                    fill="#6D6DF6"/>
                                                <path
                                                    d="M17.0658 9.76623C18.1058 9.76623 18.9489 8.92313 18.9489 7.88312C18.9489 6.8431 18.1058 6 17.0658 6C16.0258 6 15.1827 6.8431 15.1827 7.88312C15.1827 8.92313 16.0258 9.76623 17.0658 9.76623Z"
                                                    fill="#6D6DF6"/>
                                                <path
                                                    d="M22.5197 12.4934C23.5597 12.4934 24.4028 11.6503 24.4028 10.6103C24.4028 9.57027 23.5597 8.72717 22.5197 8.72717C21.4796 8.72717 20.6365 9.57027 20.6365 10.6103C20.6365 11.6503 21.4796 12.4934 22.5197 12.4934Z"
                                                    fill="#6D6DF6"/>
                                                <path
                                                    d="M17 6C15.7806 6 14.7778 7.00282 14.7778 8.22222C14.7778 9.44163 15.7806 10.4444 17 10.4444C18.2194 10.4444 19.2222 9.44163 19.2222 8.22222C19.2222 7.00282 18.2194 6 17 6ZM17 7.33333C17.4988 7.33333 17.8889 7.72341 17.8889 8.22222C17.8889 8.72104 17.4988 9.11111 17 9.11111C16.5012 9.11111 16.1111 8.72104 16.1111 8.22222C16.1111 7.72341 16.5012 7.33333 17 7.33333ZM11.4444 8.22222C10.225 8.22222 9.22222 9.22504 9.22222 10.4444C9.22222 11.6638 10.225 12.6667 11.4444 12.6667C12.6638 12.6667 13.6667 11.6638 13.6667 10.4444C13.6667 9.22504 12.6638 8.22222 11.4444 8.22222ZM22.5556 8.22222C21.3362 8.22222 20.3333 9.22504 20.3333 10.4444C20.3333 11.6638 21.3362 12.6667 22.5556 12.6667C23.775 12.6667 24.7778 11.6638 24.7778 10.4444C24.7778 9.22504 23.775 8.22222 22.5556 8.22222ZM11.4444 9.55556C11.9433 9.55556 12.3333 9.94563 12.3333 10.4444C12.3333 10.9433 11.9433 11.3333 11.4444 11.3333C10.9456 11.3333 10.5556 10.9433 10.5556 10.4444C10.5556 9.94563 10.9456 9.55556 11.4444 9.55556ZM22.5556 9.55556C23.0544 9.55556 23.4444 9.94563 23.4444 10.4444C23.4444 10.9433 23.0544 11.3333 22.5556 11.3333C22.0567 11.3333 21.6667 10.9433 21.6667 10.4444C21.6667 9.94563 22.0567 9.55556 22.5556 9.55556ZM9.22222 13.7778C8.00282 13.7778 7 14.7806 7 16C7 17.2194 8.00282 18.2222 9.22222 18.2222C10.4416 18.2222 11.4444 17.2194 11.4444 16C11.4444 14.7806 10.4416 13.7778 9.22222 13.7778ZM17 13.7778C15.7806 13.7778 14.7778 14.7806 14.7778 16C14.7778 17.2194 15.7806 18.2222 17 18.2222C18.2194 18.2222 19.2222 17.2194 19.2222 16C19.2222 14.7806 18.2194 13.7778 17 13.7778ZM24.7778 13.7778C23.5584 13.7778 22.5556 14.7806 22.5556 16C22.5556 17.2194 23.5584 18.2222 24.7778 18.2222C25.9972 18.2222 27 17.2194 27 16C27 14.7806 25.9972 13.7778 24.7778 13.7778ZM9.22222 15.1111C9.72104 15.1111 10.1111 15.5012 10.1111 16C10.1111 16.4988 9.72104 16.8889 9.22222 16.8889C8.72341 16.8889 8.33333 16.4988 8.33333 16C8.33333 15.5012 8.72341 15.1111 9.22222 15.1111ZM17 15.1111C17.4988 15.1111 17.8889 15.5012 17.8889 16C17.8889 16.4988 17.4988 16.8889 17 16.8889C16.5012 16.8889 16.1111 16.4988 16.1111 16C16.1111 15.5012 16.5012 15.1111 17 15.1111ZM24.7778 15.1111C25.2766 15.1111 25.6667 15.5012 25.6667 16C25.6667 16.4988 25.2766 16.8889 24.7778 16.8889C24.279 16.8889 23.8889 16.4988 23.8889 16C23.8889 15.5012 24.279 15.1111 24.7778 15.1111ZM11.4444 19.3333C10.225 19.3333 9.22222 20.3362 9.22222 21.5556C9.22222 22.775 10.225 23.7778 11.4444 23.7778C12.6638 23.7778 13.6667 22.775 13.6667 21.5556C13.6667 20.3362 12.6638 19.3333 11.4444 19.3333ZM22.5556 19.3333C21.3362 19.3333 20.3333 20.3362 20.3333 21.5556C20.3333 22.775 21.3362 23.7778 22.5556 23.7778C23.775 23.7778 24.7778 22.775 24.7778 21.5556C24.7778 20.3362 23.775 19.3333 22.5556 19.3333ZM11.4444 20.6667C11.9433 20.6667 12.3333 21.0567 12.3333 21.5556C12.3333 22.0544 11.9433 22.4444 11.4444 22.4444C10.9456 22.4444 10.5556 22.0544 10.5556 21.5556C10.5556 21.0567 10.9456 20.6667 11.4444 20.6667ZM22.5556 20.6667C23.0544 20.6667 23.4444 21.0567 23.4444 21.5556C23.4444 22.0544 23.0544 22.4444 22.5556 22.4444C22.0567 22.4444 21.6667 22.0544 21.6667 21.5556C21.6667 21.0567 22.0567 20.6667 22.5556 20.6667ZM17 21.5556C15.7806 21.5556 14.7778 22.5584 14.7778 23.7778C14.7778 24.9972 15.7806 26 17 26C18.2194 26 19.2222 24.9972 19.2222 23.7778C19.2222 22.5584 18.2194 21.5556 17 21.5556ZM17 22.8889C17.4988 22.8889 17.8889 23.279 17.8889 23.7778C17.8889 24.2766 17.4988 24.6667 17 24.6667C16.5012 24.6667 16.1111 24.2766 16.1111 23.7778C16.1111 23.279 16.5012 22.8889 17 22.8889Z"
                                                    fill="#6D6DF6"/>
                                            </svg>
                                        </i>
                                        <p>{'>1 year'}</p>
                                        <Radio value={'more_1_year'}/>
                                    </li>
                                </ul>
                            </Radio.Group>
                        </div>

                        <div className="step step-2">
                            <lable className="step-label">
                                step 3/7
                            </lable>

                            <h3>
                                How do you feel about Profit Whales?
                            </h3>

                            <div className="form-group">
                                <label htmlFor="">Your comment</label>
                                <TextArea
                                    value={formData.how_do_you_feel_about_pw}
                                    onChange={({target: {value}}) => changeFormHandler({how_do_you_feel_about_pw: value})}
                                    placeholder={'Your comment'}
                                />
                            </div>
                        </div>

                        <div className="step step-3">
                            <lable className="step-label">
                                step 4/7
                            </lable>

                            <h3>
                                How can we improve your experience with the company?
                            </h3>

                            <div className="form-group">
                                <label htmlFor="">Your comment</label>
                                <TextArea
                                    value={formData.how_we_can_improve}
                                    onChange={({target: {value}}) => changeFormHandler({how_we_can_improve: value})}
                                    placeholder={'Your comment'}
                                />
                            </div>
                        </div>

                        <div className="step step-4">
                            <lable className="step-label">
                                step 5/7
                            </lable>

                            <h3>
                                What can our employees do better?
                            </h3>

                            <div className="form-group">
                                <label htmlFor="">Your comment</label>
                                <TextArea
                                    value={formData.what_we_can_do_better}
                                    onChange={({target: {value}}) => changeFormHandler({what_we_can_do_better: value})}
                                    placeholder={'Your comment'}
                                />
                            </div>
                        </div>

                        <div className="step step-5">
                            <lable className="step-label">
                                step 6/7
                            </lable>

                            <h3>
                                Do you have any additional comments or feedback for us?
                            </h3>

                            <div className="form-group">
                                <label htmlFor="">Your comment</label>
                                <TextArea
                                    value={formData.additional_comments}
                                    onChange={({target: {value}}) => changeFormHandler({additional_comments: value})}
                                    placeholder={'Your comment'}
                                />
                            </div>
                        </div>

                        <div className="step step-5">
                            <lable className="step-label">
                                step 7/7
                            </lable>

                            <h3>
                                You can leave your contacts here
                            </h3>

                            <div className="form-group">
                                <label htmlFor="">Your comment</label>
                                <TextArea
                                    value={formData.your_contacts}
                                    onChange={({target: {value}}) => changeFormHandler({your_contacts: value})}
                                    placeholder={'Your comment'}
                                />
                            </div>
                        </div>

                        <button className="btn default" disabled={Object.values(formData).some(item => item === undefined)}>
                            send
                            <Arrow/>
                        </button>
                    </form>
                </section>
            </>}
        <Footer/>
    </div>
}

const Arrow = () => <svg width="17" height="12" viewBox="0 0 17 12" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="17"
          height="12">
        <rect width="16.8" height="12" fill="#C4C4C4"/>
    </mask>
    <g mask="url(#mask0)">
        <path d="M11.1 1.19995L15.6 5.99995M15.6 5.99995L11.1 10.8M15.6 5.99995L1.2 5.99995"
              stroke="white" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round"/>
    </g>
</svg>


export default CustomerSatisfactionSurvey