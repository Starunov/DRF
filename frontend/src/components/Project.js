import React from "react";
import {Link} from "react-router-dom";


const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                <Link to={`/projects/${project.id}`}>{project.name}</Link>
            </td>
            <td>
                <a href={project.repo} target={'_blank'}>{project.repo}</a>
            </td>
            <td>
                {project.completedTodo}
            </td>
            <td>
                {project.todosCount}
            </td>
        </tr>
    )
}


const ProjectList = ({projects, todos}) => {
    projects.forEach((project) => {
        project.todosCount = todos.filter((todo) => project.id === todo.project.id).length
        project.completedTodo = todos.filter((todo) => project.id === todo.project.id && todo.isActual === false).length
    })
    return (
        <table className={'table'}>
            <thead>
                <tr>
                    <th>Проект</th>
                    <th>Ссылка</th>
                    <th>Решенных задач</th>
                    <th>Всего задач</th>
                </tr>
            </thead>
            <tbody>{projects.map((project) => <ProjectItem project={project}/>)}</tbody>
        </table>
    )
}

export default ProjectList
