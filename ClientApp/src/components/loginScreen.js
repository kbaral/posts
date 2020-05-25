import React, { Component } from 'react';
import Login from './login';
import Register from './register';
import { Button } from 'reactstrap';

import Home from './home'
export class Loginscreen extends Component {
  constructor(props){
    super(props);
    
    this.state={
      username:'',
      password:'',
      loginscreen:[],
      loginmessage:'',
      buttonLabel:'Register',
      isLogin:true,
      isLoggedIn: false,
      adminscreen: []
      
    };
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    //this.routeChange = this.routeChange.bind(this);
   
  }
  
  componentWillMount(){
    var loginscreen=[];
    var adminscreen=[];
    loginscreen.push(<Login handleSuccessfulAuth={this.handleSuccessfulAuth}/>);
    adminscreen.push(<Home />);
    var loginmessage = "Not registered yet, Register Now";
    this.setState({
                  loginscreen:loginscreen,
                  loginmessage:loginmessage,
                  adminscreen: adminscreen,
                    })
  }
  handleSuccessfulAuth(data){

    console.log('data', data);
    localStorage.setItem("token", data.authToken);
    localStorage.setItem("user", JSON.stringify(data.user)); 
    this.setState(() => ({ isLoggedIn: true }));
    window.location.href = '/admin/manageposts';
    
  }
  handleClick(event){
    // console.log("event",event);
    var loginmessage;
    if(this.state.isLogin){
      var loginscreen=[];
      loginscreen.push(<Register parentContext={this}/>);
      loginmessage = "Already registered.Go to Login";
      this.setState({
                     loginscreen:loginscreen,
                     loginmessage:loginmessage,
                     buttonLabel:"Login",
                     isLogin:false
                   })
    }
    else{
      loginscreen=[];
      loginscreen.push(<Login handleSuccessfulAuth={this.handleSuccessfulAuth} />);
      loginmessage = "Not Registered yet.Go to registration";
      this.setState({
                     loginscreen:loginscreen,
                     loginmessage:loginmessage,
                     buttonLabel:"Register",
                     isLogin:true
                   })
    }
  }
  render() {
    
    //TODO
    return (
      <div>       
      
        <div className="loginscreen">
        {this.state.loginscreen}
        <div>
          {this.state.loginmessage}
          
            <div>
               <Button 
               className="btn btn-primary" 
               label={this.state.buttonLabel}                
               onClick= {event => window.location.href = '/register'}>
               {this.state.buttonLabel}
               </Button>
           </div>
           
        </div>
      </div>
           
           </div>
      
    );
  }
}

export default Loginscreen;
