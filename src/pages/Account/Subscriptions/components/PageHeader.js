import React from "react"

export const PageHeader = ({activeRegion}) => {
    if (activeRegion.account_alias) {
        return (<section className="page-header">
            <p>Select subscription for <b>{activeRegion.account_alias}</b> (seller id: <b>{activeRegion.seller_id}</b>)
            </p>
        </section>)

    } else {
        return (<section className="page-header">
            <p>Select subscription for seller id: <b>{activeRegion.seller_id}</b></p>
        </section>)
    }
}