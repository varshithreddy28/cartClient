import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Form, FormGroup, Input } from 'reactstrap';

const FormInputs = ({handleSubmit,handleChange ,name}) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
            <Button color="secondary" className="add" size="lg" block onClick={toggle} >Add Item</Button>
      
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Product</ModalHeader>
        <Form onSubmit={handleSubmit}>
        <ModalBody>
            <FormGroup>
                <Input type="text" required name='name' placeholder="Item Name" onChange={handleChange} value={name.name}/>
            </FormGroup>
        </ModalBody>
        <ModalFooter>
            <Button color="primary" size="lg" block onClick={toggle} type="submit">Add</Button>
        </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
}

export default FormInputs;