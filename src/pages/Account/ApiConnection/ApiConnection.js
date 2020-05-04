import React, {useState} from "react";
import Navigation from "../Navigation/Navigation";
import {SVG} from "../../../utils/icons";
import {Input} from "antd";
import './ApiConnection.less'
import {useDispatch, useSelector} from "react-redux";
import SellerAccount from "./SellerAccount";
import {userActions} from "../../../actions/user.actions";

const {Search} = Input;


const ApiConnection = () => {
    const [openedAccount, setOpenedAccount] = useState(null);
    const dispatch = useDispatch();

    const {user} = useSelector(state => ({
        user: state.user
    }))

    const onOpenAccount = (index) => {
        if (openedAccount === index) {
            setOpenedAccount(null)
        } else {
            setOpenedAccount(index)
        }
    }

    const disconnectHandler = (account, id) => {
        dispatch(userActions.unsetAccount(account, {id}))
    }

    return (
        <div className="user-cabinet">
            <Navigation page={'api_connections'}/>

            <div className="api-connection-block">
                <div className="row ">
                    <div className="form-group">
                        <Search
                            className="search-field"
                            placeholder={'Search'}
                            // onChange={e => onSearch(e.target.value)}
                            data-intercom-target='search-field'
                            suffix={<SVG id={'search'}/>}
                        />
                    </div>

                    <button className={'btn default p15'} disabled={user.account_links.length >= 1}>
                        <SVG id={'plus-icon'}/>
                        Add Account

                        {user.account_links.length >= 1 && <span>soon</span>}
                    </button>
                </div>

                <div className={'connections-list'}>
                    {user.account_links.map((account, index) => (
                        <SellerAccount
                            key={`account_${index}`}
                            sellerName={user.user.name}
                            account={account}
                            opened={openedAccount === index}
                            onOpenAccount={() => onOpenAccount(index)}
                            onDisconnect={disconnectHandler}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
};

export default ApiConnection;