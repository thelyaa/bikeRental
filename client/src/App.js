import React from "react";
import LoginForm from './Components/LoginForm';
import RegisterForm from './Components/RegisterForm';
import UserinfoForm from './Components/UserinfoForm';
import RentalListForm from './Components/RentalListForm'

export default class App extends React.Component {
    
    state = {
        currentScreen: 0,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "",
        rentalList: []
    }
    
    setUserData(firstName, lastName, email, password, role, rentalList){
        if (role === "admin") this.setState({currentScreen: 3, rentalList: rentalList})
        else this.setState({firstName: firstName, lastName: lastName, email: email, password: password, currentScreen: 2, role: role, rentalList: rentalList})
        console.log("rental", this.state.rentalList)
    }
    
    render(){
        return(
            <div>
                {this.state.currentScreen === 0 ? (
                    <LoginForm registerFormHandler={() => {this.setState({currentScreen: 1})}}
                    successSignInHandler={this.setUserData.bind(this)}/>
                ):""}
                {this.state.currentScreen === 1 ? (
                    <RegisterForm successRegistrationHandler={this.setUserData.bind(this)}/>
                ):""}
                {this.state.currentScreen === 2 ? (
                    <UserinfoForm 
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    email={this.state.email}
                    password={this.state.password}
                    rentalList={this.state.rentalList}/>
                ):""}
                {this.state.currentScreen === 3 ? (
                    <RentalListForm 
                    rentalList={this.state.rentalList}/>
                ):""}
            </div>
        )
    }
}