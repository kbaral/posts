import React, { Component } from "react";

import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

class ShowComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postId: this.props.id,
      content: "",
      name: "",
      email: "",
      isAdded: false,
      loading: false,
      error: "",
      comments: []
    };
  }

  componentDidMount() {
    var comments = {
      postId: this.state.postId,
      content: "",
      name: "",
      email: ""
    };
    this.setState({ loading: true }, () => {
      axios
        .post("/api/v1/comments/show", comments)
        .then(response => {
          if (response.status === 200) {
            this.setState(() => ({ comments: response.data }));
          } else {
          }
        })
        .catch(err => {
          this.setState({ error: "Oops, something went wrong !" });
        })
        .finally(() => {
          this.setState(() => ({ loading: false }));
          console.log("comments", this.state.comments);
        });
    });
  }

  static render(comments) {
    let contents = []; 
    
    return (
      
      <div className="container">
        <p>Comments</p>
        <div className="row">
          {comments.map(comment => (
            <div key={comment.id} className="col-lg-8 col-md-10 mx-auto">
              <div className="post-preview">
                <p>{comment.content}</p>
                <p className="post-meta">
                  Written by {" "}
                  {comment.name} <br />  Email {" "} {comment.email}
                  on {comment.createdOn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      ShowComment.render(this.state.comments)
    );

    return <div>{contents}</div>;
  }
}

export default ShowComment;
