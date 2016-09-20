Modal = ReactBootstrap.Modal;
Button = ReactBootstrap.Button;

var ModalConfirm = React.createClass({
  getInitialState() {
    return {
      showModal: false,
      title: undefined,
      body_header: undefined,
      body: undefined,
      action_button_name: undefined,
      object_key: undefined
    };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },

  catch(data) {
    if(data.action == 'show') {
      this.setState(data.options)
    }
  },

  hendlerDelete(data) {
    ModalConfirmAction.confirm(this.state.object_key)
    this.close()
  },

  componentWillMount() {
    ModalConfirmStore.listen(this.catch)
  },

  render() {
    return (
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>{this.state.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{this.state.body_header}</h4>
          <p>{this.state.body}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close}>Close</Button>
          <Button className='btn btn-primary' onClick={this.hendlerDelete}>{this.state.action_button_name}</Button>
        </Modal.Footer>
      </Modal>
    );
  }
})
