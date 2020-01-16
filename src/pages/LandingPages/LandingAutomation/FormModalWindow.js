import React from "react";
import closeIcon from '../../../assets/img/icons/close-icon.svg';

const FormModalWindow = () => {

    return (
        <div className='free-audit-form'>
            <div className="close-btn">
                <img src={closeIcon} alt=""/>
            </div>

            <img src="" alt=""/>

            <form action="">
                <div className="title">
                    Fill the form:
                </div>

                <div className="input-group">
                    <label htmlFor="">Name</label>
                    <input type="text"/>
                </div>

                <div className="input-group">
                    <label htmlFor="">E-mail</label>
                    <input type="email"/>
                </div>

                <div className="description">
                    We treat your contact information according to our policy
                </div>

                <button className='btn green-btn'>
                    SEND
                </button>
            </form>
        </div>
    )
};

export default FormModalWindow;