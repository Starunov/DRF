import React from "react";
import {Link} from "react-router-dom";
import './css/Menu.css'

const Menu = ({isAuthenticated, logOut, username}) => {
    return (
        <div className={'navbar'}>
            <ul className={'nav'}>
                <li>
                    <Link to={'/'} className={'nav-link'}>Главная</Link>
                </li>
                <li>
                    <Link to={'/users'} className={'nav-link'}>Пользователи</Link>
                </li>
                <li>
                    <Link to={'/projects'} className={'nav-link'}>Проекты</Link>
                </li>
                <li>
                    <Link to={'/todos'} className={'nav-link'}>Заметки</Link>
                </li>
            </ul>
            <div className={'login'}>
                <span className={'username'}>{username}</span>
                {
                    isAuthenticated() ?
                        <span onClick={logOut} className={'nav-link'} style={{cursor: "pointer"}}>log out</span> :
                        <Link to={'/login'} className={'nav-link'}>Log in</Link>
                }
            </div>
        </div>


    )
}

export default Menu
