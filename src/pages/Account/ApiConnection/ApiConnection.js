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
        [searchStr, setSearchStr] = useState(''),
        [updateProcessing, setUpdateProcessing] = useState(false)

    const accounts = useSelector(state => state.user.amazonRegionAccounts),
        activeRegion = useSelector(state => state.user.activeAmazonRegion),
        activeMarketplace = useSelector(state => state.user.activeAmazonMarketplace)

    const dispatch = useDispatch()

    const selectAccountHandler = (account) => {
        setSelectedAccount(account)
    }

    const updateAccountHandler = async (data) => {
        setUpdateProcessing(true)

        try {
            const {result} = await userService.updateAmazonAccount(data)
            dispatch(userActions.updateAmazonRegionAccount(result))
        } catch (e) {
            console.log(e)
        }

        setUpdateProcessing(false)
    }

    const setMarketplaceHandler = (data) => {
        dispatch(userActions.setActiveRegion(data))
        window.location.reload()
    }

    const revokeAccessHandler = async (type, id) => {
        try {
            const {result} = await userService[type === 'ads' ? 'unsetAdsApi' : 'unsetSpApi'](id)

            dispatch(userActions.updateAmazonRegionAccount(result))
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (accounts.length > 0) setSelectedAccount(accounts[0])
    }, [])

    useEffect(() => {
        selectedAccount && setSelectedAccount(prevState => _.find(accounts, {id: prevState.id}))
    }, [accounts])

    const accountsWithFilter = accounts
        .filter(account => (account.account_alias || account.seller_id).toLowerCase().replace(/\s+/g, '').includes(searchStr.toLowerCase().replace(/\s+/g, '')) || account.seller_id.toLowerCase().includes(searchStr.toLowerCase().replace(/\s+/g, '')))
        .sort((a, b) => {
            if (sortType === 'asc') {
                return (a.account_alias || a.seller_id).localeCompare(b.account_alias || b.seller_id)
            } else if (sortType === 'desc') {
                return (b.account_alias || b.seller_id).localeCompare(a.account_alias || a.seller_id)
            } else {
                return 0
            }
        })

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
                    updateProcessing={updateProcessing}

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