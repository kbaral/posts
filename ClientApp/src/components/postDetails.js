import React, { Component } from "react";
import AddComment from "./addComment";
import ShowComment from "./showComment";

export class PostDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: true,
      message: "",
      title: "",
      author: "",
      content: "",
      createdOn: "",
        Id: this.props.match.params.Id,
        added: false
    };
    this.handleSuccessfulAddComment = this.handleSuccessfulAddComment.bind(
      this
    );
  }
  handleSuccessfulAddComment = (data, msg) => {
    this.setState({ isOpen: false, message: msg, added: true});
  };
  componentDidMount() {
    let Id = this.state.Id;
    let posts = localStorage.getItem("posts");
    posts = JSON.parse(posts);

    this.search(posts, Id);
  }
  search = (data, search) => {
    var results = [];

    for (var i = 0; i < data.length; i++) {
      if (data[i]["id"] === search) {
        this.setState({
          title: data[i]["title"],
          content: data[i]["contents"],
          author: data[i]["author"],
          createdOn: data[i]["createdOn"]
        });
      }
    }
    return results;
  };
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <div className="post-preview">
                <div>
                  <h2 className="post-title">{this.state.title}</h2>
                                <span className="post-subtitle"><pre>{this.state.content}</pre></span>
                </div>

                <p className="post-meta">
                  Written by
                  <span> {this.state.author} </span>
                  on {this.state.createdOn}
                </p>
              </div>

              <div>
                <ShowComment id={this.state.Id} added={this.state.added}></ShowComment>
                <AddComment
                  id={this.state.Id}
                  handleSuccessfulAddComment={this.handleSuccessfulAddComment}
                ></AddComment>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PostDetails;
