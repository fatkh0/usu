import * as React from 'react'

import Notification from '../component/atom/notification/Notification';
import Preloader from '../component/atom/preloader/Preloader';
import Navigation from '../component/molecule/navigation/Navigation';
import PageRoutes from '../component/molecule/pageRoutes/PageRoutes';
import { IPageRoute } from '../types/types';

const AllEmployees = React.lazy(() => import("../component/organism/allEmployees/AllEmployees"))
const AddNewEmployee = React.lazy(() => import("../component/organism/addNewEmploee/AddNewEmployee"))
const EmployeesData = React.lazy(() => import("../component/organism/employeesData/EmployeesData"))

import * as style from './appWrapper.module.scss';

interface IProps {}

const pageRoutes: Array<IPageRoute> = [
    {
        path: '/all_employees', pageName: 'All Employees', component: AllEmployees
    }, {
        path: '/add_employee', pageName: 'Add New Employee', component: AddNewEmployee
    }, {
        path: '/employeed_data', pageName: 'Employees Data', component: EmployeesData
    }
]

const AppWrapper: React.FC<IProps> = () => {
    return (
        <div className={style.appWrapper}>
            <Preloader />
            <Notification />
            <Navigation pageRoutes={pageRoutes}/>
            <PageRoutes pageRoutes={pageRoutes}/>
        </div>
    )
}

export default AppWrapper