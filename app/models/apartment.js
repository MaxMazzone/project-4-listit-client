import DS from 'ember-data';

export default DS.Model.extend({
  address: DS.attr('string'),
  rent: DS.attr('number'),
  bedrooms: DS.attr('number'),
  bathrooms: DS.attr('number'),
  description: DS.attr('string'),
  petsAllowed: DS.attr('boolean'),
  editable: DS.attr('boolean'),
  user: DS.belongsTo('user'),
  photo: attr('file'),
});
