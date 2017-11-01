import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('apartment/apartment-view', 'Integration | Component | apartment/apartment view', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{apartment/apartment-view}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#apartment/apartment-view}}
      template block text
    {{/apartment/apartment-view}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
