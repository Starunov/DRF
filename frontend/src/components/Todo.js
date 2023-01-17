import React from "react";
import './css/Todo.css';

const TodoItem = ({is_actual, text, project, user}) => {
    return (
        <ul className={`cont-item ${is_actual ? "open" : "close"}`}>
            <li><b>Заметка: </b>{text}</li>
            <li><b>К проекту: </b>{project}</li>
            <li><b>Автор: </b>{user}</li>
        </ul>
    )
}

const TodoList = ({todos, projects, users}) => {
    const newTodos = []
    let project = null;
    let user = null;

    todos.map((todoObj) => {
        projects.forEach((item) => {
            if (todoObj.project === item.id) {
                project = item.name;
            }
        })

        users.forEach((item) => {
            if (todoObj.user === item.id) {
                user = item.username;
            }
        })

        newTodos.push({
            is_actual: todoObj.is_actual,
            text: todoObj.text,
            project: project,
            user: user,
        })
    })

    return (
        <div className={'container'}>
            {newTodos.map((item) => <TodoItem is_actual={item.is_actual}
                                              text={item.text}
                                              project={item.project}
                                              user={item.user}/>)}
        </div>
    )
}
export default TodoList
