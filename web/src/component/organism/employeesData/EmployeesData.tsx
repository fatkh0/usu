import * as React  from 'react';
import {connect} from "react-redux";
import { getEmployeeStatisticByPosition } from '../../../utils/selectors';
import {getEmployeesStatisticByPosition} from '../../../redux/employees';
import { TState } from '../../../redux/store';
import { IEmployeeStatisticByPosition } from '../../../types/types';
import * as styles from './employeesData.module.scss';
import * as classNames from 'classnames';

interface IOwnProps {}

interface IStateProps {
    employeeStatisticByPosition: Array<IEmployeeStatisticByPosition>
}

interface IDispatchProps {
    getEmployeesStatisticByPosition: () => void
}

const EmployeesData: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({employeeStatisticByPosition, getEmployeesStatisticByPosition}) => {

    React.useEffect(() => {
        getEmployeesStatisticByPosition()
    }, [])

    return (
        <div className={styles.employeesData}>
            
            <table>
                <thead className={styles.head}>
                    <tr className={classNames(styles.row)}>
                        <th className={styles.cell}>Position</th>
                        <th className={styles.cell}>Count of employees</th>
                        <th className={styles.cell}>Average age</th>
                    </tr>
                </thead>
                <tbody className={styles.body}>
                    {
                        employeeStatisticByPosition.map(statisticData => (
                            <tr className={styles.row}>
                                <td className={styles.cell}>{statisticData.position}</td>
                                <td className={styles.cell}>{statisticData.count}</td>
                                <td className={styles.cell}>{parseInt(statisticData.age)}</td>
                            </tr>
                        ))
                    }
                    <td></td>
                </tbody>
            </table>
        </div>
    )
}


const mapStateToProps = (state: TState): IStateProps => ({
    employeeStatisticByPosition: getEmployeeStatisticByPosition(state)
})

export default connect <IStateProps, IDispatchProps, IOwnProps, TState> (mapStateToProps, {
    getEmployeesStatisticByPosition
}) (React.memo(EmployeesData))