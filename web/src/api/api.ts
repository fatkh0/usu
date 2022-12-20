import { deleteData, getData, postData } from './apiMethods'

import { ResponseCode } from "../constant/apiResponseCode";
import { IEmployee } from "../types/types";


export interface IGetAllEmployees {
    status: number
    data: Array<IEmployee>
}

export interface IDeleteEmployee {
    status: number
    data: string
}

export interface ICreateEmployee{
    status: number
    data: IEmployee
}

export interface IGetEmployeesStatisticByPosition{
    status: number
    data: Array<IGetEmployeesStatisticByPosition>
}




export const employeeApi = {
    async getAll() {
        return await getData()
    },

    async deleteEmployee(id: number) {
        return await deleteData(String(id))
    },

    async createEmployee(employeeData: IEmployee) {
        return await postData(employeeData)
    },

    async getEmployeesStatisticByPosition() {
        return await getData('statistics_by_position')
    }

}

