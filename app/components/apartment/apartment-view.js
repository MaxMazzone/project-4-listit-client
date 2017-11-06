import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    seePhotos (){
          return this.sendAction('seePhotos', this.get('apartment'));
    },
  deleteApartment() {
    return this.sendAction('deleteApartment', this.get('apartment'));
  },
},
});
