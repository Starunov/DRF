import React from "react";
import './css/LogIn.css'

const LogIn = ({getToken}) => {

    const sendForm = (e) => {
        e.preventDefault()
        const username = e.target.username.value
        const password = e.target.password.value
        getToken(username, password)
    }

    return (
        <form onSubmit={sendForm} className={'form'}>
            <h1 className={'form_header'}>Вход</h1>
            <div className={'form_group'}>
                <label htmlFor={'username'} className={'lbl'}>Username</label>
                <input type="text" className={'input'} name={'username'}/>
            </div>
            <div className={'form_group'}>
                <label htmlFor={'password'} className={'lbl'}>Password</label>
                <input type="password" className={'input'} name={'password'}/>
            </div>
            <div className={'form_group'}>
                <button type={'submit'} className={'input btn'}>Войти</button>
            </div>
        </form>
    )
}


export default LogIn