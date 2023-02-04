import React from "react";
import {useParams} from "react-router-dom";


const TodoRow = ({todo}) => {
    return (
        <tr>
            <td>{todo.author.username}</td>
            <td>{todo.text}</td>
            <td>{todo.createdAt}</td>
            <td>{todo.updatedAt}</td>
            <td>{todo.isActual? 'Нет' : 'Да'}</td>
        </tr>
    )
}

const TodosProject = ({todos, projects}) => {
    let {id} = useParams()
    const todoFiltered = todos.filter((todo) => todo.project.id === id)
    const projectName = projects.find((project) => project.id === id).name
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
                    {todoFiltered.map(todo => <TodoRow todo={todo}/>)}
                </tbody>
            </table>
            <spam>Всего задач к проекту: {todoFiltered.length}</spam>
        </div>
    )
}


export default TodosProject
