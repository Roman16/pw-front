import React, {useState} from "react"
import {userService} from "../../../services/user.services"
import ExcelTable from "../../../components/ExcelTable/ExcelTable"
import {textColumn} from "react-datasheet-grid"
import {notification} from "../../../components/Notification"

const {hostname} = new URL(window.location.href)

let copyArr = [],
    timerId = null

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

const copyTableHandler = (data) => {
    copyArr = [...copyArr, data]

    clearTimeout(timerId)
    timerId = setTimeout(() => {
        onCopy(copyArr.join("\r\n"))
        copyArr = []
    }, 100)
}


const columns = [
    {
        ...selectColumn('token', textColumn),
        title: 'Registration Link',
        copyValue: (props) => {
            copyTableHandler(`${hostname}/agency-registration/${props.rowData.token}`)
        }
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
        <ExcelTable
            data={tokens}
            columns={columns}
        />

    </section>)
}

export default AgencyUsers