import React from "react";

const CompanyDetails = ({onOpenWindow}) => {

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

            <button className='btn green-btn' onClick={() => onOpenWindow('company')}>
                Add company details
            </button>
        </section>
    )
};

export default CompanyDetails;