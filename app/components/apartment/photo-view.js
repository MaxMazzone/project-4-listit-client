import Ember from 'ember';

export default Ember.Component.extend({
actions: {
  deletePhoto() {
    console.log(this.get('photo'))
    return this.sendAction('deletePhoto', this.get('listingPhoto'));
    },
  },
});
