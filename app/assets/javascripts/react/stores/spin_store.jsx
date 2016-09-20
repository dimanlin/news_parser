var SpinStore = Reflux.createStore({
  init: function() {
    this.listenTo(SpinAction.active, 'active')
    this.listenTo(SpinAction.unactive, 'unactive')
  },

  active: function() {
    this.trigger({action: 'active' })
  },

  unactive: function() {
    this.trigger({action: 'unactive' })
  },
})
