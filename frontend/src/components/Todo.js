import React from "react";

const TodoItem = ({item, deleteTodo}) => {
    return (
        <tr>
            <td>{item.project.name}</td>
            <td>{item.text}</td>
            <td>{item.createdAt}</td>
            <td>{item.updatedAt}</td>
            <td>{item.author.username}</td>
            <td>{item.isActual ? 'Нет' : 'Да'}</td>
            <td>
                <button onClick={() => deleteTodo(item.id)} className={'input btn'}>Удалить</button>
            </td>
        </tr>
    )
}

const TodoList = ({todos, deleteTodo}) => {

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
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((item) => <TodoItem item={item} deleteTodo={deleteTodo}/>)}
                </tbody>
            </table>
        </>

    )
}
export default TodoList
