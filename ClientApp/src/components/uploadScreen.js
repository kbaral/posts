import React, { Component } from 'react';
import { Alert,  Button } from 'reactstrap';
import Login from './Login';
import Register from './Register';
export class Uploadscreen extends Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',
      uploadscreen:[],
      uploadmessage:'',
      buttonLabel:'Register',
      isLogin:true
    }
  }
  componentWillMount(){
    var uploadscreen=[];
    uploadscreen.push(<Register parentContext={this} appContext={this.props.parentContext}/>);
    var uploadmessage = "Not registered yet, Register Now";
    this.setState({
                  uploadscreen:uploadscreen,
                  uploadmessage:uploadmessage
                    })
  }
  render() {
    return (
      <div className="uploadscreen">
        {this.state.loginscreen}
        <div>
          {this.state.loginmessage}
          
            <div>
               <Button
               className="btn btn-primary"
                label={this.state.buttonLabel} 
                onClick={(event) => this.handleClick(event)}>
                  {this.state.buttonLabel} 
                </Button>
           </div>
          
        </div>
      </div>//
    );
  }
}

export default Uploadscreen;
