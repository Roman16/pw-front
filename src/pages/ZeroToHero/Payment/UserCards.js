import React from "react";
import visaLogo from "../../../assets/img/visa-logo-white.svg";
import masterLogo from "../../../assets/img/master-logo-white.svg";
import moment from "moment";
import {SVG} from "../../../utils/icons";

const UserCards = ({selectedCard, allCards, disabled, onSwipeCard}) => {
    const onPrev = () => {
        onSwipeCard(selectedCard === 0 ? allCards.length - 1 : selectedCard - 1)
    };

    const onNext = () => {
        onSwipeCard(selectedCard === allCards.length - 1 ? 0 : selectedCard + 1)
    };


    const onChangePagination = (index) => {
        onSwipeCard(index)
    };


    if (allCards[selectedCard]) {
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

                {allCards.length > 1 && <button
                    disabled={disabled}
                    className={'prev'}
                    onClick={onPrev}
                    type={'button'}
                >
                    <SVG id={'left-arrow'}/>
                </button>}

                <div className="card-header">
                    <div className="card-logo">
                        <img src={allCards[selectedCard].brand === 'visa' ? visaLogo : masterLogo} alt=""/>
                    </div>
                </div>

                <div className="card-number">
                    **** **** **** {allCards[selectedCard].last4}
                </div>

                <div className="card-footer">
                    <div className='expires-block'>
                        <label htmlFor="">expires</label>
                        <span>{allCards[selectedCard].exp_month}/{moment(allCards[selectedCard].exp_year, 'YYYY').format('YY')}</span>
                    </div>

                    {allCards[selectedCard].default && <div className='default-card-block'>
                        Default Card
                        <div>
                            <SVG id='default-card-icon'/>
                        </div>
                    </div>}
                </div>

                {allCards.length > 1 && <button
                    disabled={disabled}
                    className={'next'}
                    onClick={onNext}
                    type={'button'}
                >
                    <SVG id={'left-arrow'}/>
                </button>}

                {allCards.length > 1 &&
                <div className='carousel-pagination'>
                    {allCards.map((item, index) => (
                        <div
                            style={{background: allCards[selectedCard] && allCards[selectedCard].id != item.id && '#fff'}}
                            key={`pagination_${index}`}
                            onClick={() => onChangePagination(index)}
                        />
                    ))}
                </div>}
            </div>
        )
    } else {
        return ''
    }
};

export default UserCards;