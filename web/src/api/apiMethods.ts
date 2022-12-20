import axios from 'axios'
import { IEmployee } from "../types/types"

const instance = axios.create({
    baseURL: 'http://44.202.107.183/api/employees/',
})

export const getData = async (url = '') => {
    try {
        return await instance.get(url).then(response => ({data: response.data, status: response.status}))
        
    } catch (err) {
        console.log(err)
    }
}

export const deleteData = async (identifier: string, url = '' ) => {
    try {
        return await instance.delete(identifier).then(response => ({data: response.data, status: response.status}))

    } catch (err) {
        console.log(err)
    }
    
}

export const postData = async (postData: IEmployee, url = '') => {
    try {
        return await instance.post<IEmployee>(url, postData).then(response => ({data: response.data, status: response.status}))

    } catch (err) {
        console.log(err)
    }
}

