import api from './request';
import { userUrls } from '../constans/api.urls';

export const userService = {
    login,
    regist,
    getUserInfo,
    setMWS
};

function login(user) {
    return api('post', userUrls.login, user);
}

function regist(user) {
    return api('post', userUrls.regist, user);
}

function getUserInfo() {
    return api('get', userUrls.allInfo);
}

function setMWS(data) {
    return api('post', userUrls.mws, data);
}
