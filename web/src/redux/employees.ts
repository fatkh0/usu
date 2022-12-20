import {Dispatch, Reducer} from "@reduxjs/toolkit"
import {ThunkAction} from "redux-thunk"
import {TState, TInferActions} from "./store"
import { IEmployee, IEmployeeStatisticByPosition } from "../types/types";
import { ResponseCode } from "../constant/apiResponseCode";
import { employeeApi, IGetAllEmployees, IDeleteEmployee, ICreateEmployee, IGetEmployeesStatisticByPosition } from "../api/api";

import {action as appActions, notifyMessageType } from './app'

const actionTypes = Object.freeze({
    SET_EMPLOYEES: 'app/employees/setEmployees',
    SET_EMPLOYEES_STATISTIC_BY_POSITION: 'app/employees/setEmployeesStatistic'
})


const initialState = {
    employees: [] as Array<IEmployee>,
    employeeStatisticByPosition: [] as Array<IEmployeeStatisticByPosition>
}

type TInitialState = typeof initialState
type TAction = TInferActions<typeof actions>
type ThunkType = ThunkAction<Promise<void>, TState, unknown, TAction>

export const employeesReducer: Reducer<TInitialState, TAction> = (state = initialState, action: TAction): TInitialState => {
    switch (action.type) {
        case actionTypes.SET_EMPLOYEES:
            return {
                ...state,
                employees: action.employees
            }
        case actionTypes.SET_EMPLOYEES_STATISTIC_BY_POSITION: 
            return {
                ...state,
                employeeStatisticByPosition: action.employeeStatisticByPosition
            }
        default:
            return state
    }
}

export const actions = {
  setEmployees: (employees: Array<IEmployee>) => ({ type: actionTypes.SET_EMPLOYEES, employees } as const),
  setEmployeeStatisticByPosition: (employeeStatisticByPosition: Array<IEmployeeStatisticByPosition>) => ({ type: actionTypes.SET_EMPLOYEES_STATISTIC_BY_POSITION, employeeStatisticByPosition } as const),
}

export const createEmployee = (employeeData: IEmployee, callback: () => void): ThunkType => async (dispatch: Dispatch, ...rest) => {

    dispatch(appActions.toggleLoadingPopup(true))

    const response: ICreateEmployee | undefined = await employeeApi.createEmployee(employeeData);

    if (!response) {
        dispatch(appActions.toggleLoadingPopup(false))
        dispatch(appActions.addNotify(notifyMessageType.error, 'Employee has not been created'))
        return;
    }

    if ( response.status === ResponseCode.SUCCESS) {
        dispatch(appActions.toggleLoadingPopup(false))
        dispatch(appActions.addNotify(notifyMessageType.error, 'Employee has been created'))
        callback()
    } else {
        dispatch(appActions.toggleLoadingPopup(false))
        dispatch(appActions.addNotify(notifyMessageType.error, 'Employee has not been deleted ' + response.status))
    }
}

export const deleteEmployee = (id: number): ThunkType => async (dispatch: Dispatch, ...rest) => {
    dispatch(appActions.toggleLoadingPopup(true))
    const response: IDeleteEmployee | undefined = await employeeApi.deleteEmployee(id);

    if (!response) {
        dispatch(appActions.toggleLoadingPopup(false))
        dispatch(appActions.addNotify(notifyMessageType.error, 'Employee has not been deleted'))
        return;
    }

    if (response.status === ResponseCode.SUCCESS) {
        getAllEmployees()(dispatch, ...rest)
        dispatch(appActions.toggleLoadingPopup(false))
        dispatch(appActions.addNotify(notifyMessageType.error, 'Employee has been deleted'))
  
    } else {
        dispatch(appActions.toggleLoadingPopup(false))
        dispatch(appActions.addNotify(notifyMessageType.error, 'Employee has not been deleted ' + response.status))
    }
}

export const getAllEmployees = (): ThunkType => async (dispatch: Dispatch) => {
    dispatch(appActions.toggleLoadingPopup(true))
    const response: IGetAllEmployees | undefined = await employeeApi.getAll();

    if (!response) {
        dispatch(appActions.toggleLoadingPopup(false))
        return;
        
    }

    if (response.status === ResponseCode.SUCCESS) {
        dispatch(actions.setEmployees(response.data))
        dispatch(appActions.toggleLoadingPopup(false))

    } else {
        dispatch(appActions.addNotify(notifyMessageType.error, String(response.status)))
        dispatch(appActions.toggleLoadingPopup(false))
    }
}

export const getEmployeesStatisticByPosition = (): ThunkType => async (dispatch: Dispatch) => {
    dispatch(appActions.toggleLoadingPopup(true))
    const response: IGetEmployeesStatisticByPosition | undefined = await employeeApi.getEmployeesStatisticByPosition();

    if (!response) {
        dispatch(appActions.toggleLoadingPopup(false))
        return;
    }

    if (response.status === ResponseCode.SUCCESS) {
        dispatch(actions.setEmployeeStatisticByPosition(response.data))
        dispatch(appActions.toggleLoadingPopup(false))

    } else {
        dispatch(appActions.addNotify(notifyMessageType.error, String(response.status)))
        dispatch(appActions.toggleLoadingPopup(false))
    }
}

function responseStatusHandler (status: number): string | undefined {
    return Object.keys(ResponseCode).find(key => ResponseCode[key as keyof typeof ResponseCode] === status);
}
