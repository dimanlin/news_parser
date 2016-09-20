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

var News = React.createClass({
  getInitialState() {
    return {
      articles: []
    }
  },

  catch(data) {
    if(data.action == 'index') {
      this.setState({articles: data.response })
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
    )
  }
})
