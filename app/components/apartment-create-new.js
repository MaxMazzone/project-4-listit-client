import Ember from 'ember';


export default Ember.Component.extend({
  auth: Ember.inject.service(),

  user: Ember.computed.alias('auth.credentials.email'),
  isAuthenticated: Ember.computed.alias('auth.isAuthenticated'),

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
      this.set('newApartment.address', null);
      this.set('newApartment.rent', null);
      this.set('newApartment.bedrooms', null);
      this.set('newApartment.bathrooms', null);
      this.set('newApartment.description', null);
      return this.set('newApartment.petsAllowed', false);
    }
  }
});
