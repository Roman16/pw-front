import React from "react"
import {Checkbox, Input} from "antd"
import {Link} from "react-router-dom"

const ContactForm = () => {

    return (
        <form className={'contact-form'}>
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
                <Link to={'/terms-and-conditions'} target={'_blank'}>Terms and Conditions</Link>
                &
                <Link to={'/policy'} target={'_blank'}> Privacy Policy</Link>
            </p>
        </form>
    )
}

export default ContactForm