/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Form from 'react-bootstrap/Form';
const AddPostModal = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="success" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
        <Form>
            <Form.Row>
              <Form.Group  controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter Title" 
                  onChange= { (event) => 
                    this.setState({name: event.target.value})} />
              </Form.Group>
              </Form.Row>
              <Form.Row>
              <Form.Group  controlId="formAuthorName">
                <Form.Label>Author Name</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Author Name" 
                  onChange= { (event) => 
                    this.setState({email: event.target.value})} />
              </Form.Group>
              </Form.Row>
              <Form.Row>

              <Form.Group controlId="formBasicContent">
                <Form.Label>Content</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Content" 
                onChange = {(event) => 
                  this.setState({password:event.target.value})}
                />
              </Form.Group>
              
              </Form.Row>
              

            </Form>

         
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}


export default AddPostModal;