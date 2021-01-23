import React from "react";
import LoginForm from './Components/LoginForm';
import RegisterForm from './Components/RegisterForm';
import UserinfoForm from './Components/UserinfoForm';
import RentalListForm from './Components/RentalListForm'
import ReloadPageForm from './Components/ReloadPageForm'

export default class App extends React.Component {
    
    state = {
        currentScreen: 0,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "",
        rentalList: [],
        str: "",
        user: ""
    }
    
    setUserData(firstName, lastName, email, password, role, rentalList){
        if (role === "admin") this.setState({currentScreen: 3, rentalList: rentalList})
        else this.setState({firstName: firstName, lastName: lastName, email: email, password: password, currentScreen: 2, role: role, rentalList: rentalList})
//        console.log("rental", this.state.rentalList)
    }

    reloadPage(str, email, user){
        console.log(user)
        this.setState({currentScreen: 4, str: str, email: email, user: user})   
    }
    
    setRentalList(user, rentalList){
        if (user === "admin")
            this.setState({currentScreen: 3, rentalList: rentalList})
        else this.setState({currentScreen: 2, rentalList: rentalList})
//        console.log("rental", rentalList)
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
                    rentalList={this.state.rentalList}
                    userinfoHandler={this.reloadPage.bind(this)}/>
                ):""}
                {this.state.currentScreen === 3 ? (
                    <RentalListForm 
                    rentalList={this.state.rentalList}
                    user={this.state.user}
                    getRentalListHandler={this.reloadPage.bind(this)}/>
                ):""}
                {this.state.currentScreen === 4 ? (
                    <ReloadPageForm 
                    str={this.state.str}
                    email={this.state.email}
                    user={this.state.user}
                    cancelHandler={this.setRentalList.bind(this)}/>
                ):""}
            </div>
        )
    }
}