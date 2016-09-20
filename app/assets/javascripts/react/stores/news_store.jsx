var NewsStore = Reflux.createStore({
  init: function() {
    this.listenTo(NewsAction.index, 'index')
    this.listenTo(NewsAction.delete, 'delete')
    this.listenTo(NewsAction.parseUrl, 'parseUrl')
  },

  index: function() {
    NewsStoreIndex = this
    $.ajax({
      url: "/api_v1/articles",
      method: 'GET',
      dataType: 'JSON'
    }).done(function(response) {
      NewsStoreIndex.trigger({action: 'index', response: response })
    })
  },

  delete: function(id) {
    NewsStoreDelete = this
    $.ajax({
      url: "/api_v1/articles/" + id,
      method: 'delete',
      dataType: 'JSON'
    }).done(function(response) {
      NewsStoreDelete.trigger({action: 'delete' })
    })
  },

  parseUrl: function(url) {
    NewsStoreIndex = this
    $.ajax({
      url: "/api_v1/articles/parse_url",
      method: 'POST',
      data: {url: url},
      dataType: 'JSON'
    }).done(function(response) {
      NewsStoreIndex.trigger({action: 'parseUrl', response: response })
    })
  }
})
