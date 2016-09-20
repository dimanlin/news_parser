Modal = ReactBootstrap.Modal;
Button = ReactBootstrap.Button;

var SimpleModal = React.createClass({
  getInitialState() {
    return {
      showModal: false,
      title: undefined,
      body_header: undefined,
      body: undefined,
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

  componentWillMount() {
    SimpleModalStore.listen(this.catch)
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
        </Modal.Footer>
      </Modal>
    );
  }
})
