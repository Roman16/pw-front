import React, {useState} from "react"
import {userService} from "../../../services/user.services"
import ExcelTable from "../../../components/ExcelTable/ExcelTable"
import {keyColumn, textColumn} from "react-datasheet-grid"
import {notification} from "../../../components/Notification"

const {hostname} = new URL(window.location.href)


const onCopy = (str) => {
    notification.success({title: 'Copied'})
    navigator.clipboard.writeText(str)
}

const SelectComponent = ({rowData: {token}}) => {
    return <p title={token}
              onClick={() => onCopy(`${hostname}/agency-registration/${token}`)}> {`${hostname}/agency-registration/${token}`}</p>
}
const selectColumn = () => ({
    component: SelectComponent,
})


const columns = [
    {
        ...selectColumn('token', textColumn),
        title: 'Registration Link',
        disabled: () => true,
        width: 10
    },
]

const AgencyUsers = () => {
    const [tokens, setTokens] = useState([])

    const getTokens = async () => {
        try {
            const {result} = await userService.getRegistrationTokens()

            setTokens(result.tokens)
        } catch (e) {
            console.log(e)
        }
    }


    return (<section className={'registration-links'}>
   <button className={'btn default'} onClick={getTokens}>Get registration link</button>

        {/*<ul>*/}
        {/*    {tokens.map(i => <li>*/}
        {/*        <p title={i.token}> {`${hostname}/agency-registration/${i.token}`}</p>*/}


        {/*    </li>)}*/}
        {/*</ul>*/}

        <ExcelTable
            data={tokens}
            columns={columns}
        />

    </section>)
}

export default AgencyUsers