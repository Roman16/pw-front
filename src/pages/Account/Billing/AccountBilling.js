import React, {useState, useEffect} from "react";
import visaLogo from '../../../assets/img/visa-logo-white.svg';
import selectedIcon from '../../../assets/img/icons/selected.svg';
import {Menu, Dropdown, Carousel} from 'antd';

const menu = (
    <Menu>
        <Menu.Item key="0">Delete</Menu.Item>
        <Menu.Divider/>
        <Menu.Item key="3">Default</Menu.Item>
    </Menu>
);

const UserCard = ({card}) => {
    return (
        <div className='card-block'>
            <div className="card-header">
                <div className="card-logo">
                    <img src={visaLogo} alt=""/>
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
                **** **** **** {card.number}
            </div>

            <div className="card-footer">
                <div className='expires-block'>
                    <label htmlFor="">expires</label>
                    <span>3/22</span>
                </div>

                <div className='default-card-block'>
                    Default Card
                    <img src={selectedIcon} alt=""/>
                </div>
            </div>

        </div>

    )
};

const AccountBilling = ({onOpenWindow, billingInformation}) => {
    const [selectedCard, selectCard] = useState({});

    function onChange(e) {
        console.log(e);
    }

    function onChangePagination(cardNumber) {
        selectCard(billingInformation.cards[cardNumber])
    }

    useEffect(() => {
        selectCard(billingInformation.cards && billingInformation.cards[0])
    }, [billingInformation]);

    console.log(selectedCard);

    return (
        <section className='account-billing-block'>
            <div className='block-description'>
                <h3>
                    Account billing
                </h3>

                <span>
                    Your bills are paid using your active <br/> payment method
                </span>
            </div>

            {selectedCard && <div className='user-cards'>
                <div className='cards-carousel'>
                    <div className='carousel-body'>
                        <UserCard
                            card={selectedCard}
                        />
                    </div>

                    {billingInformation.cards && billingInformation.cards.length > 1 &&
                    <div className='carousel-pagination'>
                        {billingInformation.cards.map((item, index) => (
                            <div
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
            </div>
            }
            <button className='btn green-btn' onClick={() => onOpenWindow('updateCard')}>
                {/*Update payment method*/}
                Add card
            </button>
        </section>
    )
};

export default AccountBilling;