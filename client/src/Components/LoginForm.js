import React from "react";
import axios from "axios";

export default class LoginForm extends React.Component {
 
    state = {
        email: "",
        password: ""
    }

    constructor(props){
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
        this.signInFunction = this.signInFunction.bind(this);
    }

    onInputChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    rentalList = []
    pin = ""
    userId = ""
    signInFunction = (e) => {
        this.setState({email: this.state.email})
        axios.post('http://localhost:9000/signInFunction', null, {
            params: {
                email: this.state.email,
                password: this.state.password
            }
        }).then((data) => {
            if (data.data.length > 0){
                if (data.data[0]._role === "admin"){
                    axios.get('http://localhost:9000/getRentalList').then((res) => {                     
                        for(var i = 0; i < res.data.length; i++){ 
                            if (res.data[i]._finishedDate !== null){
                                var date = res.data[i]._finishedDate.split('T')
                                var newDateFormatArr = date[0].split('-')
                                var newDateFormat = newDateFormatArr[2]+'/'+newDateFormatArr[1]+'/'+newDateFormatArr[0]
                                this.rentalList.push({id: res.data[i]._id, userId: res.data[i]._userId, pin: res.data[i]._pin, userName: res.data[i]._userName, active: res.data[i]._active, finished: newDateFormat}) 
                            }
                            else {
                                var date = res.data[i]._createdDate.split('T')
                                var dateFormatArr = date[0].split('-')
                                var dateFormat = dateFormatArr[2]+'/'+dateFormatArr[1]+'/'+dateFormatArr[0]
                                this.rentalList.push({d: res.data[i]._id, userId: res.data[i]._userId, pin: res.data[i]._pin, userName: res.data[i]._userName, active: res.data[i]._active, created: dateFormat})
                            }
                        }   
                        this.props.successSignInHandler(data.data[0]._firstName, data.data[0]._lastName, data.data[0]._email, data.data[0]._password, data.data[0]._role, this.rentalList) 
                    })
                }
                else{
                    axios.post('http://localhost:9000/getUserRentals', null, {
                        params: {
                            email: this.state.email 
                        }
                    }).then((res) => {
//                        console.log(res.data)
                        for (var i = 0; i < res.data.length; i++){
                            if (res.data[i]._finishedDate !== null){
                                var date = res.data[i]._finishedDate.split('T')
                                var newDateFormatArr = date[0].split('-')
                                var newDateFormat = newDateFormatArr[2]+'/'+newDateFormatArr[1]+'/'+newDateFormatArr[0]
                                this.rentalList.push({id: res.data[i]._id, pin: res.data[i]._pin, finishedDate: newDateFormat})   
                            }
                            else {
                                var date = res.data[i]._createdDate.split('T')
                                var dateFormatArr = date[0].split('-')
                                var dateFormat = dateFormatArr[2]+'/'+dateFormatArr[1]+'/'+dateFormatArr[0]
                                this.rentalList.push({id: res.data[i]._id, pin: res.data[i]._pin, created: dateFormat})   
                            }
                        }
                        this.props.successSignInHandler(data.data[0]._firstName, data.data[0]._lastName, data.data[0]._email, data.data[0]._password, data.data[0]._role, this.rentalList) 
                    })
                }   
            }
        })
    }
    
    render(){
        return(
            <div>
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
                <div>
                    <button onClick={this.signInFunction}>Sign In</button>
                    <button onClick={this.props.registerFormHandler}>Sign Up</button>
                </div>
            </div>
        )
    }
}