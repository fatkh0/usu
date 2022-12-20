import * as React  from 'react';
import {connect} from "react-redux";
import { getAllStoredEmployees } from '../../../utils/selectors';
import {getAllEmployees} from '../../../redux/employees';
import { TState } from '../../../redux/store';
import { IEmployee } from '../../../types/types';
import Employee from '../../molecule/employee/Employee';
import * as styles from './allEmployees.module.scss';

interface IOwnProps {}

interface IStateProps {
    employees: Array<IEmployee>
}

interface IDispatchProps {
    getAllEmployees: () => void
}

const AllEmployees: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({employees, getAllEmployees}) => {

    React.useEffect(() => {
        getAllEmployees()
    }, [])

    return (
        <div className={styles.allEmployees}>
            {employees.map(employee => <Employee key={employee.id} {...employee} />)}
        </div>
    )
}


const mapStateToProps = (state: TState): IStateProps => ({
    employees: getAllStoredEmployees(state)
})

export default connect <IStateProps, IDispatchProps, IOwnProps, TState> (mapStateToProps, {
    getAllEmployees
}) (React.memo(AllEmployees))