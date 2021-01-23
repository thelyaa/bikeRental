import React from "react";
import axios from "axios";
import './css/UserinfoForm.css'

export default class UserinfoForm extends React.Component {

    constructor(props){
        super(props);
        this.rentalBikeFunction = this.rentalBikeFunction.bind(this)
    }
    
    rentalBikeFunction = (e) => {
        axios.post('http://localhost:9000/rentalBike', null, {
            params: {
                email: this.props.email
            }
        }).then((data) => {
//            console.log(data)
            if (data.data === "error"){
                alert("У Вас есть незаконченные поездки")
            }
            else if(data.data === "success"){
                var str = "success"
                var user = "user"
                this.props.userinfoHandler(str, this.props.email, user)
            }
        })
    }
    
    render(){
        return(
            <div className="userinfoForm-block">
                <div className="userinfoForm-block_left">
                    <h3>User Info</h3>
                    <p>
                        <label>
                            First Name
                        </label>
                        <input 
                            type="text" 
                            value={this.props.firstName}
                            onChange={this.onInputChange}
                            name="firstName"
                            className="userinfoForm-block_left_firstName"
                        />
                    </p>
                    <p>
                        <label>
                            Last Name
                        </label>
                        <input 
                            type="text" 
                            value={this.props.lastName}
                            onChange={this.onInputChange}
                            name="lastName"
                            className="userinfoForm-block_left_lastName"
                        />
                    </p>
                    <p>
                        <label>
                            E-Mail
                        </label>
                        <input 
                            type="email" 
                            value={this.props.email}
                            onChange={this.onInputChange}
                            name="email"
                            className="userinfoForm-block_left_email"
                        />
                    </p>
                    <p>
                        <label>
                            Password
                        </label>
                        <input 
                            type="password"
                            value={this.props.password}
                            onChange={this.onInputChange}
                            name="password"
                            className="userinfoForm-block_left_password"
                        />
                    </p>
                    <div className="userinfoForm-block_left_buttonDiv">
                        <button onClick={this.rentalBikeFunction}>Прокат</button>
                    </div>
                </div>
                <div className="userinfoForm-block_right">
                    <h3>User Bike Rentals</h3>
                    <table>
                        <tr>
                            <th>PIN</th>
                            <th>Date</th>
                            <th>Active</th>
                        </tr>
                        {this.props.rentalList.length !== 0 ? ( 
                            this.props.rentalList.map((item) => {
                            return(
                                <tr>
                                    <td>{item.pin}</td>
                                    {item.finishedDate === undefined ? (
                                        <td>{item.created}</td>
                                    ):""}
                                    {item.finishedDate !== null ? (
                                        <td>{item.finishedDate}</td>
                                    ):""}
                                   
                                    {item.finishedDate !== null && item.created === undefined ? (
                                        <td>Finished</td>
                                    ):""}
                                </tr>
                            )
                        }) ):""}
                    </table>
                </div>
            </div>
        )
    }
}