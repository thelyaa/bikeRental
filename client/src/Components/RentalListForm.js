import React from "react";
import axios from "axios";

export default class RentalListForm extends React.Component {
 
    state = {
       pin: "" 
    }

    constructor(props){
        super(props);
        this.onInputChange = this.onInputChange.bind(this)
    }
    
    onInputChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    finishRental = (e) => {
        console.log(this.state.pin)
        axios.post('http://localhost:9000/finishRental', null, {
            params: {
                pin: this.state.pin            
            }
        }).then((data) => {})
    }

    render(){
        return(
            <div>
                <table>
                    <tr>
                        <th>User</th>
                        <th>PIN</th>
                        <th>Date</th>
                        <th>Complite</th>
                 </tr>
                {this.props.rentalList.map((item) => {
                    return(
                        <tr>
                            <td>{item.userName}</td>
                            <td>{item.pin}</td>
                            {item.active === true ? (
                                <td>{item.created}</td>
                            ):""}
                            {item.active === false ? (
                                <td>{item.finished}</td>
                            ):""}
                            {item.active === true ? (
                                <td>Active</td>
                            ):""}
                            {item.active === false ? (
                                <td>Finished</td>
                            ):""}                          
                        </tr>
                    )
                })}
                </table>
            
                <div>
                    <input 
                        type="text" 
                        onChange={this.onInputChange}
                        name="pin"
                        value={this.state.pin}
                    />
                    <button onClick={this.finishRental}>Set PIN</button>
                </div>
            </div>
        )
    }
}