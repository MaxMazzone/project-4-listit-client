import DS from 'ember-data';

export default DS.Model.extend({
  address: DS.attr('string'),
  rent: DS.attr('integer'),
  bedrooms: DS.attr('integer'),
  bathrooms: DS.attr('integer'),
  description: DS.attr('string'),
  petsAllowed: DS.attr('boolean')
});
