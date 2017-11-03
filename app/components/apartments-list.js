import Ember from 'ember';


export default Ember.Component.extend({
actions: {
  goToApartment: function(apartment) {
    console.log('clicked')
      this.sendAction('goToApartment', apartment);
  }
}
});
