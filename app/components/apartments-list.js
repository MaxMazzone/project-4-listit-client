import Ember from 'ember';
import formatMoney from "accounting/format-money"

export default Ember.Component.extend({
actions: {
  goToApartment: function(apartment) {
      this.sendAction('goToApartment', apartment);
  }
}
});
