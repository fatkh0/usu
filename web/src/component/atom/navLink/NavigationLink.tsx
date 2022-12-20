import * as React from 'react'

import { NavLink } from "react-router-dom";
import Link from '../Link/Link';
import { FaPlus } from 'react-icons/fa';

import * as style from './navigationLink.module.scss';

interface IProps {
    path: string
    pageName: string
}

const NavigationLink: React.FC<IProps> = ({path, pageName}) => {

    return (
        <div className={style.navigationLink}>
            <Link to={path}>
                <div className={style.navigationLinkInner}>
                    { pageName }
                    <FaPlus />
                </div>
            </Link>
        </div>
    )
}

export default NavigationLink