import Ember from 'ember';

export default Ember.Route.extend({
  model () {
  const apartment = this.modelFor('apartment')
  return Ember.RSVP.hash ({
    listingPhoto: this.get('store').query('listing-photo', {apartment_id: apartment.id}),
    apartment: this.get('store').findRecord('apartment', apartment.id)
  });
},

  actions: {
    createListingPhoto (photoUrl) {
      const apartment = this.modelFor('apartment')
      // const apartmentId = apartment.get('id')
      let newListingPhoto = this.get('store').createRecord('listing-photo', {url: photoUrl, apartment: apartment});
         newListingPhoto.save()
         .then(()=> this.refresh())
         .then(() => {
           this.get('flashMessages')
           .success('Successfully posted image')
         })
         .catch(() => {
           this.get('flashMessages')
           .danger('There was a problem. Please try again.');
           });
    },
    deletePhoto (photo) {
      return photo.destroyRecord()
      .then(() => {
        this.get('flashMessages')
        .success('Successfully deleted')
      })
      .catch(() => {
        this.get('flashMessages')
        .danger('There was a problem. Please try again.');
        });
    }

  }
});
