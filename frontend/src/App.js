import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import axios from "axios";
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

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'token': '',
            'username': ''
        }
        this.getToken = this.getToken.bind(this)
        this.isAuthenticated = this.isAuthenticated.bind(this)
        this.logOut = this.logOut.bind(this)
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
        } else {
            document.cookie = "token=" + token + "; path=/; max-age=86400";
        }
    }

    logOut() {
        this.setToken('')
    }


    getToken(login, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: login, password: password}).
            then(response => {
                this.setToken(response.data.token);
                localStorage.setItem('username', login);
                window.location.pathname = '/';
            }).catch(error => alert('Неверный логин или пароль!'))
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
            }
        })
    }


    loadData() {
        const headers = this.getHeaders()
        axios.get('http://127.0.0.1:8000/api/users', {headers})
            .then(response => {
                const users = response.data.results
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects', {headers})
            .then(response => {
                const projects = response.data.results
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todos', {headers})
            .then(response => {
                const todos = response.data.results
                this.setState(
                    {
                        'todos': todos
                    }
                )
            }).catch(error => console.log(error))
    }

    componentDidMount() {
        this.getTokenFromStorage()

        // axios.get('http://127.0.0.1:8000/api/todos', {auth: {username: 'Ivan', password: 'ivanivan'}})
        // axios.post('http://127.0.0.1:8000/api-token-auth/', {username: 'Ivan', password: 'ivanivan'})
        // axios.get('http://127.0.0.1:8000/api/todos', {headers: {Authorization: 'Token 97f922c1fba895535ce0f64b8474c54e804ba42b'}})

    }

    render() {
        return (
            <BrowserRouter>
                <Menu isAuthenticated={this.isAuthenticated} logOut={this.logOut} username={this.state.username}/>
                <Routes>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/users'} element={<UserList users={this.state.users}/>}/>
                    <Route path={'/projects'} element={<ProjectList projects={this.state.projects}
                                                                    todos={this.state.todos}/>}/>
                    <Route path={'/projects/:id'} element={<TodosProject projects={this.state.projects}
                                                                         users={this.state.users}
                                                                         todos={this.state.todos}/>}/>
                    <Route path={'/todos'} element={<TodoList users={this.state.users}
                                                              projects={this.state.projects}
                                                              todos={this.state.todos}/>}/>
                    <Route path={'/login'} element={<LogIn getToken={this.getToken}/>}/>
                </Routes>
                <Footer/>
            </BrowserRouter>
        )
    }
}

export default App;
