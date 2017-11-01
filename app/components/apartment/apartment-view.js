import Ember from 'ember';

export default Ember.Component.extend({
  auth: Ember.inject.service(),

  userId: Ember.computed.alias('auth.credentials.id'),
  ownerId: Ember.computed.alias('apartment.user.id'),
  // userIsOwner: Ember.computed.alias('userId' === 'ownerId'),
  actions: {
  deleteApartment() {
    console.log(this.get('userId') + '' === this.get('ownerId'))
    return this.sendAction('deleteApartment', this.get('apartment'))
  },
},
});
