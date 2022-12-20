import * as React from 'react'

import * as classNames from 'classnames'
import { NavLink } from "react-router-dom"

import * as styles from './link.module.scss';

interface IProps {
    className?: string
    to: string
    children: React.ReactNode
}

const Link: React.FC<IProps> = ({to: path, children, className}) => {

    return (
        <NavLink
            className={linkParams => classNames({
                [styles.link]: true,
                [styles.activeLink]: linkParams.isActive,
                [className ?? '']: true
            })}
            to={path}
        >
            { children }
        </NavLink>
    )
}

export default React.memo( Link )