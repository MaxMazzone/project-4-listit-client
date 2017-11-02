import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    editListing (apartment) {
      apartment.save()
      .then(() =>
          window.history.back());
    }
  }
});
