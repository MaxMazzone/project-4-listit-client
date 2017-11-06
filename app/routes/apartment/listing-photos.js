import Ember from 'ember';

export default Ember.Route.extend({

  actions: {
    createListingPhoto (photoUrl) {
      const apartment = this.modelFor('apartment')
      // const apartmentId = apartment.get('id')
      let newListingPhoto = this.get('store').createRecord('listing-photo', {url: photoUrl, apartment: apartment});
         newListingPhoto.save()
         .then(console.log('success'))
    }

  }
});
