import React from "react";


const TodoForm = ({projects, addTodo}) => {
    const sendForm = (e) => {
        e.preventDefault()
        addTodo(e.target.text.value, e.target.project.value)
    }



    return (
        <form className={'form'} onSubmit={(e) => sendForm(e)}>
            <div className={"form_group"}>
                <label htmlFor={"text"} className={"lbl"}>Задача</label>
                <textarea rows={10} type="text" className={'input'} required={true} name={'text'}></textarea>
            </div>

            <div className={"form_group"}>
                <label htmlFor={"project"} className={"lbl"}>К проекту</label>
                <select type="text" className={'input'} name={'project'}>
                    {projects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}
                </select>
            </div>

            <div className={'form_group'}>
                <button type={'submit'} style={{width: '25%'}} className={'input btn'}>Создать</button>
            </div>
        </form>
    )
}

export default TodoForm
