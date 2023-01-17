import React from "react";
import {useParams} from "react-router-dom";

const UsersProject = ({projects, users}) => {
    let {id} = useParams()
    let project = projects.filter((item) => item.id === id)[0]
    let filtered_user = users.filter((user) => project.users.includes(user.id));

    return (
        <div>
            <h1>{project.name}</h1>
            <p>Ссылка на проект: <a href={project.repo}>{project.repo}</a></p>
            <br/>
            <h5>Пользователи проекта</h5>
            {filtered_user.map((user) => <p>{user.username}</p>)}
            <br/>
        </div>
    )
}


export default UsersProject
