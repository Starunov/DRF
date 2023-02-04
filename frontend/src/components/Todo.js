import React from "react";

const TodoItem = ({item}) => {
    return (
        <tr>
            <td>{item.project.name}</td>
            <td>{item.text}</td>
            <td>{item.createdAt}</td>
            <td>{item.updatedAt}</td>
            <td>{item.author.username}</td>
            <td>{item.isActual ? 'Нет' : 'Да'}</td>
        </tr>
    )
}

const TodoList = ({todos}) => {

    if (!todos) {
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
                    {todos.map((item) => <TodoItem item={item}/>)}
                </tbody>
            </table>
        </>

    )
}
export default TodoList
