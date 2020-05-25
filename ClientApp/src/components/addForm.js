import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const addform = (props) => {
  
  return (
    <Form>
      <FormGroup>
        <Label for="formTitle">Title</Label>
        <Input type="text" name="title" id="formTitle" placeholder="Enter the Title" />
      </FormGroup>     
     
      
      <FormGroup>
        <Label for="formContents">Contents</Label>
        <Input type="textarea" name="text" id="formcontents" style={{ height: 200 }}/>
      </FormGroup>
      <FormGroup>
        <Label for="authorName">Author Name</Label>
        <Input type="text" name="authorname" id="authorname" placeholder="Enter Author name" />
      </FormGroup>
      
      <Button color='info'>Submit</Button>
    </Form>
  );
}

export default addform;