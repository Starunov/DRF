import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import axios from "axios";
import './logo.svg';
import './App.css';
import Menu from "./components/Menu";
import UserList from "./components/User";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ProjectList from "./components/Project";
import TodoList from "./components/Todo";
import UsersProject from "./components/UsersProject";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todos': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                const users = response.data.results
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects')
            .then(response => {
                const projects = response.data.results
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todos')
            .then(response => {
                const todos = response.data.results
                this.setState(
                    {
                        'todos': todos
                    }
                )
            }).catch(error => console.log(error))
    }

    render() {
        return (
            <BrowserRouter>
                <Menu/>
                <Routes>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/users'} element={<UserList users={this.state.users}/>}/>
                    <Route path={'/projects'} element={<ProjectList projects={this.state.projects}/>}/>
                    <Route path={'/projects/:id'} element={<UsersProject projects={this.state.projects}
                                                                         users={this.state.users}/>}/>
                    <Route path={'/todos'} element={<TodoList todos={this.state.todos} projects={this.state.projects}
                                                              users={this.state.users}/>}/>
                </Routes>
                <Footer/>
            </BrowserRouter>
        )
    }
}

export default App;