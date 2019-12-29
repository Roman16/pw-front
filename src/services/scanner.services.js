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
            headers: {
                authorization: token ? `Bearer ${token}` : true
            }
        })
            .then(result => {
                console.log(result);
                resolve(result.data);
            })

    });

}

export const scannerServices = {
    getProductMistakes,
    getScanStatus
};

function getProductMistakes(productId) {
    const filterParams = `&draw=2&columns[0][data]=number&columns[0][name]=number&columns[0][searchable]=true&columns[0][orderable]=true&columns[0][search][value]=&columns[0][search][regex]=false&columns[1][data]=mistake_type&columns[1][name]=mistake_type&columns[1][searchable]=true&columns[1][orderable]=true&columns[1][search][value]=&columns[1][search][regex]=false&columns[2][data]=general_type&columns[2][name]=general_type&columns[2][searchable]=true&columns[2][orderable]=true&columns[2][search][value]=&columns[2][search][regex]=false&columns[3][data]=campaign_name&columns[3][name]=campaign_name&columns[3][searchable]=true&columns[3][orderable]=true&columns[3][search][value]=&columns[3][search][regex]=false&columns[4][data]=ad_group_name&columns[4][name]=ad_group_name&columns[4][searchable]=true&columns[4][orderable]=true&columns[4][search][value]=&columns[4][search][regex]=false&columns[5][data]=kp_text&columns[5][name]=kp_text&columns[5][searchable]=true&columns[5][orderable]=true&columns[5][search][value]=&columns[5][search][regex]=false&columns[6][data]=message&columns[6][name]=message&columns[6][searchable]=true&columns[6][orderable]=true&columns[6][search][value]=&columns[6][search][regex]=false&order[0][column]=0&order[0][dir]=asc&start=0&length=50&search[value]=&search[regex]=false&_=${new Date().getTime()}`;
    // const filterParams = '&draw=2&columns%5B0%5D%5Bdata%5D=number&columns%5B0%5D%5Bname%5D=number&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=true&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=mistake_type&columns%5B1%5D%5Bname%5D=mistake_type&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=true&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=general_type&columns%5B2%5D%5Bname%5D=general_type&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=true&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=campaign_name&columns%5B3%5D%5Bname%5D=campaign_name&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=true&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=ad_group_name&columns%5B4%5D%5Bname%5D=ad_group_name&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=true&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B5%5D%5Bdata%5D=kp_text&columns%5B5%5D%5Bname%5D=kp_text&columns%5B5%5D%5Bsearchable%5D=true&columns%5B5%5D%5Borderable%5D=true&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B6%5D%5Bdata%5D=message&columns%5B6%5D%5Bname%5D=message&columns%5B6%5D%5Bsearchable%5D=true&columns%5B6%5D%5Borderable%5D=true&columns%5B6%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B6%5D%5Bsearch%5D%5Bregex%5D=false&order%5B0%5D%5Bcolumn%5D=0&order%5B0%5D%5Bdir%5D=asc&start=0&length=50&search%5Bvalue%5D=&search%5Bregex%5D=false&_=1577203906776';

    // return api('get', `${scannerUrls.getChanges}?product_id=${productId}${filterParams}`)

    return api('get', `${baseUrl}/${scannerUrls.getChanges}?product_id=${productId}${filterParams}`);
}

function getScanStatus(productId) {
    return api('get', `${baseUrl}/${scannerUrls.scanStatus}?product_id=${productId}`)
}
