import Ember from 'ember';

export default Ember.Route.extend({
  model (params) {
  return this.get('store').findRecord('apartment', params.apartment_id);
},
actions: {
  seePhotos(apartment){
      this.transitionTo('apartment.listing-photos', apartment)
  },
  deleteApartment(apartment) {
      apartment.destroyRecord()
          .then(() =>
            this.transitionTo('apartments'))
            .then(() => {
              this.get('flashMessages')
              .success('Successfully deleted')
            })
            .catch(() => {
              this.get('flashMessages')
              .danger('There was a problem. Please try again.');
              });
      },
    },
});
