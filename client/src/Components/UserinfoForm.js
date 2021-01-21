import React from "react";
import axios from "axios";

export default class UserinfoForm extends React.Component {
 
    state = {

    }

    constructor(props){
        super(props);
    }
    
    rentalBikeFunction = (e) => {
        axios.post('http://localhost:9000/rentalBike', null, {
            params: {
                email: this.props.email
            }
        }).then((data) => {
            console.log(data)
            if (data.data === "error"){
                alert("У Вас есть незаконченные поездки")
            }
            
        })
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
                        value={this.props.firstName}
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
                        value={this.props.lastName}
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
                        value={this.props.email}
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
                        value={this.props.password}
                        onChange={this.onInputChange}
                        name="password"
                    />
                </p>
                <div>
                    <button onClick={this.rentalBikeFunction}>Прокат</button>
                </div>
                
                <div>
                    <table>
                        <tr>
                            <th>PIN</th>
                            <th>Date</th>
                            <th>Active</th>
                        </tr>
                        {console.log(this.props.rentalList)}
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
                
                <div>
                    <button onClick={this.props.userinfoHandler}>OK</button>
                </div>
            </div>
        )
    }
}