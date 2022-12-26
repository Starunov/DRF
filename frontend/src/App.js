import React from "react";
import logo from './logo.svg';
import './App.css';
import MenuApp from "./components/Menu";
import UserList from "./components/User";
import FooterApp from "./components/Footer";
import axios from "axios";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/')
            .then(response => {
                const users = response.data
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))
    }

    render() {
        return (
            <div style={styles.body}>
                <div style={styles.menu}><MenuApp/></div>
                <div style={styles.content}><UserList users={this.state.users}/></div>
                <div style={styles.footer}><FooterApp/></div>
            </div>
        )
    }
}

const styles = {
    body: {
        minHeight: 500,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
    },
    menu: {
        background: 'grey',
        flex: 0.5,
    },
    content: {
        background: 'lightgrey',
        flex: 6,
    },
    footer: {
        background: 'lightyellow',
        flex: 1,
    },
}

export default App;
