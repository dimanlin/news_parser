var NewsStore = Reflux.createStore({
  init: function() {
    this.listenTo(NewsAction.index, 'index')
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
  }
})
