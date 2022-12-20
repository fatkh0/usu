import { INotifyMessage } from "../redux/app"
import { TState } from "../redux/store"
import { IEmployee, IEmployeeStatisticByPosition } from "../types/types"

export const getAllStoredEmployees = (state: TState): Array<IEmployee> => {
    return state.employeesReducer.employees
}

export const getIsLoading = (state: TState): boolean => {
    return state.appReducer.isLoading
}

export const getNotification = (state: TState): Array<INotifyMessage> => {
    return state.appReducer.notify
}

export const getEmployeeStatisticByPosition = (state: TState): Array<IEmployeeStatisticByPosition> => {
    return state.employeesReducer.employeeStatisticByPosition
}

