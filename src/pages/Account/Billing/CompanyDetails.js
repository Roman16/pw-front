import React from "react";

const CompanyDetails = ({onOpenWindow, company: {name, address1, address2, zip, city, country}}) => {

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

            <div className='company-information'>
                <div className='column'>
                    {name && <div>
                        <label htmlFor="">Company</label>
                        <span>{name  || 'Fidget Spinners International'}</span>
                    </div>}
                    {city && <div>
                        <label htmlFor="">City</label>
                        <span>{city  || ''}</span>
                    </div>}
                    {zip && <div>
                        <label htmlFor="">Zip</label>
                        <span>{zip  || ''}</span>
                    </div>}
                </div>

                <div className='column'>
                    {address1 && <div>
                        <label htmlFor="">Address Line 1</label>
                        <span>{address1  || ''}</span>
                    </div>}
                    {address2 && <div>
                        <label htmlFor="">Address Line 2</label>
                        <span>{address2  || ''}</span>
                    </div>}
                    {country && <div>
                        <label htmlFor="">Country</label>
                        <span>{country  || ''}</span>
                    </div>}
                </div>
            </div>

            <button className='btn green-btn' onClick={() => onOpenWindow('company')}>
                Add company details
            </button>
        </section>
    )
};

export default CompanyDetails;