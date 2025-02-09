import React, {useEffect, useRef} from "react"
import ModalWindow from "../ModalWindow"
import {productsActions} from "../../../actions/products.actions"
import {useDispatch, useSelector} from "react-redux"
import {userService} from "../../../services/user.services"
import {userActions} from "../../../actions/user.actions"

let intervalId = null

export const ImportProfileWindow = ({visible, container, firstName, lastName, marketplace}) => {
    const prevVisibleRef = useRef()
    const dispatch = useDispatch()

    const checkStatus = async () => {
        try {
            const importStatus = await userService.checkImportStatus(marketplace.id)
            dispatch(userActions.updateUser({importStatus: importStatus.result}))
        } catch (e) {

        }
    }


    useEffect(() => {
        if (prevVisibleRef.current && !visible) document.location.reload()

        prevVisibleRef.current = visible

        visible && checkStatus()

        intervalId = setInterval(() => {
            if (visible) {
                checkStatus()
            } else {
                clearInterval(intervalId)
            }
        }, 10000)

        return (() => {
            clearInterval(intervalId)
        })
    }, [visible])


    return(
    <ModalWindow
        className={'amazon-loading-window profile-import'}
        wrapClassName="import-status-window-wrap"
        visible={visible}
        container={!container}
        getContainer={container}
        maskStyle={container && {
            width: '100%',
            right: 'inherit',
            left: 'inherit',
            top: '0',
            zIndex: '11'
        }}
    >
        <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g >
                <rect opacity="0.04" x="-4" y="29.406" width="43.0895" height="42.2509" rx="13" transform="rotate(-50.8297 -4 29.406)" fill="#353A3E"/>
                <rect opacity="0.04" x="49.0146" y="70.8857" width="20.4753" height="20.0768" rx="7" transform="rotate(-110.518 49.0146 70.8857)" fill="#353A3E"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.97866 9C7.45339 9 5.40625 11.0471 5.40625 13.5724V55.4276C5.40625 57.9529 7.45339 60 9.97866 60L20.8816 60H46.3314C48.5866 60 50.5051 58.3556 50.85 56.1269L56.2933 20.9545C56.7222 18.1835 54.5787 15.6828 51.7747 15.6828H20.8821V13.5724C20.8821 11.0471 18.835 9 16.3097 9H9.97866Z" fill="#FF5256"/>
                <path d="M17.1152 25.3048C17.1152 23.9451 18.2175 22.8428 19.5773 22.8428H51.0817C52.4415 22.8428 53.5438 23.9451 53.5438 25.3048V42.9664C53.5438 44.3262 52.4415 45.4285 51.0817 45.4285H19.5773C18.2175 45.4285 17.1152 44.3262 17.1152 42.9664V25.3048Z" fill="white"/>
                <path d="M13.053 29.5057C13.6291 27.5654 15.4123 26.2346 17.4364 26.2346H58.897C61.9545 26.2346 64.1505 29.1774 63.2804 32.1083L55.9711 56.729C55.3951 58.6694 53.6118 60.0001 51.5878 60.0001H10.1271C7.06967 60.0001 4.87362 57.0574 5.74376 54.1264L13.053 29.5057Z" fill="#FF787C"/>
                <path d="M29.9749 34.7834L29.9749 40.9536L27.6644 40.9536C27.4502 40.9533 27.2399 41.0128 27.0573 41.1257C26.8747 41.2386 26.7269 41.4005 26.6305 41.593C26.55 41.7555 26.5085 41.9347 26.5092 42.1162C26.5092 42.3678 26.5903 42.6125 26.7402 42.8137L33.6717 52.1489C33.8898 52.4416 34.2323 52.614 34.5959 52.614C34.9595 52.614 35.3019 52.4416 35.5201 52.1489L42.4575 42.8137C42.6304 42.5817 42.7108 42.293 42.6831 42.0045C42.6555 41.7158 42.5216 41.448 42.3078 41.2536C42.0939 41.0591 41.8157 40.9522 41.5275 40.9537L39.217 40.9537L39.217 34.7834C39.217 34.4751 39.0953 34.1794 38.8787 33.9613C38.6619 33.7433 38.3681 33.6208 38.0617 33.6208L31.1303 33.6208C30.8239 33.6208 30.5301 33.7433 30.3134 33.9613C30.0967 34.1794 29.9749 34.4751 29.9749 34.7834Z" fill="white"/>
            </g>
        </svg>

        <h2>Welcome {firstName} {lastName}!</h2>

        <p>
            We are retrieving your Advertising accounts from Amazon API. <br/>
            This usually takes less than a few minutes.
        </p>
    </ModalWindow>)}