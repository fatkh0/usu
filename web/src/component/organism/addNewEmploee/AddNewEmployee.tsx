import * as React  from 'react';

import * as styles from './addNewEmployee.module.scss';

import { EmployeePosition } from '../../../constant/employeePosition';
import { connect } from 'react-redux';
import { TState } from '../../../redux/store';
import {createEmployee} from '../../../redux/employees';
import { IEmployee } from '../../../types/types';
import { generateId } from '../../../utils/generateId';

interface IOwnProps {}

const AddNewEmployee: React.FC<IOwnProps & IDispatchProps & IStateProps> = ({createEmployee}) => {

    const [name, setName] = React.useState('')
    const [surname, setSurname] = React.useState('')
    const [age, setAge] = React.useState<number>(NaN)
    const [position, setPosition] = React.useState<keyof typeof EmployeePosition>('' as keyof typeof EmployeePosition)

    function onSubmit (event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        createEmployee({
            name: `${name} ${surname}`,
            id: generateId(),
            age,
            position
        }, resetFormData)
    }

    function resetFormData() {
        setName('')
        setSurname('')
        setAge(NaN)
        setPosition('' as keyof typeof EmployeePosition)
    }

    const isSubmitButtonDisabled = !name.length || !surname.length ||  age <= 0 || !position.length

    return (
        <div className={styles.addNewEmployee}>
            <form  className={styles.form} onSubmit={onSubmit}>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor='name'>Name</label>
                    <input className={styles.input} id='name' value={name} onChange={e => setName(e.target.value)} />
                </div>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor='surname'>Surname</label>
                    <input className={styles.input} id='surname' value={surname} onChange={e => setSurname(e.target.value)}  />
                </div>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor='age'>Age</label>
                    <input
                        type='number'
                        className={styles.input}
                        id='age'
                        value={age}
                        onChange={e => setAge(parseInt(e.target.value))}  />
                </div>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor='position'>Position</label>
                    <select
                        className={styles.input}
                        value={position}
                        onChange={e => setPosition(e.target.value as keyof typeof EmployeePosition)}
                        >
                        <option disabled selected value=''>Select Position</option>
                        {Object.values(EmployeePosition).map(position => (
                            <option key={position} value={position}>
                                {position}
                            </option>
                        ))}
                        
                    </select>
                </div>

                <button className={styles.submitButton} disabled={isSubmitButtonDisabled} type='submit'>Create Employee</button>
            </form>
        </div>
    )
}

interface IStateProps {}

const mapStateToProps = (state: TState): IStateProps => ({})

interface IDispatchProps {
    createEmployee: (employeeData: IEmployee, callback: () => void) => void
}

export default connect <IStateProps, IDispatchProps, IOwnProps, TState> (mapStateToProps, {
    createEmployee
}) (React.memo(AddNewEmployee))