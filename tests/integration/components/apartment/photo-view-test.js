import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('apartment/photo-view', 'Integration | Component | apartment/photo view', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{apartment/photo-view}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#apartment/photo-view}}
      template block text
    {{/apartment/photo-view}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
