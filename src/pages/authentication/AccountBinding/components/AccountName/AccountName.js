import React from "react";
import './AccountName.less';
import {SVG} from "../../../../../utils/icons";
import {Input} from "antd";

const AccountName = ({onGoNextStep, onGoBackStep, onChangeInput}) => {
    const onSubmit = (e) => {
        e.preventDefault();

        onGoNextStep();
    }

    return (
        <section className='account-name-section'>
            <h2>What’s your seller account name?</h2>

            <form action="" onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="">Seller Account Name</label>
                    <Input
                        required
                        type="text"
                        name={'accountName'}
                        placeholder={'eg. DSG14HAMO23R2'}
                        onChange={onChangeInput}
                    />
                </div>

                <div className="actions">
                    <button type={'button'} className="btn white" onClick={onGoBackStep}>
                        <SVG id={'left-grey-arrow'}/>
                        Back
                    </button>
                    <button className="btn default">
                        Next
                        <SVG id={'right-white-arrow'}/>
                    </button>
                </div>
            </form>
        </section>
    )
};

export default AccountName;