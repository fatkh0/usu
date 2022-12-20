

import { configureStore, Reducer } from '@reduxjs/toolkit'
import thunk from "redux-thunk";

import { employeesReducer } from './employees'
import { appReducer } from './app'

export const store = configureStore({
  reducer: {
    employeesReducer: employeesReducer as Reducer,
    appReducer: appReducer as Reducer
  },
  middleware: [thunk],
})

export type TState = ReturnType<typeof store.getState>
export type TDispatch = typeof store.dispatch

type TProperties<T> = T extends {[key: string]: infer U} ? U : never
export type TInferActions<T extends {[key: string]: (...args: any) => any}> = ReturnType<TProperties<T>>
