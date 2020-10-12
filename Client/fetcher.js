import axios from "axios";

export const httpGet = (url, setIsLoading, callback) => {
    setIsLoading(true);
    axios({
        method: 'get',
        url: url,
    }).then(res =>{
        setIsLoading(false);
        callback(res.data);
    }).catch(err => {
        setIsLoading(false);
        console.log(err)
    });
}

export const httpPost = (url, data, setIsLoading, callback) => {
    setIsLoading(true);
    axios({
        method: 'post',
        url: url,
        data: data
    }).then(res =>{
        setIsLoading(false);
        callback(res.data);
    }).catch(err => {
        setIsLoading(false);
        console.log(err)
    });
}

export const httpPut = (url, data, setIsLoading, callback) => {
    setIsLoading(true);
    axios({
        method: 'put',
        url: url,
        data: data,
    }).then(res =>{
        setIsLoading(false);
        callback(res.data);
    }).catch(err => {
        setIsLoading(false);
        console.log(err);
        return err;
    });
}

export const httpDelete = (url, setIsLoading, callback) => {
    setIsLoading(true);
    axios({
        method: 'delete',
        url: url,
    }).then(res =>{
        setIsLoading(false);
        callback(res.data);
    }).catch(err => {
        setIsLoading(false);
        console.log(err)
    });
}