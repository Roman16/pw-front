import React, {useState, useEffect, Fragment} from "react";
import visaLogo from '../../../assets/img/visa-logo-white.svg';
import masterLogo from '../../../assets/img/master-logo-white.svg';
import selectedIcon from '../../../assets/img/icons/selected.svg';
import ConfirmActionPopup from '../../../components/ModalWindow/ConfirmActionPopup';
import {Menu, Dropdown, Icon} from 'antd';
import moment from "moment";

let cardIndex = 0;

const UserCard = ({card: {last4, brand, exp_month, exp_year}, card, onUpdateCardInformation, deleteCard, onSet}) => {
    const menu = (
        <Menu>
            <Menu.Item key="0" onClick={() => onSet(card)}>Default</Menu.Item>
            <Menu.Divider/>
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
                            <div></div>
                            <div></div>
                            <div></div>
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

                <div className='default-card-block'>
                    Default Card
                    <div>
                        {card.default && <img src={selectedIcon} alt=""/>}
                    </div>
                </div>
            </div>
        </div>
    )
};

const AccountBilling = ({onOpenWindow, paymentCards, handleConfirmDeleteCard, onSelectCard, onSetDefaultCard}) => {
    const [selectedCard, selectCard] = useState(paymentCards[0]),
        [userCards, updateCards] = useState(paymentCards),
        [openedConfirmWindow, targetWindow] = useState(false);

    const haveCard = selectedCard && userCards.length > 0;

    function onUpdateCardInformation(card) {
        onOpenWindow('updateCard', card)
    }

    function onChangePagination(cardNumber) {
        cardIndex = cardNumber;
        selectCard(userCards[cardNumber])
    }

    function handleOk() {
        handleConfirmDeleteCard(selectedCard);
        targetWindow(false);
    }

    function handleCancel() {
        targetWindow(false);
    }

    function goNextCard() {
        if (userCards.length === (cardIndex + 1)) {
            selectCard(userCards[0]);
            cardIndex = 0;
        } else {
            selectCard(userCards[cardIndex + 1]);
            cardIndex++;
        }
    }

    function goPrevCard() {
        if (cardIndex === 0) {
            selectCard(userCards[userCards.length - 1]);
            cardIndex = userCards.length - 1;
        } else {
            selectCard(userCards[cardIndex - 1]);
            cardIndex--;
        }
    }

    function handleSetDefaultCard(card) {
        onSetDefaultCard(card)
            .then(() => {
                updateCards(userCards.map(item => item.id === card.id ? {
                        ...item,
                        default: true
                    }
                    :
                    {
                        ...item,
                        default: false
                    }));
                if (selectedCard.id === card.id) {
                    selectCard({
                        ...card,
                        default: true
                    })
                }
            })
    }

    useEffect(() => {
        updateCards(paymentCards)
    }, [paymentCards]);

    useEffect(() => {
        if (!selectedCard) {
            selectCard(userCards[0])
        }
    }, [userCards]);

    useEffect(() => {
        selectedCard && onSelectCard(selectedCard)
    }, [selectedCard]);

    return (
        <Fragment>
            <section className='account-billing-block'>
                <div className='block-description'>
                    <h3>
                        Account billing
                    </h3>

                    <span>
                    Your bills are paid using your active <br/> payment method
                </span>
                </div>

                {haveCard && <div className='user-cards'>
                    <div className='cards-carousel'>
                        <div className='carousel-body'>
                            {userCards.length > 1 &&
                            <Icon type="left" onClick={goPrevCard}/>}

                            {(userCards.length > 5 ? [0, 1, 2, 3, 4] : userCards).map((item, index) => (
                                <div
                                    key={item.id}
                                    className='card-shadow'
                                    style={{
                                        top: `${0 - 5 * index}px`,
                                        opacity: `0.${10 - index}`,
                                        width: `${290 - index * 10}px`
                                    }}
                                >
                                </div>
                            ))}

                            {selectedCard && <UserCard
                                card={selectedCard}
                                deleteCard={() => targetWindow(true)}
                                onSet={handleSetDefaultCard}
                                onUpdateCardInformation={onUpdateCardInformation}
                            />}

                            {userCards.length > 1 &&
                            <Icon type="right" onClick={goNextCard}/>}
                        </div>

                        {userCards.length > 1 &&
                        <div className='carousel-pagination'>
                            {userCards.map((item, index) => (
                                <div
                                    style={{opacity: selectedCard.id != item.id && 0.5}}
                                    key={`pagination_${index}`}
                                    onClick={() => onChangePagination(index)}
                                ></div>
                            ))}
                        </div>}
                    </div>

                    <div className='billing-address'>
                        <h3>Billing address</h3>
                        <span className='street'>{selectedCard.address.line1}</span>
                        <span className='city'>{selectedCard.address.city}</span>
                        <span className='zip'>{selectedCard.address.postal_code}</span>
                        <span className='country'>{selectedCard.address.country}</span>
                    </div>
                </div>}

                <button className='btn green-btn' onClick={() => onOpenWindow('updateCard')}>
                    {/*Update payment method*/}
                    Add card
                </button>
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