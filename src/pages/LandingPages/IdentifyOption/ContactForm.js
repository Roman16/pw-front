import React from "react"
import {Input} from "antd"
import {Link} from "react-router-dom"

const ContactForm = () => {
    const submitFormHandler = (e) => {
        e.preventDefault()
    }

    return (
        <form className={'contact-form'} onSubmit={submitFormHandler}>
            <h4>Get Started with</h4>
            <h3>Total Sales Growth Acceleration</h3>
            <p>Ready to make a decision, follow the form and we will contact you:</p>

            <div className="form-group">
                <label htmlFor="">Your Name</label>
                <Input placeholder={'Your Name'}/>
            </div>

            <div className="form-group">
                <label htmlFor="">E-mail</label>
                <Input placeholder={'E-mail'}/>
            </div>

            <div className="row">
                <div className="form-group">
                    <label htmlFor="">Company name</label>
                    <Input placeholder={'Company name'}/>
                </div>

                <div className="form-group">
                    <label htmlFor="">Average Monthly Sales</label>
                    <Input placeholder={'Average Monthly Sales'}/>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="">Comment</label>
                <Input.TextArea placeholder={'Comment'}/>
            </div>

            <div className="actions">
                <button className={'btn transparent'}>
                    cancel
                </button>

                <button className={'btn green'}>
                    send

                    <svg width="17" height="12" viewBox="0 0 17 12" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <mask id="mask0999" mask-type="alpha" maskUnits="userSpaceOnUse" x="0"
                              y="0" width="17" height="12">
                            <rect width="16.8" height="12"
                                  transform="matrix(-1 0 0 1 16.7998 0)" fill="#C4C4C4"/>
                        </mask>
                        <g mask="url(#mask0999)">
                            <path
                                d="M5.69961 1.20001L1.19961 6.00001M1.19961 6.00001L5.69961 10.8M1.19961 6.00001L15.5996 6.00001"
                                stroke="#6D6DF6" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round"/>
                        </g>
                    </svg>
                </button>
            </div>

            <p className="terms">
                By proceeding you agree to our
                <Link to={'/terms-and-conditions'} target={'_blank'}> Terms and Conditions </Link>
                &
                <Link to={'/policy'} target={'_blank'}> Privacy Policy</Link>
            </p>

            <div className={'success-send'}>
                <i>
                    <svg width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle opacity="0.1" cx="55" cy="55" r="55" fill="#F3F7FD"/>
                        <path
                            d="M80.209 31.4172C80.1361 30.5503 79.4487 29.8629 78.5818 29.79C73.7857 29.3871 58.0061 29.5847 45.3584 47.2642C45.3584 47.2642 31.8846 43.7823 29.7131 61.0096C29.5764 62.0945 30.4697 63.0287 31.5615 62.9688C33.3091 62.8729 36.1535 62.4706 39.9869 61.1264C40.5331 60.9349 41.104 61.3848 41.0084 61.9557C40.8019 63.1893 40.9504 65.1044 42.9225 67.0765C44.894 69.0481 46.8085 69.1971 48.0421 68.9907C48.6131 68.8952 49.0639 69.4663 48.8724 70.0126C47.5273 73.8486 47.1255 76.6943 47.03 78.4414C46.9704 79.5302 47.9051 80.4225 48.9869 80.2862C66.217 78.1157 62.7347 64.6406 62.7347 64.6406C80.4143 51.9929 80.6119 36.2133 80.209 31.4172ZM59.1621 50.8369C56.0583 47.7333 56.7405 44.4891 59.1621 42.0676C61.5836 39.646 64.905 39.0413 67.9314 42.0676C70.9577 45.0939 70.6827 48.0856 67.9314 50.8369C65.18 53.5882 62.2657 53.9406 59.1621 50.8369Z"
                            fill="white"/>
                        <path
                            d="M43.6935 69.8091C43.6867 69.8062 43.6799 69.8034 43.6733 69.8005C43.2808 69.6338 42.8252 69.7775 42.6007 70.1401C40.6721 73.2555 37.2794 72.7198 37.2794 72.7198C37.2794 72.7198 36.7437 69.3271 39.8591 67.3984C40.2217 67.174 40.3654 66.7184 40.1987 66.3259C40.1958 66.3193 40.193 66.3125 40.1901 66.3057C40.0401 65.9512 39.6792 65.7296 39.2955 65.7605C37.1391 65.9339 30.5914 67.2726 32.773 77.2262C42.7265 79.4078 44.0653 72.8601 44.2387 70.7037C44.2696 70.32 44.048 69.9591 43.6935 69.8091Z"
                            fill="white"/>
                    </svg>
                </i>

                <h2>
                    <span>Name,</span> your acceleration is at the track.
                </h2>

                <p>
                    We will contact you in 2 business days
                </p>

                <button className={'btn green'}>
                    ok
                </button>
            </div>
        </form>
    )
}

export default ContactForm