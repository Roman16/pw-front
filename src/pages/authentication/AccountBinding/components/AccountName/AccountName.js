import React from "react"
import './AccountName.less'
import {SVG} from "../../../../../utils/icons"
import {Input} from "antd"

const AccountName = ({onGoNextStep, onGoBackStep, onChangeInput, accountName, onCancel}) => {
    const onSubmit = (e) => {
        e.preventDefault()

        onGoNextStep()
    }

    return (
        <section className='account-name-section'>
            <h2>Create an alias for your Amazon account</h2>

            <p className={'section-description'}>
                You can create an alias for your Amazon account you are going to connect in next steps. <br/>
                It will make it easier to find this specific Amazon account later on your Account page.
            </p>

            <form action="" onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="">Account Alias</label>
                    <Input
                        value={accountName}
                        type="text"
                        name={'account_alias'}
                        placeholder={'eg. My US Account'}
                        onChange={onChangeInput}
                    />
                </div>

                <div className="actions">
                    <div className="row">
                        <button type={'button'} className="btn grey back" onClick={onGoBackStep}>
                            <SVG id={'left-grey-arrow'}/>
                            Back
                        </button>
                        <button className="btn default next">
                            {accountName ? 'Next' : 'Skip'}
                            <SVG id={'right-white-arrow'}/>
                        </button>
                    </div>

                    <button className="btn cancel" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </section>
    )
}

export default AccountName