import React, {useState} from "react";
import {Input} from "antd";

const UpdateCompanyInformationWindow = ({onClose, company, onSubmit}) => {
    const [companyInformation, changeInformation] = useState(company);

    function handleChangeInput({target: {name, value}}) {
        changeInformation({
            ...companyInformation,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();

        onSubmit(companyInformation)
    }

    return (
        <div className='drawer-window update-company-information'>
            <h3>Update Company Details</h3>

            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className="form-group company-name">
                        <label>Company</label>
                        <Input
                            className="form-control"
                            type="text"
                            name="name"
                            value={companyInformation.name}
                            // placeholder="Type first name"
                            onChange={handleChangeInput}
                            required
                        />
                    </div>
                </div>

                <div className='row address-block'>
                    <div className="form-group">
                        <label>Address Line 1</label>
                        <Input
                            className="form-control"
                            type="text"
                            name="address1"
                            value={companyInformation.address1}
                            // placeholder="Type first name"
                            onChange={handleChangeInput}
                        />
                    </div>

                    <div className="form-group">
                        <label>Address Line 2</label>
                        <Input
                            className="form-control"
                            type="text"
                            name="address2"
                            value={companyInformation.address2}
                            // placeholder="Type first name"
                            onChange={handleChangeInput}
                        />
                    </div>
                </div>

                <div className='row'>
                    <div className="form-group">
                        <label>City</label>
                        <Input
                            className="form-control"
                            type="text"
                            name="city"
                            value={companyInformation.city}
                            // placeholder="Type first name"
                            onChange={handleChangeInput}
                        />
                    </div>

                    <div className="form-group">
                        <label>State</label>
                        <Input
                            className="form-control"
                            type="text"
                            name="state"
                            value={companyInformation.state}
                            // placeholder="Type first name"
                            onChange={handleChangeInput}
                        />
                    </div>
                </div>

                <div className='row'>
                    <div className="form-group">
                        <label>Zip</label>
                        <Input
                            className="form-control"
                            type="text"
                            name="zip"
                            value={companyInformation.zip}
                            // placeholder="Type first name"
                            onChange={handleChangeInput}
                        />
                    </div>

                    <div className="form-group">
                        <label>Country</label>
                        <Input
                            className="form-control"
                            type="text"
                            name="country"
                            value={companyInformation.country}
                            // placeholder="Type first name"
                            onChange={handleChangeInput}
                        />
                    </div>
                </div>

                <div className='button-block'>
                    <button className='btn cancel' type='button' onClick={onClose}>Cancel</button>
                    <button className='btn green-btn'>Save</button>
                </div>
            </form>
        </div>
    )
};

export default UpdateCompanyInformationWindow;