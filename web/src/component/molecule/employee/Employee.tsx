import * as React from 'react';
import { IEmployee } from '../../../types/types';
import { FaTimes } from 'react-icons/fa';
import { deleteEmployee } from '../../../redux/employees'

import * as style from './employee.module.scss';
import { TState } from '../../../redux/store';
import { connect } from 'react-redux';

interface IOwnProps extends IEmployee {}

interface IStateProps {}

interface IDispatchProps {
    deleteEmployee: (id: number) => void
}

const Employee: React.FC<IOwnProps & IDispatchProps > = ({id, name, age, position, deleteEmployee}) => {

    function onDeleteButtonClick () {
        deleteEmployee(id)
    }

    return (
        <div className={style.employee}>

            <div className={style.mainInfo}>
                <div className={style.name}>{name},</div>
                <div className={style.age}>{age}</div>
            </div>
            
            <div className={style.position}>{position}</div>
            <button onClick={onDeleteButtonClick} className={style.deleteButton}>
                <FaTimes />
            </button>
        </div>
    )
}


const mapStateToProps = (state: TState): IStateProps => ({})

export default connect <IStateProps, IDispatchProps, IOwnProps, TState> (mapStateToProps, {
    deleteEmployee
}) (React.memo(Employee))
