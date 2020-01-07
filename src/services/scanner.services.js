import axios from 'axios';
import {scannerUrls} from '../constans/api.urls';

const baseUrl =
    process.env.REACT_APP_ENV === 'production'
        ? process.env.REACT_APP_API_PROD || ''
        : process.env.REACT_APP_API_URL || '';

function api(method, url) {
    const token = localStorage.getItem('token');

    return new Promise((resolve, reject) => {
        axios({
            method: method,
            url: url,
            withCredentials: true,
            // headers: {
            //     authorization: token ? `Bearer ${token}` : true
            // }
        })
            .then(result => {
                resolve(result.data);
            })

    });

}

export const scannerServices = {
    getProductMistakes,
    getScanStatus,
    scanningProduct
};

function getProductMistakes({productId, page, pageSize}) {
    const filterParams = `&draw=2&columns[0][data]=number&columns[0][name]=number&columns[0][searchable]=true&columns[0][orderable]=true&columns[0][search][value]=&columns[0][search][regex]=false&columns[1][data]=mistake_type&columns[1][name]=mistake_type&columns[1][searchable]=true&columns[1][orderable]=true&columns[1][search][value]=&columns[1][search][regex]=false&columns[2][data]=general_type&columns[2][name]=general_type&columns[2][searchable]=true&columns[2][orderable]=true&columns[2][search][value]=&columns[2][search][regex]=false&columns[3][data]=campaign_name&columns[3][name]=campaign_name&columns[3][searchable]=true&columns[3][orderable]=true&columns[3][search][value]=&columns[3][search][regex]=false&columns[4][data]=ad_group_name&columns[4][name]=ad_group_name&columns[4][searchable]=true&columns[4][orderable]=true&columns[4][search][value]=&columns[4][search][regex]=false&columns[5][data]=kp_text&columns[5][name]=kp_text&columns[5][searchable]=true&columns[5][orderable]=true&columns[5][search][value]=&columns[5][search][regex]=false&columns[6][data]=message&columns[6][name]=message&columns[6][searchable]=true&columns[6][orderable]=true&columns[6][search][value]=&columns[6][search][regex]=false&order[0][column]=0&order[0][dir]=asc&start=${pageSize * page - pageSize}&length=${pageSize}&search[value]=&search[regex]=false&_=${new Date().getTime()}`;

    return api('get', `${baseUrl}/${scannerUrls.getChanges}?product_id=${productId}${filterParams}`);
}

function getScanStatus(productId) {
    return api('get', `${baseUrl}/${scannerUrls.scanStatus}?product_id=${productId}`)
}

function scanningProduct({productId, cogs, paused}) {
    return api('get', `${baseUrl}/${scannerUrls.getScanning}?product_id=${productId}&cogs=${cogs}&check_paused_campaigns=${paused}`)
}
