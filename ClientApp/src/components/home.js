import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Home extends Component {
  static displayName = Home.name;
  constructor(props){
    super(props);
    this.state = {
      posts: [], 
      loading: false
    }
  }
  componentDidMount(){
    this.populatePostsData();

  }

  static render(posts) {
    console.log(posts)
    return (
      <div className="container">
        <div className="row">
          { posts.map(post => 
          <div key={post.id} className="col-lg-8 col-md-10 mx-auto">
            <div className="post-preview">
              
              <a href={`/postdetails/${post.id}`}>
                <h2 className="post-title">
                  {post.title}
                </h2>
                <h3 className="post-subtitle">
                 {post.preview}
                </h3>
              </a>
             <Link to={`/postdetails/${post.id}`} >show more</Link>
              <p className="post-meta">Written by 
                <a href={`/postdetails/${post.id}`}> {post.author} </a>
                on  {post.createdOn}</p>
            </div>
          </div>)}
        </div>
      </div>
        
    );
  }

  render () {
      
    let contents = this.state.loading
    ? <p><em>Loading...</em></p>
    : Home.render(this.state.posts);

  return (
    <div>      
      {contents}
    </div>
  );
    
  }
  async populatePostsData() {

    this.setState({ loading: true }, async () => {
      const response =  await fetch('/api/getposts');
      const data = await response.json();
      this.setState({ posts: data, loading: false });
      localStorage.setItem("posts", JSON.stringify(data)); 
    })      

  }
}
export default Home;
