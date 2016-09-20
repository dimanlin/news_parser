var SimpleModalStore = Reflux.createStore({
  init: function() {
    this.listenTo(SimpleModalAction.show, 'show')
  },

  show: function(options) {
    this.trigger({ action: 'show', options: options })
  },
})
