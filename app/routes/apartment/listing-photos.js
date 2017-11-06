import Ember from 'ember';

export default Ember.Route.extend({
  model () {
  const apartment = this.modelFor('apartment')
  return this.get('store').query('listing-photo', {apartment_id: apartment.id});
},

  actions: {
    createListingPhoto (photoUrl) {
      const apartment = this.modelFor('apartment')
      // const apartmentId = apartment.get('id')
      let newListingPhoto = this.get('store').createRecord('listing-photo', {url: photoUrl, apartment: apartment});
         newListingPhoto.save()
         .then(console.log('success'))
         .then(()=> this.refresh())
    }

  }
});
