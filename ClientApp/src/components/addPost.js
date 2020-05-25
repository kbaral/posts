import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner'; 


class AddPost extends Component {
    constructor(props){
        super(props);        
        this.state = {
            title:props.title,
            preview: props.preview,
            contents:props.contents,
            author:props.author,
            isAdded: false, 
            loading: false, 
            error:false
        }
    }

   
    
    handleAdd = (event) => {
        event.preventDefault();
        var posts = {
            title: this.state.title,
            preview: this.state.preview,
            contents: this.state.contents,
            author: this.state.author
        }

        this.setState({ loading: true }, () => {
            axios
            .post("/api/v1/posts/add", posts)
            .then(response => {
              console.log("posts", response);
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
                console.log("Username does not exists");
                
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
                        <Label for="formTitle">Title</Label>
                        <Input 
                            type="text" 
                            name="title" id="formTitle" 
                            placeholder="Enter the Title" 
                            onChange= { (event) => 
                                this.setState({title: event.target.value})}
                            value = {this.state.title}
                            />
                    </FormGroup>     
                    
                    <FormGroup>
                        <Label for="formContents">Preview</Label>
                        <Input 
                            type="textarea" 
                            name="text" 
                            onChange= { (event) => 
                                this.setState({preview: event.target.value})}
                            id="formcontents" 
                            style={{ height: 100 }}
                            value = {this.state.preview}/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="formContents">Contents</Label>
                        <Input 
                            type="textarea" 
                            name="text" 
                            onChange= { (event) => 
                                this.setState({contents: event.target.value})}
                            id="formcontents" 
                            style={{ height: 200 }}
                            value = {this.state.contents}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="authorName">Author Name</Label>
                        <Input 
                            type="text" 
                            name="authorname" 
                            id="authorname" 
                            placeholder="Enter Author name"
                            onChange= { (event) => 
                                this.setState({author: event.target.value})}
                            value = {this.state.author}/>
                    </FormGroup>
                    
                <Button color='info' type='submit'>Submit</Button>
                </Form>
            </div>
        );
    }
}

export default AddPost;