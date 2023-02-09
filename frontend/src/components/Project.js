import React from "react";
import {Link} from "react-router-dom";
import './css/Project.css'


const ProjectItem = ({project, deleteProject, groupId}) => {
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

            {
                ['1', '2'].includes(groupId) ?
                    <td>
                        <button onClick={() => deleteProject(project.id)} className={'input btn'}>Удалить</button>
                    </td> :
                    <></>
            }
        </tr>
    )
}


const ProjectList = ({projects, todos, deleteProject, groupId}) => {
    projects.forEach((project) => {
        project.todosCount = todos.filter((todo) => project.id === todo.project.id).length
        project.completedTodo = todos.filter((todo) => project.id === todo.project.id && todo.isActual === false).length
    })

    return (
        <div className={'wrapper'}>
            {['1', '2'].includes(groupId) ? <Link className={'btn_new'} to={'/projects/add'}>Новый проект</Link> : <></>}

            <table className={'table'}>
                <thead>
                    <tr>
                        <th>Проект</th>
                        <th>Ссылка</th>
                        <th>Решенных задач</th>
                        <th>Всего задач</th>
                        {['1', '2'].includes(groupId) ? <th></th> : <></>}
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => <ProjectItem project={project}
                                                            deleteProject={deleteProject}
                                                            groupId={groupId}/>)}
                </tbody>
            </table>
        </div>

    )
}

export default ProjectList
