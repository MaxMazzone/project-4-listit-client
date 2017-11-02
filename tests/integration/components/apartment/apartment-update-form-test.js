import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('apartment/apartment-update-form', 'Integration | Component | apartment/apartment update form', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{apartment/apartment-update-form}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#apartment/apartment-update-form}}
      template block text
    {{/apartment/apartment-update-form}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
