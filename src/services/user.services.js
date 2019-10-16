import api from './request';
import { userUrls } from '../constans/api.urls';

export const userService = {
    login,
    regist
};

function login(user) {
    return api('post', userUrls.login, user);
}

function regist(user) {
    return api('post', userUrls.regist, user);
}
