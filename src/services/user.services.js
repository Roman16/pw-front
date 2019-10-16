import api from "./request";
import {userUrls} from '../constans/api.urls';

export const userService = {
    login,
};

function login(user) {
    return api('post', userUrls.login, user)
};