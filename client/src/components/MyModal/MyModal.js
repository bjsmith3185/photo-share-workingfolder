import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import "./MyModal.css";


class MyModal extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showModal: false,
      _id: props._id,
      selectPicDelete: props.selectPicDelete,
    };
    
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  delete = () => {
    console.log("inside delete()")
    this.state.selectPicDelete(this.state._id)
    this.handleCloseModal();
  };
  
  handleOpenModal () {
    console.log(this.state._id)
    console.log(this.state.selectPicDelete)
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }
  
  render () {
    return (
      <div>
        <div onClick={this.handleOpenModal}>Delete</div>
        <Modal 
           isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example"
        >
          <button onClick={this.handleCloseModal}>Close Modal</button>
          <div onClick={this.delete}>Delete Picture</div>
        </Modal>
      </div>
    );
  }
}

export default MyModal;