import Ember from 'ember';

export default Ember.Route.extend({
  model (params) {
  return this.get('store').findRecord('apartment', params.apartment_id);
},
actions: {
  deleteApartment(apartment) {
      apartment.destroyRecord()
          .then(() =>
            this.transitionTo('apartments'));
      },
    },
});
