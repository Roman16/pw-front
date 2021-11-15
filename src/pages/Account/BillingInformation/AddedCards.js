import React, {useState} from "react"
import moment from "moment"
import {Dropdown, Menu} from "antd"
import {PlusIcon} from "../ApiConnection/ConnectedAccounts"

const AddedCards = ({cards, activeCardIndex, onDelete, onSetDefault, onSetActive}) => {
    const [visibleDropdown, setVisibleDropdown] = useState(false)

    return (<ul>
        {cards.map((card, index) => <li className={activeCardIndex === index && 'active'}
                                        onClick={() => onSetActive(index)}>
            <div className="row">
                {card.brand === 'visa' ? <VisaLogo/> : <MasterLogo/>}
                {card.default && <p className={'default'}>Default</p>}
                <Dropdown
                    visible={visibleDropdown === index}
                    onClick={e => e.stopPropagation()}
                    onVisibleChange={e => e ? setVisibleDropdown(index) : setVisibleDropdown(false)}
                    overlay={
                        <Menu>
                            {!card.default &&
                            <Menu.Item key="0" onClick={() => onSetDefault(index)}>Set as default</Menu.Item>}
                            <Menu.Item key="2" onClick={() => onDelete(index)}>Delete</Menu.Item>
                        </Menu>}
                    trigger={['click']}
                >
                    <div className="ant-dropdown-link">
                        <div/>
                        <div/>
                        <div/>
                    </div>
                </Dropdown>
            </div>

            <div className="row">
                <p className="card-number">{`**** **** **** ${card.last4}`}</p>

                <p className="expires-date">{card.exp_month}/{moment(card.exp_year, 'YYYY').format('YY')}</p>
            </div>
        </li>)}

        <li className={'add-new'}>
            <PlusIcon/>
            Add Payment Method
        </li>
    </ul>)
}

const VisaLogo = () => <i className={'visa'}>
    <svg width="55" height="18" viewBox="0 0 55 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M28.4447 5.59466C28.4133 8.03236 30.6495 9.39278 32.3341 10.2016C34.0649 11.0315 34.6463 11.5636 34.6397 12.3057C34.6264 13.4415 33.259 13.9427 31.979 13.9622C29.7461 13.9964 28.448 13.3683 27.4158 12.8931L26.6115 16.6017C27.647 17.072 29.5644 17.4821 31.5529 17.5C36.2202 17.5 39.2739 15.2299 39.2904 11.7101C39.3086 7.24312 33.0195 6.99577 33.0624 4.99907C33.0773 4.39371 33.6636 3.74767 34.9485 3.58332C35.5844 3.50033 37.34 3.43686 39.3301 4.34001L40.1113 0.751814C39.041 0.367771 37.6653 0 35.9526 0C31.5595 0 28.4695 2.301 28.4447 5.59466ZM47.6176 0.309187C46.7654 0.309187 46.0469 0.799006 45.7265 1.55082L39.0592 17.2364H43.7232L44.6514 14.7092H50.3509L50.8893 17.2364H55L51.4128 0.309187H47.6176ZM48.2699 4.8819L49.6159 11.2381H45.9297L48.2699 4.8819ZM22.7898 0.309187L19.1134 17.2364H23.5577L27.2324 0.309187H22.7898ZM16.2149 0.309187L11.5889 11.8305L9.71773 2.03413C9.49808 0.94058 8.63101 0.309187 7.66816 0.309187H0.105699L0 0.800632C1.55246 1.1326 3.31632 1.66798 4.38487 2.2408C5.03889 2.59066 5.22551 2.8966 5.44021 3.72815L8.98445 17.2364H13.6815L20.8822 0.309187H16.2149Z"
            fill="url(#paint0_linear_21225:69752)"/>
        <defs>
            <linearGradient id="paint0_linear_21225:69752" x1="25.2858" y1="17.8511" x2="25.7849" y2="-0.122113"
                            gradientUnits="userSpaceOnUse">
                <stop stop-color="#222357"/>
                <stop offset="1" stop-color="#254AA5"/>
            </linearGradient>
        </defs>
    </svg>
</i>

const MasterLogo = () => <i className={'master'}>
    <svg width="36" height="24" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.8667 3.25488H13.1328V20.745H22.8667V3.25488Z" fill="#FF5F00"/>
        <path
            d="M13.7511 12.0004C13.7511 8.44678 15.4197 5.29486 17.9845 3.25537C16.0996 1.77211 13.7202 0.875977 11.1245 0.875977C4.9751 0.875977 0 5.85108 0 12.0004C0 18.1498 4.9751 23.1249 11.1245 23.1249C13.7202 23.1249 16.0996 22.2287 17.9845 20.7455C15.4197 18.7369 13.7511 15.5541 13.7511 12.0004Z"
            fill="#EB001B"/>
        <path
            d="M36.0002 12.0004C36.0002 18.1498 31.0251 23.1249 24.8757 23.1249C22.28 23.1249 19.9006 22.2287 18.0156 20.7455C20.6113 18.706 22.2491 15.5541 22.2491 12.0004C22.2491 8.44678 20.5804 5.29486 18.0156 3.25537C19.9006 1.77211 22.28 0.875977 24.8757 0.875977C31.0251 0.875977 36.0002 5.88198 36.0002 12.0004Z"
            fill="#F79E1B"/>
    </svg>
</i>


export default AddedCards