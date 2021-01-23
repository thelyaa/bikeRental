import React from "react";
import axios from "axios";
import './css/ReloadPageForm.css'

export default class ReloadPageForm extends React.Component {

    constructor(props){
        super(props);
        this.goPrevFunction = this.goPrevFunction.bind(this)
    }
    
    rentalList = []
    goPrevFunction = (e) => {
        if (this.props.user === "user"){
            axios.post('http://localhost:9000/getUserRentals', null, {
                params: {
                    email: this.props.email
                }
            }).then((res) => {
                console.log(res)
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
                console.log("sgs", this.rentalList)
                this.props.cancelHandler(this.props.user, this.rentalList)
            })
        }
        else if (this.props.user === "admin"){
            axios.get('http://localhost:9000/getRentalList').then((res) => {                     
                for(var i = 0; i < res.data.length; i++){ 
                    if (res.data[i]._finishedDate !== null){
                        var date = res.data[i]._finishedDate.split('T')
                        var newDateFormatArr = date[0].split('-')
                        var newDateFormat = newDateFormatArr[2]+'/'+newDateFormatArr[1]+'/'+newDateFormatArr[0]
                        this.rentalList.push({id: res.data[i]._id, userId: res.data[i]._userId, pin: res.data[i]._pin, userName: res.data[i]._userName, active: res.data[i]._active, finished: newDateFormat}) 
                    }
                    else{
                        var date = res.data[i]._createdDate.split('T')
                        var dateFormatArr = date[0].split('-')
                        var dateFormat = dateFormatArr[2]+'/'+dateFormatArr[1]+'/'+dateFormatArr[0]
                        this.rentalList.push({d: res.data[i]._id, userId: res.data[i]._userId, pin: res.data[i]._pin, userName: res.data[i]._userName, active: res.data[i]._active, created: dateFormat})
                    }
                }   
                this.props.cancelHandler(this.props.user, this.rentalList)
            })
        }
    }
    
    render(){
        return(
            <div>
                <div className="reloadPage-block">
                    success
                    <p><button onClick={this.goPrevFunction}>OK</button></p>
                </div>
            </div>
        )
    }
}