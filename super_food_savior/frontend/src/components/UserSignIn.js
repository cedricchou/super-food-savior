import React, {Component} from 'react';
import axios from "axios";

export default class UserSignIn extends Component {
    state = {
        email: "",
        password: ""
    }
    
    signInChange = event => {
        const userSession = {};
        userSession[event.target.name] = event.target.value;
        this.setState(userSession);
    }

    signInSubmit = event => {
        event.preventDefault();
        axios
        .post("/login", this.state)
        .then(function(res) {
            console.log(res);
        }).catch(function(err) {
            console.log(err);
        })
    }

    render() {

        return (
            <form onSubmit={this.signInSubmit}>
            <div>
                <label htmlFor="email">Email</label><br/>
                <input 
                    type="email"
                    id="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.signInChange}
                />
                <label>Password</label>
                <input
                    type="text"
                    id="password"
                    name="password"
                    value={this.state.password}
                    onChange={signInChange("password")}
                />
            </div>
            </form>
        )
    }
}
