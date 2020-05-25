import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner'; 


class AddComment extends Component {
    constructor(props){
        super(props);
            
        this.state = {
            postId: this.props.id,
            content: '',
            name:'',
            email:'',
            isAdded: false, 
            loading: false, 
            error:'' 
        }
    }

    componentDidMount(){

    }
   
    
    handleAdd = (e) => {
        e.preventDefault();
        var comments = {
            postId: this.state.postId,
            content: this.state.content,
            name: this.state.name,
            email: this.state.email
        }
        

        this.setState({ loading: true }, () => {
            axios
            .post("/api/v1/comments/add", comments)
            .then(response => {
              console.log("comments", response);
                if (response.status === 200) {                           
                  if (response.data.success === false) {
                    this.setState(() => ({ error: response.data.errorMessage }));
                      console.log(response.data.errorMessage);
                  }
                  else{
                    let msg = 'Added Successfully';
                    this.setState(() => ({ isAdded: true }));
                    this.props.handleSuccessfulAdd(response.data, msg);
                  }
                 
               
              } else {
                console.log("Error : adding ");
                
              }
            })
            .catch(err => {
                this.setState({ error: "Oops, something went wrong !" });
              console.log("err", err);
            })
            .finally( () => {
              this.setState(() => ({ loading: false }));
            })
          });  
      
      
    }
    render() {
        return (
            <div>
                {
                    this.state.isAdded &&
                    <Alert color='success'>Successfully Added a post. </Alert> 
                }
                {
                    this.state.error &&
                    <Alert color='danger'>Un oh. Something went wrong while adding </Alert> 
                }
                {this.state.loading && 
                <Spinner animation="grow"variant="success">
                <span className="sr-only">Loading...</span>
                 </Spinner>
                }   
                <Form onSubmit= { (event) => this.handleAdd(event)} >
                    <FormGroup>
                        <Label for="formTitle">Name*</Label>
                        <Input 
                            type="text" 
                            name="title" id="formTitle" 
                            placeholder="Enter Your Name" 
                            onChange= { (event) => 
                                this.setState({name: event.target.value})}
                            value = {this.state.name}
                            />
                    </FormGroup>     
                    <FormGroup>
                        <Label for="formEmail">Email*</Label>
                        <Input 
                            type="text" 
                            name="email" id="formEmail" 
                            placeholder="Enter Your Email" 
                            onChange= { (event) => 
                                this.setState({email: event.target.value})}
                            value = {this.state.email}
                            />
                    </FormGroup> 
                    <FormGroup>
                        <Label for="formContents">Comment*</Label>
                        <Input 
                            type="textarea" 
                            name="text" 
                            onChange= { (event) => 
                                this.setState({content: event.target.value})}
                            id="formcontents" 
                            placeholder='Enter your comments'
                            style={{ height: 100 }}
                            value = {this.state.content}/>
                    </FormGroup>                 
                 
                    
                <Button 
                    color='info' 
                    onClick={(e)=>this.handleAdd(e)}
                    type='submit'>Submit</Button>
                </Form>
            </div>
        );
    }
}

export default AddComment;