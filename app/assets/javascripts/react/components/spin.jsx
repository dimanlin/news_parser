var Spin = React.createClass({
  getInitialState() {
    return {
      active: false
    }
  },

  componentWillMount() {
    SpinStore.listen(this.catch)
  },

  catch(data) {
    if(data.action == 'active') {
      $(".spin").spin()
    }

    if(data.action == 'unactive') {
      $(".spin").spin(false)
    }
  },

  render() {
    return (
      <div className='spin'></div>
    )
  }
})
