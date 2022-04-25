import React from "react"

export const PageHeader = ({user}) => {
    if(user.default_accounts.amazon_mws.account_name) {
        return (<section className="page-header">
            <p>Select subscription for <b>{user.default_accounts.amazon_mws.account_name}</b> (seller id: <b>{user.default_accounts.amazon_mws.seller_id}</b>)</p>
        </section>)

    } else {
        return (<section className="page-header">
            <p>Select subscription for seller id: <b>{user.default_accounts.amazon_mws.seller_id}</b></p>
        </section>)
    }
}