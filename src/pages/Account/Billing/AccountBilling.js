import React, {useState, useEffect, Fragment} from "react";
import visaLogo from '../../../assets/img/visa-logo-white.svg';
import masterLogo from '../../../assets/img/master-logo-white.svg';
import selectedIcon from '../../../assets/img/icons/selected.svg';
import ConfirmActionPopup from '../../../components/ModalWindow/ConfirmActionPopup';
import {Menu, Dropdown, Icon} from 'antd';
import {func} from "prop-types";

let cardIndex = 0;

const UserCard = ({card: {defaultCard, number, type}, card, onUpdateCardInformation, deleteCard}) => {
    const menu = (
        <Menu>
            <Menu.Item key="0">Default</Menu.Item>
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
                    <img src={type === 'visa' ? visaLogo : masterLogo} alt=""/>
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
                **** **** **** {number}
            </div>

            <div className="card-footer">
                <div className='expires-block'>
                    <label htmlFor="">expires</label>
                    <span>3/22</span>
                </div>

                <div className='default-card-block'>
                    Default Card
                    <div>
                        {defaultCard && <img src={selectedIcon} alt=""/>}
                    </div>
                </div>
            </div>
        </div>
    )
};

const AccountBilling = ({onOpenWindow, billingInformation, handleConfirmDeleteCard}) => {
    const [selectedCard, selectCard] = useState({}),
        [openedConfirmWindow, targetWindow] = useState(false);

    const haveCard = selectedCard && billingInformation.cards && billingInformation.cards.length > 0;

    function onUpdateCardInformation(card) {
        onOpenWindow('updateCard', card)
    }

    function onChangePagination(cardNumber) {
        cardIndex = cardNumber;
        selectCard(billingInformation.cards[cardNumber])
    }

    function handleOk() {
        handleConfirmDeleteCard(selectedCard);
        targetWindow(false);
    }

    function handleCancel() {
        targetWindow(false);
    }

    function goNextCard() {
        if (billingInformation.cards.length === (cardIndex + 1)) {
            selectCard(billingInformation.cards[0]);
            cardIndex = 0;
        } else {
            selectCard(billingInformation.cards[cardIndex + 1]);
            cardIndex++;
        }
    }

    function goPrevCard() {
        if (cardIndex === 0) {
            selectCard(billingInformation.cards[billingInformation.cards.length - 1]);
            cardIndex = billingInformation.cards.length - 1;
        } else {
            selectCard(billingInformation.cards[cardIndex - 1]);
            cardIndex--;
        }
    }


    useEffect(() => {
        selectCard(billingInformation.cards && billingInformation.cards[0])
    }, [billingInformation]);

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
                            {billingInformation.cards.length > 1 &&
                            <Icon type="left" onClick={goPrevCard}/>}

                            {(billingInformation.cards.length > 5 ? [0, 1, 2, 3, 4] : billingInformation.cards).map((item, index) => (
                                <div
                                    key={item.number}
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
                                onUpdateCardInformation={onUpdateCardInformation}
                            />}

                            {billingInformation.cards.length > 1 &&
                            <Icon type="right" onClick={goNextCard}/>}
                        </div>

                        {billingInformation.cards.length > 1 &&
                        <div className='carousel-pagination'>
                            {billingInformation.cards.map((item, index) => (
                                <div
                                    style={{opacity: selectedCard.number != item.number && 0.5}}
                                    key={`pagination_${index}`}
                                    onClick={() => onChangePagination(index)}
                                ></div>
                            ))}
                        </div>}
                    </div>

                    <div className='billing-address'>
                        <h3>Billing address</h3>
                        <span className='street'>Komarova</span>
                        <span className='city'>Chernivtsy</span>
                        <span className='zip'>58 000</span>
                        <span className='country'>UA</span>
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