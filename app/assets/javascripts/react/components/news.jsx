var NewsRow = React.createClass({
  getInitialState() {
    return {
      id: this.props.article.id,
      header: this.props.article.header,
      url: this.props.article.url,
      body: this.props.article.body
    }
  },

  render() {
    return (
      <tr>
        <td>{this.state.id}</td>
        <td>
          <a target="_blank" href="{this.state.url}">{this.state.header}</a>
        </td>
        <td>
          <a className="btn btn-xs btn-danger">Delete</a>
          <a className="btn btn-xs btn-primary">Show body</a>
        </td>
      </tr>
    )
  }
})

var NewsParseForm = React.createClass({
  getInitialState() {
    return {
      input_value: ''
    }
  },

  hendlerChangeInput(event) {
    this.setState({input_value: event.target.value})
  },

  hendlerParse(event) {
    SpinStore.active()
    NewsAction.parseUrl(this.state.input_value)
  },

  render() {
    return (
      <div className='row'>
        <div className='col-xs-12'>
          <label htmlFor="basic-url">Your vanity URL</label>
          <div className="input-group">
            <span className="input-group-addon" id="basic-addon3">https://www.yahoo.com/news/?ref=gs</span>
            <input type='text' value={this.state.input_value} onChange={this.hendlerChangeInput} className='form-control'/>
            <span className="input-group-btn">
              <button id='spin_submit' className="btn btn-default" type="button" onClick={this.hendlerParse}>Go!</button>
            </span>
          </div>
        </div>
      </div>
    )
  }
})

var News = React.createClass({
  getInitialState() {
    return {
      articles: []
    }
  },

  catch(data) {
    if(data.action == 'index') {
      console.log('1111111111111')
      this.setState({articles: data.response })
      SpinStore.unactive()
    }

    if(data.action == 'parseUrl') {
      console.log('222222222222')
      NewsAction.index()
    }
  },

  componentWillMount () {
    this.unsubscribe = NewsStore.listen(this.catch)
    NewsAction.index()
  },

  componentWillUnmount: function() {
    this.unsubscribe();
  },

  render: function(){
    NewsRows = this.state.articles.map(function(data) {
      return (<NewsRow article={data} key={'news_row_key_' + data.id}/>)
    })
    return (
      <div>
        <NewsParseForm />
        <table className="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Header</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { NewsRows.length > 0 ? NewsRows : null}
          </tbody>
        </table>
      </div>
    )
  }
})
