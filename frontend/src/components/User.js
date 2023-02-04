import React from "react";


const UserItem = ({user}) => {
    return (
        <tr>
            <td>{user.username}</td>
            <td>{user.first_name ? user.first_name : '-'}</td>
            <td>{user.last_name ? user.last_name : '-'}</td>
            <td>{user.email}</td>
        </tr>
    )
}


const UserList = ({users}) => {
    return (
        <table className={'table'}>
            <thead>
                <tr>
                    <th>Псевдоним</th>
                    <th>Имя</th>
                    <th>Фамилия</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => <UserItem user={user} />)}
            </tbody>
        </table>
    )
}

export default UserList
