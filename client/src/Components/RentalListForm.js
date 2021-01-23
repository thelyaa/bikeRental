import React from "react";
import axios from "axios";
import './css/RentalListForm.css'

export default class RentalListForm extends React.Component {
 
    state = {
       pin: "" 
    }

    constructor(props){
        super(props);
        this.onInputChange = this.onInputChange.bind(this)
        this.finishRental = this.finishRental.bind(this)
    }
    
    onInputChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    finishRental = (e) => {
//        console.log(this.state.pin)
        axios.post('http://localhost:9000/finishRental', null, {
            params: {
                pin: this.state.pin            
            }
        }).then((data) => {
            var user = "admin"
            this.props.getRentalListHandler("", "", user)
        })
    }

    render(){
        return(
            <div className="rentalList-block">
                <h3>All Rentals</h3>
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
            
                <div className="rentalList-block_PIN">
                    <input 
                        type="text" 
                        onChange={this.onInputChange}
                        name="pin"
                        value={this.state.pin}
                    />
                    <p><button onClick={this.finishRental}>Set PIN</button></p>
                </div>
            </div>
        )
    }
}