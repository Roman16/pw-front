import React from "react";
import visaLogo from "../../../assets/img/visa-logo-white.svg";
import masterLogo from "../../../assets/img/master-logo-white.svg";
import moment from "moment";

const UserCards = ({card, allCards, disabled}) => {
    if (card) {
        return (
            <div className={`card-block ${disabled ? 'disabled' : ''}`}>
                {(allCards.length > 3 ? [0, 1, 2] : allCards).map((item, index) => (
                    <div
                        className='card-shadow'
                        style={{
                            top: `${10 * index}px`,
                            left: `${10 * index}px`,
                        }}
                    >
                    </div>
                ))}

                <div className="card-header">
                    <div className="card-logo">
                        <img src={card.brand === 'visa' ? visaLogo : masterLogo} alt=""/>
                    </div>
                </div>

                <div className="card-number">
                    **** **** **** {card.last4}
                </div>

                <div className="card-footer">
                    <div className='expires-block'>
                        <label htmlFor="">expires</label>
                        <span>{card.exp_month}/{moment(card.exp_year, 'YYYY').format('YY')}</span>
                    </div>
                </div>


            </div>
        )
    } else {
        return ''
    }
};

export default UserCards;