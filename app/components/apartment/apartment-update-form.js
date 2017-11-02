import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
    editList () {
    console.log(this.get('apartment.address'))
     this.sendAction('editListing', this.get('apartment'));
    },
  }
  });
