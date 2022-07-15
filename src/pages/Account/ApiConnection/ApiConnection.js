import React, {useEffect, useState} from "react"
import './ApiConnection.less'
import {Accounts} from "./Accounts"
import {AccountDetails} from "./AccountDetails"
import {Filters} from "./Filters"
import {Tabs} from "./Tabs"
import {useDispatch, useSelector} from "react-redux"
import {userService} from "../../../services/user.services"
import {userActions} from "../../../actions/user.actions"
import {EmptyData, NoFoundData} from "../../../components/Table/CustomTable"
import _ from 'lodash'

const ApiConnection = () => {
    const [sortType, setSortType] = useState(''),
        [selectedAccount, setSelectedAccount] = useState(),
        [searchStr, setSearchStr] = useState('')

    const accounts = useSelector(state => state.user.amazonRegionAccounts),
        activeRegion = useSelector(state => state.user.activeAmazonRegion),
        activeMarketplace = useSelector(state => state.user.activeAmazonMarketplace)

    const dispatch = useDispatch()

    const selectAccountHandler = (account) => {
        setSelectedAccount(account)
    }

    const updateAccountHandler = async (data) => {
        try {
            const {result} = await userService.updateAmazonAccount(data)
            dispatch(userActions.updateAmazonRegionAccount(result))
        } catch (e) {
            console.log(e)
        }
    }

    const setMarketplaceHandler = (data) => {
        dispatch(userActions.setActiveRegion(data))
        window.location.reload()
    }

    const revokeAccessHandler = async (type, id) => {
        try {
            const {result} = await userService[type === 'ads' ? 'unsetAdsApi' : 'unsetMWS'](id)

            dispatch(userActions.updateAmazonRegionAccount(result))
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (accounts.length > 0) setSelectedAccount(accounts[0])
    }, [])

    useEffect(() => {
        setSelectedAccount(prevState => _.find(accounts, {id: prevState.id}))
    }, [accounts])

    const accountsWithFilter = accounts.filter(account => account.account_alias.toLowerCase().trim().includes(searchStr.toLowerCase().replace(/\s+/g, '')) || account.seller_id.toLowerCase().includes(searchStr.toLowerCase().replace(/\s+/g, '')))

    return (
        <div className="api-connection">
            <Tabs/>

            <Filters
                sortType={sortType}

                onChangeSort={() => setSortType(prevState => prevState === 'asc' ? 'desc' : prevState === 'desc' ? '' : 'asc')}
                onChangeSearch={setSearchStr}
            />

            {accountsWithFilter.length > 0 ? <div className="row">
                <Accounts
                    accounts={accountsWithFilter}
                    selectedAccount={selectedAccount}
                    activeRegion={activeRegion}
                    activeMarketplace={activeMarketplace}

                    onSelect={selectAccountHandler}
                    onSetMarketplace={setMarketplaceHandler}
                />

                {selectedAccount !== undefined && <AccountDetails
                    account={selectedAccount}

                    onUpdateAlias={updateAccountHandler}
                    onDisconnect={revokeAccessHandler}
                />}
            </div> : <NoData searchStr={searchStr}/>}
        </div>
    )
}

export default ApiConnection

const NoData = ({searchStr}) => {
    if (searchStr) {
        return <NoFoundData description={'Please try adjusting your search.'}/>
    } else {
        return <EmptyData title={'No data found'} description={'There’s currently no data to display'}/>
    }
}