import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    createApartment (apartment) {
    let newApartment = this.get('store').createRecord('apartment', apartment);
      newApartment.save()
      this.transitionTo('apartments')
    }
  }
});
