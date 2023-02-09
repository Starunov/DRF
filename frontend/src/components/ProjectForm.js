import React from "react";
import './css/ProjectForm.css'


const ProjectForm = ({users, addProject}) => {

    const sendForm = (e) => {
        e.preventDefault();
        const usersFormEl = e.target.users;
        let usersSelected = [];
        for (let item of usersFormEl.selectedOptions) {
            usersSelected.push(item.value);
        }

        addProject(e.target.name.value, e.target.repo.value, usersSelected);
    }

    return (
        <form className={'form'} onSubmit={(e) => sendForm(e)}>
            <div className={"form_group"}>
                <label htmlFor={"name"} className={"lbl"}>Название проекта</label>
                <input type="text" className={'input'} required={true} name={'name'}/>
            </div>

            <div className={"form_group"}>
                <label htmlFor={"repo"} className={"lbl"}>Ссылка на проект</label>
                <input type="text" className={'input'} required={false} name={'repo'}/>
            </div>

            <div className={"form_group"}>
                <label htmlFor={"users"} className={"lbl"}>Пользователи</label>
                <select multiple={true} name={'users'} className={'input'}>
                    {users.map((user) => <option key={user.id} value={user.id}>{user.username}</option>)}
                </select>
            </div>

            <div className={'form_group'}>
                <button type={'submit'} style={{width: '25%'}} className={'input btn'}>Создать</button>
            </div>
        </form>
    )

}


export default ProjectForm