import axios from "axios";



export class Ajax {
    static sendGetReq(url) {
        return Ajax.sendReq(url, 'get')
    }
    static sendPostReq(url, data) {
        return Ajax.sendReq(url, 'post', data)
    }
    static sendDeleteReq(url) {
        return Ajax.sendReq(url, 'delete')
    }
    static sendPutReq(url, data) {
        return Ajax.sendReq(url, 'put', data)
    }
    static async sendReq(url, method, data) {
        const response = await fetch(url, {
            method,
            body: data
        })
        const result = await response.json()
        return result;
    }

}