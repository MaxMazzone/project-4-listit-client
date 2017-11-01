import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['form-group'],
  newApartment: {
    address: null,
    rent: null,
    bedrooms: null,
    bathrooms: null,
    description: null,
    petsAllowed: false

  },
  actions: {
    createApartment() {
      this.sendAction('createApartment', this.get('newApartment'));
      return this.set('newApartment', {});
    }
  }
});
