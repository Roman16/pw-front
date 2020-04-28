import React, {useState} from "react";
import {Input, Select, InputNumber } from "antd";
import {countries} from "../../../../utils/countries";

const Option = Select.Option;

const UpdateCompanyInformationWindow = ({onClose, company, onSubmit}) => {
    const [companyInformation, changeInformation] = useState(company);

    function handleChangeInput({target: {name, value}, target}) {
        changeInformation({
            ...companyInformation,
            [name]: value
        })
    }

    function handleChangeSelect(value) {
        changeInformation({
            ...companyInformation,
            country: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(companyInformation)
    }

    return (
        <div className='drawer-window update-company-information'>
            <button className="close-btn" type="button" onClick={onClose}>
                &#215;
            </button>

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
                            name="zip"
                            value={companyInformation.zip}
                            // placeholder="Type first name"
                            onChange={handleChangeInput}
                        />
                    </div>

                    <div className="form-group">
                        <label>Country</label>

                        <Select onChange={handleChangeSelect} placeholder='Country'
                                showSearch
                                getPopupContainer={trigger => trigger.parentNode}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                value={companyInformation.country}>
                            {countries.map(item => (
                                <Option key={item.code} value={item.code}>{item.name}</Option>
                            ))}
                        </Select>

                    </div>
                </div>

                <div className='button-block'>
                    <button className='btn white' type='button' onClick={onClose}>Cancel</button>
                    <button className='btn green-btn'>Save</button>
                </div>
            </form>
        </div>
    )
};

export default UpdateCompanyInformationWindow;