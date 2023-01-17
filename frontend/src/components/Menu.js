import React from "react";
import {Link} from "react-router-dom";
import './css/Menu.css';

const Menu = () => {
    const all_links = document.querySelectorAll('.nav-link');
    let prevActiveLink = null;

    all_links.forEach((el) => {
        if (el.href.replace(window.location.origin, '') === window.location.pathname) {
            prevActiveLink = el;
            prevActiveLink.classList.add('active');
        }
    })

    const handler = (event) => {
        prevActiveLink.classList.remove('active');
        event.target.classList.add('active');
        prevActiveLink = event.target;
    }

    return (
        <ul className={'navbar'}>
            <li className={'nav-item'} onClick={handler}>
                <Link to={'/'} className={'nav-link'}>Главная</Link>
            </li>
            <li className={'nav-item'} onClick={handler}>
                <Link to={'/users'} className={'nav-link'}>Пользователи</Link>
            </li>
            <li className={'nav-item'} onClick={handler}>
                <Link to={'/projects'} className={'nav-link'}>Проекты</Link>
            </li>
            <li className={'nav-item'} onClick={handler}>
                <Link to={'/todos'} className={'nav-link'}>Заметки</Link>
            </li>
        </ul>
    )
}

export default Menu
