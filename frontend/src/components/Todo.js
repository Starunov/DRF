import React from "react";

const TodoItem = ({item}) => {
    return (
        <tr>
            <td>{item.project}</td>
            <td>{item.text}</td>
            <td>{item.created_at}</td>
            <td>{item.updated_at}</td>
            <td>{item.user}</td>
            <td>{item.is_actual ? 'Нет' : 'Да'}</td>
        </tr>
    )
}

const TodoList = ({users, projects, todos}) => {
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
            created_at: new Date(todoObj.created_at).toLocaleString(),
            updated_at: new Date(todoObj.updated_at).toLocaleString(),
        })
    })
    if (!newTodos) {
        return
    }
    return (
        <>
            <table className={'table'}>
                <thead>
                    <tr>
                        <th>Проект</th>
                        <th>Заметка</th>
                        <th>Создано</th>
                        <th>Обновлено</th>
                        <th>Добавил</th>
                        <th>Решена</th>
                    </tr>
                </thead>
                <tbody>
                    {newTodos.map((item) => <TodoItem item={item}/>)}
                </tbody>
            </table>
        </>

    )
}
export default TodoList
