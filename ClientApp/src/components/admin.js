import React, { Component } from 'react';
import Loginscreen from './loginScreen'
import { Button, Table, Alert } from 'reactstrap';
import axios from 'axios'
import AddPost from './addPost';

class Admin extends Component {
    constructor(props){
        super(props); 
        const token = localStorage.getItem("token");
        let loggedIn = true
        if(token == null){
        loggedIn = false
        }
        this.state = {
        loggedIn,
        posts: [], 
        isOpen: false,
        author: '',
        title: '',
        preview: '',
        contents: '', 
        error: '', 
        deletesuccess:''
        }
        this.handleSuccessfulAdd = this.handleSuccessfulAdd.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }
    componentDidMount() {
        this.populatePostsData();
      }
    handleAdd = () => {
        this.setState({ isOpen: true,  title: '', author: '', contents: ''  });
    }
    handleEdit = (event, title, author, contents) => {
      this.setState({ isOpen: true, title: title, author: author, contents: contents });
    }
    handleDelete = (event, id) => {
      this.setState({ isOpen: false });
      console.log('id', id)
      this.deletePost(id);
    }
    handleSuccessfulAdd = (data, msg) => {
      this.populatePostsData();
      this.setState({ isOpen: false, deletesuccess: msg });
    }
    render() {
       
   
        if(this.state.loggedIn === false){
            return <Loginscreen /> 
          }
          else{
           
            let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : (
            
            
            <Table responsive size='sm' className='table table-striped' aria-labelledby="tabelLabel">
              
            <thead>
              <tr>
                <th>#</th>
                <th>Author</th>
                <th>Title</th>
                <th>Preview</th>
                <th>Content</th>
                <th>Published Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.posts.map(post =>
                <tr key={post.id}>
                    <td></td>
                  <td>{post.author}</td>
                  <td>{post.title}</td>
                  <td><div>{post.preview}</div></td>
                  <td><div>{post.contents}</div></td>
                  <td>{post.createdOn}</td>
                  <td>
                      <Button 
                        color='warning' 
                        author={post.author} 
                        title={post.title}                        
                        contents={post.contents}
                        onClick = {(event) => this.handleEdit(event, post.title,post.author, post.contents ) }
                        >Edit 
                        </Button>
                      <Button 
                        onClick = {(event) => this.handleDelete(event, post.id )}
                        color='danger'
                        >Delete</Button>
                      </td>
                </tr>
              )}
            </tbody>
          </Table>);
            return (
              
                <div>
                  { this.state.deletesuccess && 
                  <Alert color='success'>{ this.state.deletesuccess }</Alert>
                  }
                  <h1 id="tabelLabel" >Manage Posts</h1>
                  <p>There are {this.state.posts.length} post available</p>
                  <Button onClick = {(event) => this.handleAdd() } color='success'>Add Posts</Button>
                  { this.state.isOpen
                   && <AddPost 
                        isOpen = {this.state.isOpen} 
                        title = {this.state.title}
                        contents = {this.state.contents}
                        author= {this.state.author}
                        preview={this.state.preview}
                        handleSuccessfulAdd={this.handleSuccessfulAdd}>
                        </AddPost>
                   }
                               
                  {contents}
                </div>
              );
          }
          
    }

    deletePost(postId){
      var post =  { 
        Id: postId,
      }; 
      
      this.setState({ loading: true }, () => {
         axios
        .post("/api/v1/posts/delete", post )
        .then(response => {
          console.log("posts", response);
            if (response.status === 200) {                           
              if (response.data.success === false) {
                this.setState(() => ({ error: response.data.errorMessage }));
                  console.log(response.data.errorMessage);
              }
              else{
                let message = 'Successfully Deleted'; 
                this.setState(() => ({ isAdded: true, deletesuccess: 'Successfully Deleted' }));
                this.handleSuccessfulAdd(response.data, message);
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
    
      async populatePostsData() {

        this.setState({ loading: true }, async () => {
          const response =  await fetch('/api/getposts');
          const data = await response.json();
          console.log(data)
          this.setState({ posts: data, loading: false });
        })      
  
      }
}

export default Admin;