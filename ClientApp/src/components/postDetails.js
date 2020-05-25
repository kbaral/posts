import React, { Component } from 'react';
import AddComment from './addComment';

export class PostDetails extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            isOpen: true,
            message: '',             
            title:'',
            author:'',
            content:'',
            createdOn:'',
            Id: this.props.match.params.Id,  
            
        }
        this.handleSuccessfulAdd = this.handleSuccessfulAdd.bind(this);
    }
    handleSuccessfulAdd = (data, msg) => {   
        this.setState({ isOpen: false, message: msg });
    }
    componentDidMount(){
        let Id = this.state.Id; 
        let posts = localStorage.getItem("posts");
        posts = JSON.parse(posts);
        
        this.search(posts, Id); 
                   
        
    }
    search = (data, search) => {
        var results= [];
        
        for (var i=0 ; i < data.length ; i++)
        {
            if (data[i]["id"] === search) {
                this.setState({
                    title: data[i]['title'],
                    content: data[i]['contents'],
                    author: data[i]['author'],
                    createdOn: data[i]['createdOn']

                })
            }
        }
        return results;
       
    }
    render() {

        return (
            <div>
                <div className="container">
                <div className="row">
                
                <div className="col-lg-8 col-md-10 mx-auto">
                    <div className="post-preview">
                    
                    <div>
                        <h2 className="post-title">
                        {this.state.title}
                        </h2>
                        <h3 className="post-subtitle">
                        {this.state.content}
                        </h3>
                    </div>
                    
                    <p className="post-meta">Written by 
                        <span> {this.state.author} </span>
                        on  {this.state.createdOn}</p>
                    </div>
                     
                        <div>
                            <AddComment id={this.state.Id} handleSuccessfulAdd={this.handleSuccessfulAdd}></AddComment>
                        </div>
                        
                   
                </div>
                </div>
                
            </div>
        
            
            </div>
            
        );
    }
}

export default PostDetails;