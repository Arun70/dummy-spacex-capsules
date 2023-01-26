export function ApiHelper(url, data = {}, method = 'GET') {
    // let bearer = 'Bearer ' + localStorage.getItem('user_token');
    return fetch(url, {  // Return promise
        method: method,
        // withCredentials: true,
        // credentials: 'include',
        // headers: {
        //     'Authorization': bearer,
        //     'X-FP-API-KEY': 'chaptoken',
        //     'Content-Type': 'application/json'
        // }
    })
        .then(res => res.json())
        .then((result) => {
            console.log(result);
            return result;
        }, (error) => {
            error = error;
        })
}