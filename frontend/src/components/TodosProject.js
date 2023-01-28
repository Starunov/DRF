import React from "react";
import {useParams} from "react-router-dom";


const TodoRow = ({todo}) => {
    return (
        <tr>
            <td>{todo.user}</td>
            <td>{todo.text}</td>
            <td>{todo.created_at}</td>
            <td>{todo.updated_at}</td>
            <td>{todo.is_actual? 'Нет' : 'Да'}</td>
        </tr>
    )
}

const TodosProject = ({projects, users, todos}) => {
    let {id} = useParams()
    let projectName = projects.filter((item) => item.id === id)[0].name
    let allTodos = []
    todos.filter((todo) => todo.project === id).forEach((todo) => {
        users.forEach((user) => {
            if (todo.user === user.id) {
                todo.user = user.username;
            }
        })
        allTodos.push(todo);
    })

    return (
        <div style={{textAlign: 'center'}}>
            <h1>{projectName}</h1>
            <table className="table">
                <thead>
                <tr>
                    <th>Автор заметки</th>
                    <th>Заметка</th>
                    <th>Создано</th>
                    <th>Обновлено</th>
                    <th>Решена</th>
                </tr>
                </thead>
                <tbody>
                    {allTodos.map((todo) => <TodoRow todo={todo}/>)}
                </tbody>
            </table>
            <spam>Всего задач к проекту: {allTodos.length}</spam>
        </div>
    )
}


export default TodosProject
