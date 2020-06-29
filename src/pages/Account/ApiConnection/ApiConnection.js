import React, {Fragment, useEffect, useState} from "react";
import {SVG} from "../../../utils/icons";
import {Input} from "antd";
import './ApiConnection.less'
import {useDispatch, useSelector} from "react-redux";
import SellerAccount from "./SellerAccount";
import {userActions} from "../../../actions/user.actions";
import ModalWindow from "../../../components/ModalWindow/ModalWindow";
import DisconnectWindow from "./DisconnectWindow";
import {userService} from "../../../services/user.services";

const {Search} = Input;

const ApiConnection = () => {
    const [openedAccount, setOpenedAccount] = useState(null);
    const [disconnectObj, setDisconnectObj] = useState({});
    const [visibleWindow, setVisibleWindow] = useState(false);
    const [deleteProcessing, setDeleteProcessing] = useState(false);

    const dispatch = useDispatch();

    const {user} = useSelector(state => ({
        user: state.user
    }))

    useEffect(() => {
        dispatch(userActions.getPersonalUserInfo());
    }, []);

    const onOpenAccount = (index) => {
        if (openedAccount === index) {
            setOpenedAccount(null)
        } else {
            setOpenedAccount(index)
        }
    }

    const disconnectHandler = (data) => {
        setDisconnectObj(data);
        setVisibleWindow(true);
    }

    const deleteApiHandler = async () => {
        setDeleteProcessing(disconnectObj.type);
        setVisibleWindow(false);

        try {
            await userService[`unset${disconnectObj.type}`]({id: disconnectObj.id})
            dispatch(userActions.unsetAccount(disconnectObj.type));
        } catch (e) {
            console.log(e);
        }

        setDeleteProcessing(false);
    }

    return (
        <Fragment>
            <div className="user-cabinet">
                <div className="api-connection-block">
                    <div className="row ">
                        {/*<div className="form-group">*/}
                        {/*    <Search*/}
                        {/*        className="search-field"*/}
                        {/*        placeholder={'Search'}*/}
                        {/*        // onChange={e => onSearch(e.target.value)}*/}
                        {/*        data-intercom-target='search-field'*/}
                        {/*        suffix={<SVG id={'search'}/>}*/}
                        {/*    />*/}
                        {/*</div>*/}

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
                                sellerId={user.default_accounts.amazon_mws.seller_id}
                                opened={openedAccount === index}
                                onOpenAccount={() => onOpenAccount(index)}
                                onDisconnect={disconnectHandler}
                                deleteProcessing={deleteProcessing}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <ModalWindow
                visible={visibleWindow}
                footer={false}
                handleCancel={() => setVisibleWindow(false)}
                className={'disconnect-api-window'}
            >
                <DisconnectWindow
                    onDisconnect={deleteApiHandler}
                    handleCancel={() => setVisibleWindow(false)}
                />
            </ModalWindow>
        </Fragment>
    )
};

export default ApiConnection;