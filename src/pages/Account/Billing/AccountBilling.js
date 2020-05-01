import React, {useState, useEffect, Fragment} from "react";
import visaLogo from '../../../assets/img/visa-logo-white.svg';
import masterLogo from '../../../assets/img/master-logo-white.svg';
import ConfirmActionPopup from '../../../components/ModalWindow/ConfirmActionPopup';
import {Menu, Dropdown, Icon} from 'antd';
import moment from "moment";
import {allCountries} from '../../../utils/countries';
import {SVG} from "../../../utils/icons";

const UserCard = ({card: {last4, brand, exp_month, exp_year}, card, onUpdateCardInformation, deleteCard, onSet}) => {
    const menu = (
        <Menu>
            {!card.default && <Menu.Item key="0" onClick={() => onSet(card)}>Default</Menu.Item>}
            {!card.default && <Menu.Divider/>}
            <Menu.Item key="1" onClick={() => onUpdateCardInformation(card)}>Update</Menu.Item>
            <Menu.Divider/>
            <Menu.Item key="2" onClick={deleteCard}>Delete</Menu.Item>
        </Menu>
    );

    return (
        <div className='card-block'>
            <div className="card-header">
                <div className="card-logo">
                    <img src={brand === 'visa' ? visaLogo : masterLogo} alt=""/>
                </div>

                <div className="card-actions">
                    <Dropdown overlay={menu} trigger={['click']}>
                        <div className="ant-dropdown-link">
                            <div/>
                            <div/>
                            <div/>
                        </div>
                    </Dropdown>
                </div>
            </div>

            <div className="card-number">
                **** **** **** {last4}
            </div>

            <div className="card-footer">
                <div className='expires-block'>
                    <label htmlFor="">expires</label>
                    <span>{exp_month}/{moment(exp_year, 'YYYY').format('YY')}</span>
                </div>

                {card.default && <div className='default-card-block'>
                    Default Card
                    <div>
                        <SVG id='default-card-icon'/>
                    </div>
                </div>}
            </div>
        </div>
    )
};

const AccountBilling = ({onOpenWindow, paymentCards, handleConfirmDeleteCard, onSelectCard, onSetDefaultCard}) => {
    const [selectedCardIndex, setCardIndex] = useState(0),
        [openedConfirmWindow, targetWindow] = useState(false);

    const haveCard = paymentCards.length > 0;

    function onUpdateCardInformation(card) {
        onOpenWindow('updateCard', card)
    }

    function onChangePagination(cardNumber) {
        setCardIndex(cardNumber)
    }

    function handleOk() {
        handleConfirmDeleteCard(paymentCards[selectedCardIndex]);
        targetWindow(false);
    }

    function handleCancel() {
        targetWindow(false);
    }

    function goNextCard() {
        if (paymentCards.length === (selectedCardIndex + 1)) {
            setCardIndex(0);
        } else {
            setCardIndex(selectedCardIndex + 1);
        }
    }

    function goPrevCard() {
        if (selectedCardIndex === 0) {
            setCardIndex(paymentCards.length - 1);
        } else {
            setCardIndex(selectedCardIndex - 1);
        }
    }

    useEffect(() => {
        paymentCards[selectedCardIndex] && onSelectCard(paymentCards[selectedCardIndex])
    }, [selectedCardIndex]);

    useEffect(() => {
        setCardIndex(0)
    }, [paymentCards.length]);

    return (
        <Fragment>
            <section className='account-billing-block' id={'user-cards'}>
                <div className='block-description'>
                    <h3>
                        Account billing
                    </h3>

                    <span>
                        Your bills are paid using your <br/> active payment method
                    </span>
                </div>

                {haveCard && <div className='user-cards'>
                    {paymentCards.length < 10 &&
                    <button className="add-card" onClick={() => onOpenWindow('updateCard')}>
                        <SVG id={'plus-icon'}/>
                        Add Card
                    </button>}

                    <div className='cards-carousel'>
                        <div className='carousel-body'>
                            {paymentCards.length > 1 &&
                            <i onClick={goPrevCard}><SVG id={'left-arrow'}/></i>}

                            {(paymentCards.length > 3 ? [0, 1, 2] : paymentCards).map((item, index) => (
                                <div
                                    key={`shadow_${paymentCards[index].id}`}
                                    className='card-shadow'
                                    style={{
                                        top: `${10 * index}px`,
                                        left: `${20 * index}px`,
                                    }}
                                >
                                </div>
                            ))}

                            {paymentCards[selectedCardIndex] && <UserCard
                                card={paymentCards[selectedCardIndex]}
                                deleteCard={() => targetWindow(true)}
                                onSet={onSetDefaultCard}
                                onUpdateCardInformation={onUpdateCardInformation}
                            />}

                            {paymentCards.length > 1 &&
                                <i onClick={goNextCard}><SVG id={'right-arrow'}/></i>}
                        </div>

                        {paymentCards.length > 1 &&
                        <div className='carousel-pagination'>
                            {paymentCards.map((item, index) => (
                                <div
                                    style={{background: paymentCards[selectedCardIndex] && paymentCards[selectedCardIndex].id != item.id && '#fff'}}
                                    key={`pagination_${index}`}
                                    onClick={() => onChangePagination(index)}
                                />
                            ))}
                        </div>}
                    </div>

                </div>}
            </section>

            <ConfirmActionPopup
                title={'Are you really want to delete card ?'}
                visible={openedConfirmWindow}
                handleOk={handleOk}
                handleCancel={handleCancel}
            />
        </Fragment>
    )
};

export default AccountBilling;