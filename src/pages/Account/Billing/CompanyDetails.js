import React from "react";
import {allCountries} from '../../../utils/countries';

const CompanyDetails = ({onOpenWindow, company}) => {
    return (
        <section className='company-details-block page-box'>
            <div className='block-description'>
                <h3>
                    Company Details
                </h3>

                <span>
                    Your company details will be reflected on <br/> your invoices
                </span>
            </div>

            {company && <div className='company-information'>
                <div className='column'>
                    {company.name && <div>
                        <label htmlFor="">Company</label>
                        <span>{company.name || 'Fidget Spinners International'}</span>
                    </div>}
                    {company.city && <div>
                        <label htmlFor="">City</label>
                        <span>{company.city || ''}</span>
                    </div>}
                    {company.zip && <div>
                        <label htmlFor="">Zip</label>
                        <span>{company.zip || ''}</span>
                    </div>}
                    {company.state && <div>
                        <label htmlFor="">State</label>
                        <span>{company.state || ''}</span>
                    </div>}
                </div>

                <div className='column'>
                    {company.address1 && <div>
                        <label htmlFor="">Address Line 1</label>
                        <span>{company.address1 || ''}</span>
                    </div>}
                    {company.address2 && <div>
                        <label htmlFor="">Address Line 2</label>
                        <span>{company.address2 || ''}</span>
                    </div>}
                    {company.country && <div>
                        <label htmlFor="">Country</label>
                        <span>{allCountries[company.country] || ''}</span>
                    </div>}
                </div>
            </div>}

            <div className='buttons-block'>
                <button className='btn green-btn' onClick={() => onOpenWindow('company')}>
                    Add company details
                </button>
            </div>
        </section>
    )
};

export default CompanyDetails;