import React from "react";
import {allCountries} from '../../../utils/countries';
import {SVG} from "../../../utils/icons";

const CompanyDetails = ({onOpenWindow, company}) => {
    return (
        <section className='company-details-block page-box'>
            <div className='block-description'>
                <div className="col">
                    <h3>
                        Company Details
                    </h3>

                    <span>
                    Your company details will be reflected on your invoices
                </span>
                </div>

                <i onClick={() => onOpenWindow('company')}><SVG id={'edit-pen-icon'}/></i>
            </div>

            {company && <div className='company-information'>
                <div className='column'>
                    <div>
                        <label htmlFor="">Company</label>
                        <span>{company.name || '---'}</span>
                    </div>
                    <div>
                        <label htmlFor="">City</label>
                        <span>{company.city || '---'}</span>
                    </div>
                    <div>
                        <label htmlFor="">Zip</label>
                        <span>{company.zip || '---'}</span>
                    </div>
                </div>

                <div className='column'>
                    <div>
                        <label htmlFor="">Address Line 1</label>
                        <span>{company.address1 || '---'}</span>
                    </div>
                    <div>
                        <label htmlFor="">Address Line 2</label>
                        <span>{company.address2 || '---'}</span>
                    </div>
                    <div>
                        <label htmlFor="">Country</label>
                        <span>{company.country ? allCountries[company.country] : '---'}</span>
                    </div>
                </div>
            </div>}
        </section>
    )
};

export default CompanyDetails;