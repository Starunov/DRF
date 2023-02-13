import React from "react";
import {Link} from "react-router-dom";

const TodoItem = ({item, deleteTodo, groupId}) => {
    return (
        <tr>
            <td>{item.project.name}</td>
            <td>{item.text}</td>
            <td>{item.createdAt}</td>
            <td>{item.updatedAt}</td>
            <td>{item.author.username}</td>
            <td>{item.isActual ? 'Нет' : 'Да'}</td>
            {
                ['1', '2', '3'].includes(groupId) ?
                    <td>
                        <button onClick={() => deleteTodo(item.id)} className={'input btn'}>Решить</button>
                    </td>
                    :
                    <></>
            }
        </tr>
    )
}

const TodoList = ({todos, deleteTodo, groupId}) => {

    if (!todos) {
        return
    }
    return (
        <div className={'wrapper'}>
            {['1', '2', '3'].includes(groupId) ? <Link className={'btn_new'} to={'/todos/add'}>Добавить задачу</Link> : <></>}
            <table className={'table'}>
                <thead>
                <tr>
                    <th>Проект</th>
                    <th>Заметка</th>
                    <th>Создано</th>
                    <th>Обновлено</th>
                    <th>Добавил</th>
                    <th>Решена</th>
                    {['1', '2', '3'].includes(groupId) ? <th></th> : <></>}
                </tr>
                </thead>
                <tbody>
                {todos.map((item) => <TodoItem item={item} deleteTodo={deleteTodo} groupId={groupId}/>)}
                </tbody>
            </table>
        </div>

    )
}
export default TodoList
