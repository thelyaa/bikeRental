import React from "react";
import axios from "axios";

export default class RegisterForm extends React.Component {
 
    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        repeatPassword: ""
    }

    constructor(props){
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    rentalList = []
    registerFunction = (e) => {
        if (this.state.password !== this.state.repeatPassword) alert("Пароли не совпадают")
        else if (this.state.firstName === "" || this.state.lastName === "" || this.state.email === "" || this.state.password === "" || this.state.repeatPassword === "") alert("Не все поля заполнены")
        else{
            axios.post('http://localhost:9000/registrateUser', null, {
                params: {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    password: this.state.password
                }
            }).then((data) => {
                console.log(data.data)
//                this.rentalList.push({})
                this.props.successRegistrationHandler(this.state.firstName, this.state.lastName, this.state.email, this.state.password, "user", "")
            })
        }
    }
    
    render(){
        return(
            <div>
                <p>
                    <label>
                        First Name
                    </label>
                    <input 
                        type="text" 
                        value={this.state.firstName}
                        onChange={this.onInputChange}
                        name="firstName"
                    />
                </p>
                <p>
                    <label>
                        Last Name
                    </label>
                    <input 
                        type="text" 
                        value={this.state.lastName}
                        onChange={this.onInputChange}
                        name="lastName"
                    />
                </p>
                <p>
                    <label>
                        E-Mail
                    </label>
                    <input 
                        type="email" 
                        value={this.state.email}
                        onChange={this.onInputChange}
                        name="email"
                    />
                </p>
                <p>
                    <label>
                        Password
                    </label>
                    <input 
                        type="password"
                        value={this.state.password}
                        onChange={this.onInputChange}
                        name="password"
                    />
                </p>
                <p>
                    <label>
                        Repeat password
                    </label>
                    <input 
                        type="password"
                        value={this.state.repeatPassword}
                        onChange={this.onInputChange}
                        name="repeatPassword"
                    />
                </p>
                <div>
                    <button onClick={this.registerFunction}>OK</button>
                    <button onClick={this.props.cancelHandler}>Cancel</button>
                </div>
            </div>
        )
    }
}