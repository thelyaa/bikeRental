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
                    <button>Cancel</button>
                </div>
            </div>
        )
    }
}