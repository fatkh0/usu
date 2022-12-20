import * as React from 'react';
import * as style from './content.module.scss';

interface IProps {
    children: React.ReactNode
}

const Content: React.FC<IProps> = ({children}) => {

    return (
        <div className={style.content}>
            {children}
        </div>
    )
}

export default Content