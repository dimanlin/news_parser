var NewsRow = React.createClass({
  getInitialState() {
    return {
      id: this.props.article.id,
      header: this.props.article.header,
      url: this.props.article.url,
      body: this.props.article.body,
      object_key: 'news_row_' + this.props.article.id
    }
  },

  hendlerDelete() {
    options = { showModal: true,
                object_key: this.state.object_key,
                title: 'Delete',
                body_header: 'Are you sure ?',
                body: 'The record is deleted from the database.',
                action_button_name: 'Delete'}

    ModalConfirmAction.show(options)
  },

  hendlerShowDescription() {
    options = { showModal: true,
                title: 'Description',
                body_header: this.state.header,
                body: this.state.body }

    SimpleModalAction.show(options)
  },

  catch(data) {
    if(data.action == 'confirm' && data.object_key == this.state.object_key) {
      NewsAction.delete(this.state.id)
    }
  },

  componentWillMount() {
    ModalConfirmStore.listen(this.catch)
  },

  render() {
    return (
      <tr>
        <td>{this.state.id}</td>
        <td>
          <a target="_blank" href={this.state.url}>{this.state.header}</a>
        </td>
        <td>
          <a className="btn btn-xs btn-danger" onClick={this.hendlerDelete}>Delete</a>
          { this.state.body != null ? <a className="btn btn-xs btn-primary" onClick={this.hendlerShowDescription}>Show description</a> : null}
        </td>
      </tr>
    )
  }
})

var NewsParseForm = React.createClass({
  getInitialState() {
    return {
      input_value: '',
      showValidationError: false,
      showValidationErrorMessage: 'Wrong format of url..'
    }
  },

  hendlerChangeInput(event) {
    this.setState({input_value: event.target.value})
  },

  valid() {
    var expression = /(http:\/\/|https:\/\/)[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression)
    return this.state.input_value.match(regex) != null
  },

  hendlerParse(event) {
    if(this.valid() == true) {
      this.setState({input_value: '', showValidationError: false})
      SpinStore.active()
      NewsAction.parseUrl(this.state.input_value)
    } else {
      this.setState({showValidationError: true})
    }
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
          <div className='row'>
            <div className='col-xs-12 text-danger'>
              { this.state.showValidationError == true ? this.state.showValidationErrorMessage : null}
            </div>
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
      this.setState({articles: data.response })
      SpinStore.unactive()
    }
  },

  catchArticleBroadcast(data) {
    if(data.action == 'new_article') {
      articles = this.state.articles
      articles.unshift(data.article)
      this.setState({articles: articles})
      SpinAction.unactive()
    }

    if(data.action == 'destroy_article') {
      articles = _.without(this.state.articles, _.findWhere(this.state.articles, {
        id: data.article.id
      }));
      this.setState({articles: articles})
    }
  },

  componentWillMount () {
    this.unsubscribe = NewsStore.listen(this.catch)
    NewsAction.index()
    this.initActionCableSubscribe()
  },

  initActionCableSubscribe() {
    App.cable.subscriptions.create("ArticlesChannel", {
      connected: function() {
        return console.log('App.articles connected');
      },
      disconnected: function() {
        return console.log('App.articles disconnected');
      },
      received: function(data) {
        return this["catchArticleBroadcast"](data);
      },
      "catchArticleBroadcast": this["catchArticleBroadcast"]
    });
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
