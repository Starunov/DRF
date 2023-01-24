import React from "react";
import axios from "axios";
import './css/LogIn.css'


const LogIn = ({getToken}) => {

    const sendForm = (e) => {
        e.preventDefault()
        const login = e.target.login.value
        const password = e.target.password.value
        getToken(login, password)
    }

    return (
        <form onSubmit={sendForm} className={'loginForm'}>
            <h1>Вход</h1>
            <div>
                <input type="text" placeholder={'Логин'} className={'input'} name={'login'}/>
            </div>
            <div>
                <input type="password" placeholder={'Пароль'} className={'input'} name={'password'}/>
            </div>
            <div>
                <button type={'submit'} className={'input'}>Войти</button>
            </div>
        </form>
    )
}


export default LogIn