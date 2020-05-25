import React, { Component } from "react";
import axios from "axios";
import { Alert,  Button } from 'reactstrap';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner'; 

 

export class Login extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");
    let isloggedIn = true
    if(token == null){
      isloggedIn = false
    }
    this.state = {
      username: "",
      password: "",
      email: "", 
      error: "",
      loading: false, 
      isloggedIn
    };
    
  }
 
  handleAlreadyLoggedIn(){
    window.location.href = '/';
  }
  handleClick = (event) => {
  event.preventDefault();
  
    var self = this;
    var user = {
      name: this.state.username,
      password: this.state.password,
      email: this.state.email
    };  
    this.setState({ loading: true }, () => {
      axios
      .post("/api/v1/user/login", user)
      .then(response => {
        console.log("log in", response);
          if (response.status === 200) {            
            
            
            if (response.data.success === false) {
              this.setState(() => ({ error: response.data.errorMessage, loading: false }));
                console.log(response.data.errorMessage);
            }
            else{
              this.props.handleSuccessfulAuth(response.data);
              this.setState(() => ({ isLoggedIn: true, loading: false }));
            }
           
         
        } else {
          console.log("Username does not exists");
          //alert("Username does not exist");
        }
      })
      .catch(err => {
          this.setState({ error: "Oops, something went wrong !" });
        console.log(err);
      })
      .finally( () => {
        this.setState(() => ({ loading: false }));
      })
    });  


  }
  render() {
    if(this.state.isloggedIn === true){
      this.handleAlreadyLoggedIn(); 
    }
    
    const loading = this.state.loading; 
    return (
        <div>            
                {this.state.error && 
             <Alert color="danger">
             {this.state.error}
           </Alert>
                }       
          <div>                     
          {loading && 
             <Spinner animation="grow"variant="success">
             <span className="sr-only">Loading...</span>
           </Spinner>
            }  
          <Form>
            <Form.Row>
              <Form.Group  controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="Enter email" 
                  onChange= { (event) => 
                    this.setState({email: event.target.value})} />
              </Form.Group>
              </Form.Row>
              <Form.Row>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                type="password" 
                placeholder="Password" 
                onChange = {(event) => 
                  this.setState({password:event.target.value})}
                />
              </Form.Group>
              
              </Form.Row>

              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember me" />
              </Form.Group>
              <Button 
              className="btn btn-primary" 
              variant="warning" 
              type="submit"
              onClick={(event) => this.handleClick(event)}>
                Submit
              </Button>
            </Form>
            
 
          </div>{" "}

          
       
      </div>
    );
  }
}

export default Login; 
