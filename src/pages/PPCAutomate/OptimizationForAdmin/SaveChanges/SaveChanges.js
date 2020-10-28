import React from "react"
import './SaveChanges.less'

const SaveChanges = () => {

    return (<section className={'save-changes-section'}>
        <p>You have unsaved changes</p>

        <div className="buttons">
            <button className={'btn default'}>Revert</button>
            <button className={'btn white'}>Save Changes</button>
        </div>
    </section>)
}

export default SaveChanges
