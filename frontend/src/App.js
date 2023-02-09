import React from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import axios, {all} from "axios";
import swal from "sweetalert";
import Cookies from "universal-cookie";
import './logo.svg';
import './App.css';
import Home from "./components/Home";
import Menu from "./components/Menu";
import UserList from "./components/User";
import Footer from "./components/Footer";
import ProjectList from "./components/Project";
import TodoList from "./components/Todo";
import TodosProject from "./components/TodosProject";
import LogIn from "./components/LogIn";
import ProjectForm from "./components/ProjectForm";
import Page404 from "./components/Page404";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'token': '',
            'username': '',
            'groupId': null,
        }
        this.getToken = this.getToken.bind(this)
        this.isAuthenticated = this.isAuthenticated.bind(this)
        this.logOut = this.logOut.bind(this)
        this.addProject = this.addProject.bind(this)
        this.deleteProject = this.deleteProject.bind(this)
        this.deleteTodo = this.deleteTodo.bind(this)
    }


    isAuthenticated() {
        return this.state.token !== '' && this.state.token !== undefined

    }


    setToken(token) {
        this.setState({'token': token}, () => this.loadData());
        if (!!!token) {
            // token = ''
            document.cookie = "token=" + token + "; path=/; max-age=0";
            localStorage.removeItem('username');
            this.setState({'username': ''});
            this.setState({'users': []})
            this.setState({'projects': []})
            this.setState({'todos': []})
            this.setState({'groupId': null})
        } else {
            document.cookie = "token=" + token + "; path=/; max-age=86400";
        }
    }

    logOut() {
        this.setToken('')
    }


    getToken(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password}).then(response => {
            this.setToken(response.data.token);
            localStorage.setItem('username', username);
            window.location.pathname = '/';
        }).catch(error => {
            console.log(error)
            alert('Неверный логин или пароль!')
        })
    }


    getHeaders() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.isAuthenticated()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }


    getTokenFromStorage() {
        document.cookie.split('; ').forEach((pair) => {
            let [key, val] = pair.split('=');
            if (key === 'token') {
                this.setState({'token': val}, () => this.loadData());
                this.setState({'username': localStorage.getItem('username')});
                // this.setState({'groupId': localStorage.getItem('groupId')});
            }
        })
    }


    loadData() {
        const headers = this.getHeaders()
        axios.post('http://127.0.0.1:8000/graphql/', {
            'query': `{
                allUsers {
                    id
                    username
                    firstName
                    lastName
                    email
                    groups {
                        id
                        name
                    }
                }
            }`
        }, {headers}).then((response) => {
            const {data: {data: {allUsers}}} = response
            this.setState({
                'users': allUsers
            })

            let username = localStorage.getItem('username')
            allUsers.forEach((user) => {
                if (user.username === username) {
                    this.setState({'groupId': user.groups[0].id})
                }
            })
        }).catch(error => console.log(error))
        // axios.get('http://127.0.0.1:8000/api/users', {headers})
        //     .then(response => {
        //         const users = response.data.results
        //         this.setState(
        //             {
        //                 'users': users
        //             }
        //         )
        //     }).catch(error => console.log(error))

        axios.post("http://127.0.0.1:8000/graphql/", {
            "query": `{
                allProjects {
                    id
                    name
                    repo
                    users {
                        username
                    }
                }
            }`,
            "variables": null
        }, {headers}).then((response) => {
            const {data: {data: {allProjects}}} = response
            this.setState({
                'projects': allProjects
            })
        }).catch(error => console.log(error))

        // axios.get('http://127.0.0.1:8000/api/projects', {headers})
        //     .then(response => {
        //         const projects = response.data.results
        //         console.log(projects)
        //         this.setState(
        //             {
        //                 'projects': projects
        //             }
        //         )
        //     }).catch(error => console.log(error))

        axios.post('http://127.0.0.1:8000/graphql/', {
            'query': `{
                allTodos {
                    id
                    text
                    createdAt
                    updatedAt
                    isActual
                    author: user {
                        username
                    }
                    project {
                        id
                        name
                    }
                }
            }`
        }, {headers}).then(response => {
            const {data: {data: {allTodos}}} = response
            this.setState({
                'todos': allTodos
            })
        }).catch(error => console.log(error))

        // axios.get('http://127.0.0.1:8000/api/todos', {headers})
        //     .then(response => {
        //         const todos = response.data.results
        //         this.setState(
        //             {
        //                 'todos': todos
        //             }
        //         )
        //     }).catch(error => console.log(error))
    }

    addProject(name, repo, users) {
        let headers = this.getHeaders()
        const data = {
            name: name,
            repo: repo,
            users: users
        }
        axios.post(
            'http://127.0.0.1:8000/api/projects/', data, {headers}
        ).then(response => {
            this.setState({projects: [...this.state.projects, response.data.data]})
            swal({
                title: 'Проект создан!',
                icon: 'success',
            }).then((ok) => {
                if (ok) {
                    window.location.pathname = '/projects';
                }
            })
        }).catch(error => console.log(error))
    }

    deleteProject(id) {
        swal({
            title: 'Вы уверены?',
            text: `Будет удален проект: "${this.state.projects.filter((item) => item.id === id)[0].name}!"`,
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then((ok) => {
            if (ok) {
                const headers = this.getHeaders()
                axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {
                    headers
                }).then(() => {
                    this.setState({projects: this.state.projects.filter((project) => project.id !== id)})
                    swal('Проект удален', '', 'success');
                }).catch(({response}) => {
                    if (response.status === 403) {
                        swal('Отмена', 'У вас нет прав на удаление проектов. Обратитесь к администратору.', 'error')
                    }
                })
            }
        })
    }

    addTodo() {

    }

    deleteTodo(id) {
        swal({
            title: 'Задача решена?',
            text: 'Задача будет помечена как решенная.',
            icon: 'info',
            buttons: true,
            dangerMode: true,
        }).then((ok) => {
            if (ok) {
                const headers = this.getHeaders()
                axios.delete(`http://127.0.0.1:8000/api/todos/${id}`, {
                    headers
                }).then(() => {
                    this.setState({todos: this.state.todos.filter((todo) => todo.id !== id)})
                    swal('Задача решена.', '', 'success');
                }).catch((error) => console.log(error))
            }
        })
    }

    componentDidMount() {
        this.getTokenFromStorage()


    }

    render() {
        return (
            <BrowserRouter>
                <Menu isAuthenticated={this.isAuthenticated} logOut={this.logOut} username={this.state.username}/>
                <Routes>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/users'} element={<UserList users={this.state.users}/>}/>
                    <Route path={'/projects'} element={<ProjectList projects={this.state.projects}
                                                                    todos={this.state.todos}
                                                                    deleteProject={this.deleteProject}
                                                                    groupId={this.state.groupId}/>}/>
                    <Route path={'/projects/:id'} element={<TodosProject todos={this.state.todos}
                                                                         projects={this.state.projects}/>}/>
                    <Route path={'/projects/add'} element={['1', '2'].includes(this.state.groupId) ?
                        <ProjectForm users={this.state.users}
                                     addProject={this.addProject}/> :
                        <Page404/>
                    }/>
                    <Route path={'/todos'} element={<TodoList todos={this.state.todos}
                                                              deleteTodo={this.deleteTodo}/>}/>
                    <Route path={'/login'} element={
                        this.isAuthenticated() ? <Navigate to={'/'} replace /> : <LogIn getToken={this.getToken}/>
                    }/>
                </Routes>
                <Footer/>
            </BrowserRouter>
        )
    }
}

export default App;
