import * as React from 'react'
import { EmployeePosition } from '../constant/employeePosition'

export interface IEmployee {
    id: number
    name: string
    age: number
    position: keyof typeof EmployeePosition
}

export interface IPageRoute {
    path: string
    pageName: string
    component: typeof React.Component
}

export interface IEmployeeStatisticByPosition {
    age: number
    count: number
    position: keyof typeof EmployeePosition
}

