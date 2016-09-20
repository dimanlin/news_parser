var ModalConfirmStore = Reflux.createStore({
  init: function() {
    this.listenTo(ModalConfirmAction.confirm, 'confirm')
    this.listenTo(ModalConfirmAction.show, 'show')
    this.listenTo(ModalConfirmAction.hide, 'hide')
  },

  confirm: function(object_key) {
    this.trigger({ action: 'confirm', object_key: object_key })
  },

  show: function(options) {
    this.trigger({ action: 'show', options: options })
  },

  hide: function(object_key) {
    this.trigger({ action: 'hide' })
  },
})
