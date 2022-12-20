import * as React from 'react'
import { IPageRoute } from '../../../types/types';
import NavigationLink from '../../atom/navLink/NavigationLink'

import * as style from './navigation.module.scss';

interface IProps {
    pageRoutes: Array<IPageRoute>
}

const Navigation: React.FC<IProps> = ({pageRoutes}) => {

    return (
        <nav className={style.navigation}>
            { pageRoutes.map((pageRoute) => (
                <NavigationLink key={pageRoute.path} path={pageRoute.path} pageName={pageRoute.pageName} />
            )) }
        </nav>
    )
}

export default Navigation