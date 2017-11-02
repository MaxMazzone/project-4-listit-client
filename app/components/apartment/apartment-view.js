import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
  deleteApartment() {
    return this.sendAction('deleteApartment', this.get('apartment'));
  },
},
});
