"use strict";



define('ga-wdi-boston.list-it/adapters/application', ['exports', 'ga-wdi-boston.list-it/config/environment', 'active-model-adapter', 'ember'], function (exports, _gaWdiBostonListItConfigEnvironment, _activeModelAdapter, _ember) {
  exports['default'] = _activeModelAdapter['default'].extend({
    host: _gaWdiBostonListItConfigEnvironment['default'].apiHost,

    auth: _ember['default'].inject.service(),

    headers: _ember['default'].computed('auth.credentials.token', {
      get: function get() {
        var headers = {};
        var token = this.get('auth.credentials.token');
        if (token) {
          headers.Authorization = 'Token token=' + token;
        }

        return headers;
      }
    })
  });
});
define('ga-wdi-boston.list-it/app', ['exports', 'ember', 'ga-wdi-boston.list-it/resolver', 'ember-load-initializers', 'ga-wdi-boston.list-it/config/environment'], function (exports, _ember, _gaWdiBostonListItResolver, _emberLoadInitializers, _gaWdiBostonListItConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _gaWdiBostonListItConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _gaWdiBostonListItConfigEnvironment['default'].podModulePrefix,
    Resolver: _gaWdiBostonListItResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _gaWdiBostonListItConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('ga-wdi-boston.list-it/components/apartment-create-new', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    auth: _ember['default'].inject.service(),

    user: _ember['default'].computed.alias('auth.credentials.email'),
    isAuthenticated: _ember['default'].computed.alias('auth.isAuthenticated'),

    newApartment: {
      address: null,
      rent: null,
      bedrooms: null,
      bathrooms: null,
      description: null,
      petsAllowed: false

    },
    actions: {
      createApartment: function createApartment() {
        this.sendAction('createApartment', this.get('newApartment'));
        this.set('newApartment.address', null);
        this.set('newApartment.rent', null);
        this.set('newApartment.bedrooms', null);
        this.set('newApartment.bathrooms', null);
        this.set('newApartment.description', null);
        return this.set('newApartment.petsAllowed', false);
      }
    }
  });
});
define('ga-wdi-boston.list-it/components/apartment/apartment-update-form', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    actions: {
      editListing: function editListing() {
        console.log(this.get('apartment.address'));
        this.sendAction('editListing', this.get('apartment'));
      }
    }
  });
});
define('ga-wdi-boston.list-it/components/apartment/apartment-view', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({

    actions: {
      seePhotos: function seePhotos() {
        return this.sendAction('seePhotos', this.get('apartment'));
      },
      deleteApartment: function deleteApartment() {
        return this.sendAction('deleteApartment', this.get('apartment'));
      }
    }
  });
});
define('ga-wdi-boston.list-it/components/apartment/photo-upload', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({

    imgur: _ember['default'].inject.service(),
    actions: {
      picSubmit: function picSubmit(rawFile) {
        var _this = this;

        console.log(rawFile);
        console.log(rawFile.target.files[0]);
        var fileReader = new FileReader();
        fileReader.readAsDataURL(rawFile.target.files[0]);
        fileReader.onload = function () {
          var imageData = fileReader.result;
          imageData = imageData.replace('data:image/png;base64', '');
          _this.get('imgur').imagePost(imageData).then(function (result) {
            var link = result.data.link;
            _this.sendAction('createListingPhoto', link);
          })['catch'](function (result) {
            console.log(result);
          });
        };
      }
    }
  });
});
define('ga-wdi-boston.list-it/components/apartment/photo-view', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    actions: {
      deletePhoto: function deletePhoto() {
        console.log(this.get('photo'));
        return this.sendAction('deletePhoto', this.get('listingPhoto'));
      }
    }
  });
});
define('ga-wdi-boston.list-it/components/apartments-list', ['exports', 'ember', 'accounting/format-money'], function (exports, _ember, _accountingFormatMoney) {
  exports['default'] = _ember['default'].Component.extend({
    actions: {
      goToApartment: function goToApartment(apartment) {
        this.sendAction('goToApartment', apartment);
      }
    }
  });
});
define('ga-wdi-boston.list-it/components/change-password-form', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'form',
    classNames: ['form-horizontal'],

    passwords: {},

    actions: {
      submit: function submit() {
        this.sendAction('submit', this.get('passwords'));
      },

      reset: function reset() {
        this.set('passwords', {});
      }
    }
  });
});
define('ga-wdi-boston.list-it/components/cloudinary-direct-file', ['exports', 'ember-cli-cloudinary/components/cloudinary-direct-file'], function (exports, _emberCliCloudinaryComponentsCloudinaryDirectFile) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliCloudinaryComponentsCloudinaryDirectFile['default'];
    }
  });
});
define('ga-wdi-boston.list-it/components/cloudinary-image', ['exports', 'ember-cli-cloudinary/components/cloudinary-image'], function (exports, _emberCliCloudinaryComponentsCloudinaryImage) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliCloudinaryComponentsCloudinaryImage['default'];
    }
  });
});
define('ga-wdi-boston.list-it/components/email-input', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['form-group']
  });
});
define('ga-wdi-boston.list-it/components/file-upload', ['exports', 'ember-data-paperclip/components/file-upload'], function (exports, _emberDataPaperclipComponentsFileUpload) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberDataPaperclipComponentsFileUpload['default'];
    }
  });
});
define('ga-wdi-boston.list-it/components/flash-message', ['exports', 'ember-cli-flash/components/flash-message'], function (exports, _emberCliFlashComponentsFlashMessage) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFlashComponentsFlashMessage['default'];
    }
  });
});
define('ga-wdi-boston.list-it/components/formatted-number', ['exports', 'ember-formatted-number/components/formatted-number'], function (exports, _emberFormattedNumberComponentsFormattedNumber) {
  exports['default'] = _emberFormattedNumberComponentsFormattedNumber['default'];
});
define('ga-wdi-boston.list-it/components/hamburger-menu', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'button',
    classNames: ['navbar-toggle', 'collapsed'],
    attributeBindings: ['toggle:data-toggle', 'target:data-target', 'expanded:aria-expanded'],
    toggle: 'collapse',
    target: '#navigation',
    expanded: false
  });
});
define('ga-wdi-boston.list-it/components/my-application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    auth: _ember['default'].inject.service(),

    user: _ember['default'].computed.alias('auth.credentials.email'),
    isAuthenticated: _ember['default'].computed.alias('auth.isAuthenticated'),

    actions: {
      signOut: function signOut() {
        this.sendAction('signOut');
      }
    }
  });
});
define('ga-wdi-boston.list-it/components/navbar-header', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['navbar-header']
  });
});
define('ga-wdi-boston.list-it/components/new-apartment-link', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    auth: _ember['default'].inject.service(),

    user: _ember['default'].computed.alias('auth.credentials.email'),
    isAuthenticated: _ember['default'].computed.alias('auth.isAuthenticated')
  });
});
define('ga-wdi-boston.list-it/components/password-confirmation-input', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['form-group']
  });
});
define('ga-wdi-boston.list-it/components/password-input', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['form-group']
  });
});
define('ga-wdi-boston.list-it/components/sign-in-form', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'form',
    classNames: ['form-horizontal'],

    actions: {
      submit: function submit() {
        this.sendAction('submit', this.get('credentials'));
      },

      reset: function reset() {
        this.set('credentials', {});
      }
    }
  });
});
define('ga-wdi-boston.list-it/components/sign-up-form', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'form',
    classNames: ['form-horizontal'],

    credentials: {},

    actions: {
      submit: function submit() {
        this.sendAction('submit', this.get('credentials'));
      },

      reset: function reset() {
        this.set('credentials', {});
      }
    }
  });
});
define('ga-wdi-boston.list-it/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('ga-wdi-boston.list-it/controllers/object', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('ga-wdi-boston.list-it/flash/object', ['exports', 'ember-cli-flash/flash/object'], function (exports, _emberCliFlashFlashObject) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFlashFlashObject['default'];
    }
  });
});
define('ga-wdi-boston.list-it/helpers/app-version', ['exports', 'ember', 'ga-wdi-boston.list-it/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _ember, _gaWdiBostonListItConfigEnvironment, _emberCliAppVersionUtilsRegexp) {
  exports.appVersion = appVersion;
  var version = _gaWdiBostonListItConfigEnvironment['default'].APP.version;

  function appVersion(_) {
    var hash = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    if (hash.hideSha) {
      return version.match(_emberCliAppVersionUtilsRegexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_emberCliAppVersionUtilsRegexp.shaRegExp)[0];
    }

    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});
define('ga-wdi-boston.list-it/helpers/file-url', ['exports', 'ember-data-paperclip/helpers/file-url'], function (exports, _emberDataPaperclipHelpersFileUrl) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberDataPaperclipHelpersFileUrl['default'];
    }
  });
  Object.defineProperty(exports, 'fileUrl', {
    enumerable: true,
    get: function get() {
      return _emberDataPaperclipHelpersFileUrl.fileUrl;
    }
  });
});
define('ga-wdi-boston.list-it/helpers/format-money', ['exports', 'accounting/helpers/format-money'], function (exports, _accountingHelpersFormatMoney) {
  exports['default'] = _accountingHelpersFormatMoney['default'];
});
define('ga-wdi-boston.list-it/helpers/format-number', ['exports', 'accounting/helpers/format-number'], function (exports, _accountingHelpersFormatNumber) {
  exports['default'] = _accountingHelpersFormatNumber['default'];
});
define('ga-wdi-boston.list-it/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('ga-wdi-boston.list-it/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define("ga-wdi-boston.list-it/initializers/active-model-adapter", ["exports", "active-model-adapter", "active-model-adapter/active-model-serializer"], function (exports, _activeModelAdapter, _activeModelAdapterActiveModelSerializer) {
  exports["default"] = {
    name: 'active-model-adapter',
    initialize: function initialize() {
      var application = arguments[1] || arguments[0];
      application.register('adapter:-active-model', _activeModelAdapter["default"]);
      application.register('serializer:-active-model', _activeModelAdapterActiveModelSerializer["default"]);
    }
  };
});
define('ga-wdi-boston.list-it/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'ga-wdi-boston.list-it/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _gaWdiBostonListItConfigEnvironment) {
  var _config$APP = _gaWdiBostonListItConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});
define('ga-wdi-boston.list-it/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('ga-wdi-boston.list-it/initializers/data-adapter', ['exports'], function (exports) {
  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('ga-wdi-boston.list-it/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _emberDataSetupContainer, _emberData) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.Controller.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('ga-wdi-boston.list-it/initializers/export-application-global', ['exports', 'ember', 'ga-wdi-boston.list-it/config/environment'], function (exports, _ember, _gaWdiBostonListItConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_gaWdiBostonListItConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _gaWdiBostonListItConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_gaWdiBostonListItConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('ga-wdi-boston.list-it/initializers/file', ['exports', 'ember-data-paperclip/initializers/file'], function (exports, _emberDataPaperclipInitializersFile) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberDataPaperclipInitializersFile['default'];
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function get() {
      return _emberDataPaperclipInitializersFile.initialize;
    }
  });
});
define('ga-wdi-boston.list-it/initializers/flash-messages', ['exports', 'ember', 'ga-wdi-boston.list-it/config/environment'], function (exports, _ember, _gaWdiBostonListItConfigEnvironment) {
  exports.initialize = initialize;
  var deprecate = _ember['default'].deprecate;

  var merge = _ember['default'].assign || _ember['default'].merge;
  var INJECTION_FACTORIES_DEPRECATION_MESSAGE = '[ember-cli-flash] Future versions of ember-cli-flash will no longer inject the service automatically. Instead, you should explicitly inject it into your Route, Controller or Component with `Ember.inject.service`.';
  var addonDefaults = {
    timeout: 3000,
    extendedTimeout: 0,
    priority: 100,
    sticky: false,
    showProgress: false,
    type: 'info',
    types: ['success', 'info', 'warning', 'danger', 'alert', 'secondary'],
    injectionFactories: ['route', 'controller', 'view', 'component'],
    preventDuplicates: false
  };

  function initialize() {
    var application = arguments[1] || arguments[0];

    var _ref = _gaWdiBostonListItConfigEnvironment['default'] || {};

    var flashMessageDefaults = _ref.flashMessageDefaults;

    var _ref2 = flashMessageDefaults || [];

    var injectionFactories = _ref2.injectionFactories;

    var options = merge(addonDefaults, flashMessageDefaults);
    var shouldShowDeprecation = !(injectionFactories && injectionFactories.length);

    application.register('config:flash-messages', options, { instantiate: false });
    application.inject('service:flash-messages', 'flashMessageDefaults', 'config:flash-messages');

    deprecate(INJECTION_FACTORIES_DEPRECATION_MESSAGE, shouldShowDeprecation, {
      id: 'ember-cli-flash.deprecate-injection-factories',
      until: '2.0.0'
    });

    options.injectionFactories.forEach(function (factory) {
      application.inject(factory, 'flashMessages', 'service:flash-messages');
    });
  }

  exports['default'] = {
    name: 'flash-messages',
    initialize: initialize
  };
});
define('ga-wdi-boston.list-it/initializers/injectStore', ['exports'], function (exports) {
  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('ga-wdi-boston.list-it/initializers/local-storage-adapter', ['exports', 'ember-local-storage/initializers/local-storage-adapter'], function (exports, _emberLocalStorageInitializersLocalStorageAdapter) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberLocalStorageInitializersLocalStorageAdapter['default'];
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function get() {
      return _emberLocalStorageInitializersLocalStorageAdapter.initialize;
    }
  });
});
define('ga-wdi-boston.list-it/initializers/store', ['exports'], function (exports) {
  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('ga-wdi-boston.list-it/initializers/text-field', ['exports', 'ember'], function (exports, _ember) {
  exports.initialize = initialize;

  function initialize() {
    _ember['default'].TextField.reopen({
      classNames: ['form-control']
    });
  }

  exports['default'] = {
    name: 'text-field',
    initialize: initialize
  };
});
define('ga-wdi-boston.list-it/initializers/transforms', ['exports'], function (exports) {
  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('ga-wdi-boston.list-it/instance-initializers/cloudinary-config', ['exports', 'ember-cli-cloudinary/instance-initializers/cloudinary-config'], function (exports, _emberCliCloudinaryInstanceInitializersCloudinaryConfig) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliCloudinaryInstanceInitializersCloudinaryConfig['default'];
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function get() {
      return _emberCliCloudinaryInstanceInitializersCloudinaryConfig.initialize;
    }
  });
});
define("ga-wdi-boston.list-it/instance-initializers/ember-data", ["exports", "ember-data/instance-initializers/initialize-store-service"], function (exports, _emberDataInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataInstanceInitializersInitializeStoreService["default"]
  };
});
define('ga-wdi-boston.list-it/models/apartment', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    address: _emberData['default'].attr('string'),
    rent: _emberData['default'].attr('number'),
    bedrooms: _emberData['default'].attr('number'),
    bathrooms: _emberData['default'].attr('number'),
    description: _emberData['default'].attr('string'),
    petsAllowed: _emberData['default'].attr('boolean'),
    editable: _emberData['default'].attr('boolean'),
    user: _emberData['default'].belongsTo('user'),
    listingPhoto: _emberData['default'].hasMany('listing-photo')
  });
});
define('ga-wdi-boston.list-it/models/listing-photo', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    url: _emberData['default'].attr('string'),
    apartment: _emberData['default'].belongsTo('apartment')
  });
});
define('ga-wdi-boston.list-it/models/user', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    email: _emberData['default'].attr('string'),
    apartments: _emberData['default'].hasMany('apartment')
  });
});
define('ga-wdi-boston.list-it/objects/file', ['exports', 'ember-data-paperclip/objects/file'], function (exports, _emberDataPaperclipObjectsFile) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberDataPaperclipObjectsFile['default'];
    }
  });
});
define('ga-wdi-boston.list-it/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('ga-wdi-boston.list-it/router', ['exports', 'ember', 'ga-wdi-boston.list-it/config/environment'], function (exports, _ember, _gaWdiBostonListItConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _gaWdiBostonListItConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('sign-up');
    this.route('sign-in');
    this.route('change-password');
    this.route('users');
    this.route('apartments/new');
    this.route('apartments');
    this.route('apartment', { path: '/apartments/:apartment_id' }, function () {
      this.route('listing-photos');
    });
    this.route('apartment/edit', { path: '/apartments/:apartment_id/edit' });
  });

  exports['default'] = Router;
});
define('ga-wdi-boston.list-it/routes/apartment', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model(params) {
      return this.get('store').findRecord('apartment', params.apartment_id);
    },
    actions: {
      seePhotos: function seePhotos(apartment) {
        this.transitionTo('apartment.listing-photos', apartment);
      },
      deleteApartment: function deleteApartment(apartment) {
        var _this = this;

        apartment.destroyRecord().then(function () {
          return _this.transitionTo('apartments');
        }).then(function () {
          _this.get('flashMessages').success('Successfully deleted');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Please try again.');
        });
      }
    }
  });
});
define('ga-wdi-boston.list-it/routes/apartment/edit', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    actions: {
      editListing: function editListing(apartment) {
        apartment.save().then(function () {
          return window.history.back();
        });
      }
    }
  });
});
define('ga-wdi-boston.list-it/routes/apartment/listing-photos', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      var apartment = this.modelFor('apartment');
      return _ember['default'].RSVP.hash({
        listingPhoto: this.get('store').query('listing-photo', { apartment_id: apartment.id }),
        apartment: this.get('store').findRecord('apartment', apartment.id)
      });
    },

    actions: {
      createListingPhoto: function createListingPhoto(photoUrl) {
        var _this = this;

        var apartment = this.modelFor('apartment');
        // const apartmentId = apartment.get('id')
        var newListingPhoto = this.get('store').createRecord('listing-photo', { url: photoUrl, apartment: apartment });
        newListingPhoto.save().then(function () {
          return _this.refresh();
        }).then(function () {
          _this.get('flashMessages').success('Successfully posted image');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Please try again.');
        });
      },
      deletePhoto: function deletePhoto(photo) {
        var _this2 = this;

        return photo.destroyRecord().then(function () {
          _this2.get('flashMessages').success('Successfully deleted');
        })['catch'](function () {
          _this2.get('flashMessages').danger('There was a problem. Please try again.');
        });
      }

    }
  });
});
define('ga-wdi-boston.list-it/routes/apartments', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({

    model: function model() {
      return this.get('store').findAll('apartment');
    },
    actions: {
      goToApartment: function goToApartment(apartment) {
        this.transitionTo('apartment', apartment);
      }

    }
  });
});
define('ga-wdi-boston.list-it/routes/apartments/new', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    actions: {
      createApartment: function createApartment(apartment) {
        var newApartment = this.get('store').createRecord('apartment', apartment);
        newApartment.save();
        this.transitionTo('apartments');
      }
    }
  });
});
define('ga-wdi-boston.list-it/routes/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    auth: _ember['default'].inject.service(),
    flashMessages: _ember['default'].inject.service(),

    actions: {
      signOut: function signOut() {
        var _this = this;

        this.get('auth').signOut().then(function () {
          return _this.get('store').unloadAll();
        }).then(function () {
          return _this.transitionTo('sign-in');
        }).then(function () {
          _this.get('flashMessages').warning('You have been signed out.');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Are you sure you\'re signed-in?');
        });
      },

      error: function error(reason) {
        var unauthorized = reason.errors && reason.errors.some(function (error) {
          return error.status === '401';
        });

        if (unauthorized) {
          this.get('flashMessages').danger('You must be authenticated to access this page.');
          this.transitionTo('/sign-in');
        } else {
          this.get('flashMessages').danger('There was a problem. Please try again.');
        }

        return false;
      }
    }
  });
});
define('ga-wdi-boston.list-it/routes/change-password', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    auth: _ember['default'].inject.service(),
    flashMessages: _ember['default'].inject.service(),

    actions: {
      changePassword: function changePassword(passwords) {
        var _this = this;

        this.get('auth').changePassword(passwords).then(function () {
          return _this.get('auth').signOut();
        }).then(function () {
          return _this.transitionTo('sign-in');
        }).then(function () {
          _this.get('flashMessages').success('Successfully changed your password!');
        }).then(function () {
          _this.get('flashMessages').warning('You have been signed out.');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Please try again.');
        });
      }
    }
  });
});
define('ga-wdi-boston.list-it/routes/sign-in', ['exports', 'ember', 'rsvp'], function (exports, _ember, _rsvp) {
  exports['default'] = _ember['default'].Route.extend({
    auth: _ember['default'].inject.service(),
    flashMessages: _ember['default'].inject.service(),

    model: function model() {
      return _rsvp['default'].Promise.resolve({});
    },

    actions: {
      signIn: function signIn(credentials) {
        var _this = this;

        return this.get('auth').signIn(credentials).then(function () {
          return _this.transitionTo('application');
        }).then(function () {
          return _this.get('flashMessages').success('Thanks for signing in!');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Please try again.');
        });
      }
    }
  });
});
define('ga-wdi-boston.list-it/routes/sign-up', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    auth: _ember['default'].inject.service(),
    flashMessages: _ember['default'].inject.service(),

    actions: {
      signUp: function signUp(credentials) {
        var _this = this;

        this.get('auth').signUp(credentials).then(function () {
          return _this.get('auth').signIn(credentials);
        }).then(function () {
          return _this.transitionTo('application');
        }).then(function () {
          _this.get('flashMessages').success('Successfully signed-up! You have also been signed-in.');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Please try again.');
        });
      }
    }
  });
});
define('ga-wdi-boston.list-it/routes/users', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return this.get('store').findAll('user');
    }
  });
});
define('ga-wdi-boston.list-it/serializers/application', ['exports', 'active-model-adapter'], function (exports, _activeModelAdapter) {
  exports['default'] = _activeModelAdapter.ActiveModelSerializer.extend({});
});
define('ga-wdi-boston.list-it/services/ajax', ['exports', 'ember', 'ember-ajax/services/ajax', 'ga-wdi-boston.list-it/config/environment'], function (exports, _ember, _emberAjaxServicesAjax, _gaWdiBostonListItConfigEnvironment) {
  exports['default'] = _emberAjaxServicesAjax['default'].extend({
    host: _gaWdiBostonListItConfigEnvironment['default'].apiHost,

    auth: _ember['default'].inject.service(),
    headers: _ember['default'].computed('auth.credentials.token', {
      get: function get() {
        var headers = {};
        var token = this.get('auth.credentials.token');
        if (token) {
          headers.Authorization = 'Token token=' + token;
        }

        return headers;
      }
    })
  });
});
define('ga-wdi-boston.list-it/services/auth', ['exports', 'ember', 'ember-local-storage'], function (exports, _ember, _emberLocalStorage) {
  exports['default'] = _ember['default'].Service.extend({
    ajax: _ember['default'].inject.service(),
    credentials: (0, _emberLocalStorage.storageFor)('auth'),
    isAuthenticated: _ember['default'].computed.bool('credentials.token'),

    signUp: function signUp(credentials) {
      return this.get('ajax').post('/sign-up', {
        data: {
          credentials: {
            email: credentials.email,
            password: credentials.password,
            password_confirmation: credentials.passwordConfirmation
          }
        }
      });
    },

    signIn: function signIn(credentials) {
      var _this = this;

      return this.get('ajax').post('/sign-in', {
        data: {
          credentials: {
            email: credentials.email,
            password: credentials.password
          }
        }
      }).then(function (result) {
        _this.get('credentials').set('id', result.user.id);
        _this.get('credentials').set('email', result.user.email);
        _this.get('credentials').set('token', result.user.token);
      });
    },

    changePassword: function changePassword(passwords) {
      return this.get('ajax').patch('/change-password/' + this.get('credentials.id'), {
        data: {
          passwords: {
            old: passwords.previous,
            'new': passwords.next
          }
        }
      });
    },

    signOut: function signOut() {
      var _this2 = this;

      return this.get('ajax').del('/sign-out/' + this.get('credentials.id'))['finally'](function () {
        return _this2.get('credentials').reset();
      });
    }
  });
});
define('ga-wdi-boston.list-it/services/flash-messages', ['exports', 'ember-cli-flash/services/flash-messages'], function (exports, _emberCliFlashServicesFlashMessages) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFlashServicesFlashMessages['default'];
    }
  });
});
define('ga-wdi-boston.list-it/services/imgur', ['exports', 'ember-imgur/services/imgur'], function (exports, _emberImgurServicesImgur) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberImgurServicesImgur['default'];
    }
  });
});
define('ga-wdi-boston.list-it/storages/auth', ['exports', 'ember-local-storage/local/object'], function (exports, _emberLocalStorageLocalObject) {
  exports['default'] = _emberLocalStorageLocalObject['default'].extend({});
});
define("ga-wdi-boston.list-it/templates/apartment", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "FWZMr8ae", "block": "{\"statements\":[[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\" Apartment Listing\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"apartment/apartment-view\"],null,[[\"apartment\",\"deleteApartment\",\"seePhotos\"],[[\"get\",[\"model\"]],\"deleteApartment\",\"seePhotos\"]]],false],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"apartments\"],null,0],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\" Back \"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.list-it/templates/apartment.hbs" } });
});
define("ga-wdi-boston.list-it/templates/apartment/edit", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "rIDUcJYi", "block": "{\"statements\":[[\"append\",[\"helper\",[\"apartment/apartment-update-form\"],null,[[\"apartment\",\"editListing\"],[[\"get\",[\"model\"]],\"editListing\"]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.list-it/templates/apartment/edit.hbs" } });
});
define("ga-wdi-boston.list-it/templates/apartment/listing-photos", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "3PyQbGr/", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\",\"listingPhoto\"]]],null,1],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"apartment\",\"editable\"]]],null,0]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"append\",[\"helper\",[\"apartment/photo-upload\"],null,[[\"createListingPhoto\"],[\"createListingPhoto\"]]],false],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-4\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"apartment/photo-view\"],null,[[\"apartment\",\"listingPhoto\",\"deletePhoto\"],[[\"get\",[\"model\",\"apartment\"]],[\"get\",[\"listingPhoto\"]],\"deletePhoto\"]]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"listingPhoto\"]}],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.list-it/templates/apartment/listing-photos.hbs" } });
});
define("ga-wdi-boston.list-it/templates/apartments", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "6iMiNDSH", "block": "{\"statements\":[[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Apartments\"],[\"close-element\"],[\"text\",\"\\n\\n\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,0],[\"text\",\"\\n\"],[\"append\",[\"unknown\",[\"new-apartment-link\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"append\",[\"helper\",[\"apartments-list\"],null,[[\"apartment\",\"goToApartment\"],[[\"get\",[\"apartment\"]],\"goToApartment\"]]],false],[\"text\",\"\\n\"]],\"locals\":[\"apartment\"]}],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.list-it/templates/apartments.hbs" } });
});
define("ga-wdi-boston.list-it/templates/apartments/new", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "oNDP0yZh", "block": "{\"statements\":[[\"append\",[\"helper\",[\"apartment-create-new\"],null,[[\"createApartment\"],[\"createApartment\"]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.list-it/templates/apartments/new.hbs" } });
});
define("ga-wdi-boston.list-it/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "5xunmt3+", "block": "{\"statements\":[[\"append\",[\"helper\",[\"my-application\"],null,[[\"signOut\"],[\"signOut\"]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.list-it/templates/application.hbs" } });
});
define("ga-wdi-boston.list-it/templates/change-password", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Oh1mCyee", "block": "{\"statements\":[[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Change Password\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"change-password-form\"],null,[[\"submit\"],[\"changePassword\"]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.list-it/templates/change-password.hbs" } });
});
define("ga-wdi-boston.list-it/templates/components/apartment-create-new", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "DnQYeFfW", "block": "{\"statements\":[[\"open-element\",\"form\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"createApartment\"],[[\"on\"],[\"submit\"]]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"placeholder\",\"required\",\"value\"],[\"Address\",\"true\",[\"get\",[\"newApartment\",\"address\"]]]]],false],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"required\",\"placeholder\",\"value\"],[\"number\",\"true\",\"Rent\",[\"get\",[\"newApartment\",\"rent\"]]]]],false],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"required\",\"placeholder\",\"value\"],[\"number\",\"true\",\"Number of bedrooms\",[\"get\",[\"newApartment\",\"bedrooms\"]]]]],false],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"required\",\"placeholder\",\"value\"],[\"number\",\"true\",\"Number of bathrooms\",[\"get\",[\"newApartment\",\"bathrooms\"]]]]],false],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"textarea\"],null,[[\"class\",\"rows\",\"placeholder\",\"value\"],[\"form-control\",\"5\",\"Description\",[\"get\",[\"newApartment\",\"description\"]]]]],false],[\"text\",\"\\n  Pets are allowed \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"name\",\"checked\"],[\"checkbox\",\"Pets allowed?\",[\"get\",[\"newApartment\",\"petsAllowed\"]]]]],false],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"isAuthenticated\"]]],null,2,1],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"apartments\"],null,0],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\" Back \"]],\"locals\":[]},{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\" Please sign-in to create a listing!\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"flush-element\"],[\"text\",\" Save \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.list-it/templates/components/apartment-create-new.hbs" } });
});
define("ga-wdi-boston.list-it/templates/components/apartment/apartment-update-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "R8E+v068", "block": "{\"statements\":[[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\" Edit listing \"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"form\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"editListing\"],[[\"on\"],[\"submit\"]]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"placeholder\",\"required\",\"value\"],[\"Address\",\"true\",[\"get\",[\"apartment\",\"address\"]]]]],false],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"required\",\"placeholder\",\"value\"],[\"number\",\"true\",\"Rent\",[\"get\",[\"apartment\",\"rent\"]]]]],false],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"required\",\"placeholder\",\"value\"],[\"number\",\"true\",\"Number of bedrooms\",[\"get\",[\"apartment\",\"bedrooms\"]]]]],false],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"required\",\"placeholder\",\"value\"],[\"number\",\"true\",\"Number of bathrooms\",[\"get\",[\"apartment\",\"bathrooms\"]]]]],false],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"textarea\"],null,[[\"class\",\"rows\",\"placeholder\",\"value\"],[\"form-control\",\"5\",\"Description\",[\"get\",[\"apartment\",\"description\"]]]]],false],[\"text\",\"\\n    Pets are allowed \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"name\",\"checked\"],[\"checkbox\",\"Pets allowed?\",[\"get\",[\"apartment\",\"petsAllowed\"]]]]],false],[\"text\",\"\\n    \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"flush-element\"],[\"text\",\" save \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"apartment\",[\"get\",[\"apartment\"]]],null,0],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\" Back \"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.list-it/templates/components/apartment/apartment-update-form.hbs" } });
});
define("ga-wdi-boston.list-it/templates/components/apartment/apartment-view", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "dPQ13NkG", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"card text-center\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"h3\",[]],[\"static-attr\",\"class\",\"card-title\"],[\"flush-element\"],[\"text\",\" \"],[\"append\",[\"unknown\",[\"apartment\",\"address\"]],false],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"apartment\",\"rent\"]]],null,3],[\"open-element\",\"h5\",[]],[\"static-attr\",\"class\",\"card-title\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\" Bedrooms: \"],[\"close-element\"],[\"text\",\" \"],[\"append\",[\"unknown\",[\"apartment\",\"bedrooms\"]],false],[\"text\",\" \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\" Bathrooms: \"],[\"close-element\"],[\"text\",\" \"],[\"append\",[\"unknown\",[\"apartment\",\"bathrooms\"]],false],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"h5\",[]],[\"static-attr\",\"class\",\"card-title\"],[\"flush-element\"],[\"text\",\" \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"Pets allowed: \"],[\"close-element\"],[\"text\",\" \"],[\"append\",[\"unknown\",[\"apartment\",\"petsAllowed\"]],false],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"card text-left\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"card-text\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"apartment\",\"description\"]]],null,2],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n \"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"outlet\"],null,[[\"apartment\"],[[\"get\",[\"apartment\"]]]]],false],[\"text\",\"\\n\"],[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"seePhotos\"],[[\"apartment\"],[[\"get\",[\"apartment\"]]]]],[\"flush-element\"],[\"text\",\"See Photos\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"apartment\",\"editable\"]]],null,1]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\" Edit listing\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"link-to\"],[\"apartment/edit\",[\"get\",[\"apartment\"]]],null,0],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"deleteApartment\"],[[\"apartment\"],[[\"get\",[\"model\"]]]]],[\"flush-element\"],[\"text\",\"Delete listing\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\" Description: \"],[\"close-element\"],[\"text\",\" \"],[\"append\",[\"unknown\",[\"apartment\",\"description\"]],false],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"h4\",[]],[\"static-attr\",\"class\",\"card-title\"],[\"flush-element\"],[\"text\",\"Available for: \"],[\"append\",[\"helper\",[\"format-money\"],[[\"get\",[\"apartment\",\"rent\"]]],[[\"precision\"],[0]]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.list-it/templates/components/apartment/apartment-view.hbs" } });
});
define("ga-wdi-boston.list-it/templates/components/apartment/photo-upload", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "NqrOWqpX", "block": "{\"statements\":[[\"text\",\"\\n  \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"file\"],[\"static-attr\",\"name\",\"pic\"],[\"static-attr\",\"accept\",\"image/*\"],[\"dynamic-attr\",\"onchange\",[\"helper\",[\"action\"],[[\"get\",[null]],\"picSubmit\"],null],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.list-it/templates/components/apartment/photo-upload.hbs" } });
});
define("ga-wdi-boston.list-it/templates/components/apartment/photo-view", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "DeldjQQI", "block": "{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"listingPhoto\",\"url\"]]],null,2,1],[\"block\",[\"if\"],[[\"get\",[\"apartment\",\"editable\"]]],null,0]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"deletePhoto\"],[[\"listingPhoto\"],[[\"get\",[\"listingPhoto\"]]]]],[\"flush-element\"],[\"text\",\"Delete\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\" No Photos yet!\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"img\",[]],[\"static-attr\",\"class\",\"img-responsive\"],[\"dynamic-attr\",\"src\",[\"unknown\",[\"listingPhoto\",\"url\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.list-it/templates/components/apartment/photo-view.hbs" } });
});
define("ga-wdi-boston.list-it/templates/components/apartments-list", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "mjxGV4oh", "block": "{\"statements\":[[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"apartment-in-apartments-list\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"goToApartment\",[\"get\",[\"apartment\"]]]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"card text-center\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"h4\",[]],[\"static-attr\",\"class\",\"card-title\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"apartment\",\"address\"]],false],[\"close-element\"],[\"text\",\"\\n   \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"card-text\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"apartment\",\"description\"]],false],[\"close-element\"],[\"text\",\"\\n\\n \"],[\"close-element\"],[\"text\",\"\\n \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"list-group list-group-flush\"],[\"flush-element\"],[\"text\",\"\\n   \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"list-group-item text-center\"],[\"flush-element\"],[\"text\",\"\\n     Available for \"],[\"append\",[\"helper\",[\"format-money\"],[[\"get\",[\"apartment\",\"rent\"]]],[[\"precision\"],[0]]],false],[\"text\",\"\\n   \"],[\"close-element\"],[\"text\",\"\\n \"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.list-it/templates/components/apartments-list.hbs" } });
});
define("ga-wdi-boston.list-it/templates/components/change-password-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "xDRk8ugM", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"previous\"],[\"flush-element\"],[\"text\",\"Old Password\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"id\",\"placeholder\",\"value\"],[\"password\",\"form-control\",\"previous\",\"Old password\",[\"get\",[\"passwords\",\"previous\"]]]]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"next\"],[\"flush-element\"],[\"text\",\"New Password\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"id\",\"placeholder\",\"value\"],[\"password\",\"form-control\",\"next\",\"New password\",[\"get\",[\"passwords\",\"next\"]]]]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"btn btn-primary\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"submit\"]],[\"flush-element\"],[\"text\",\"\\n  Change Password\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-default\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"reset\"]],[\"flush-element\"],[\"text\",\"\\n  Cancel\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.list-it/templates/components/change-password-form.hbs" } });
});
define("ga-wdi-boston.list-it/templates/components/email-input", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "cObEIJuX", "block": "{\"statements\":[[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"email\"],[\"flush-element\"],[\"text\",\"Email\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"placeholder\",\"value\"],[\"email\",\"email\",\"Email\",[\"get\",[\"email\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.list-it/templates/components/email-input.hbs" } });
});
define("ga-wdi-boston.list-it/templates/components/formatted-number", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "HB6JaNOP", "block": "{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"displayErrors\"]]],null,0]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"append\",[\"unknown\",[\"errorMessage\"]],true],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.list-it/templates/components/formatted-number.hbs" } });
});
define("ga-wdi-boston.list-it/templates/components/hamburger-menu", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "cu42Gq/O", "block": "{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"sr-only\"],[\"flush-element\"],[\"text\",\"Toggle navigation\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.list-it/templates/components/hamburger-menu.hbs" } });
});
define("ga-wdi-boston.list-it/templates/components/my-application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "whWFgoSa", "block": "{\"statements\":[[\"open-element\",\"nav\",[]],[\"static-attr\",\"class\",\"navbar navbar-default\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container-fluid\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"append\",[\"unknown\",[\"navbar-header\"]],false],[\"text\",\"\\n\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"collapse navbar-collapse\"],[\"static-attr\",\"id\",\"navigation\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav navbar-nav\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"isAuthenticated\"]]],null,8],[\"text\",\"        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"apartments\"],null,6],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav navbar-nav navbar-right\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"isAuthenticated\"]]],null,5,3],[\"text\",\"      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"List it with List-It!\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"block\",[\"each\"],[[\"get\",[\"flashMessages\",\"queue\"]]],null,0],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-8 col-md-offset-2\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"append\",[\"helper\",[\"flash-message\"],null,[[\"flash\"],[[\"get\",[\"flash\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[\"flash\"]},{\"statements\":[[\"text\",\"Sign In\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Sign Up\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"sign-up\"],null,2],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"sign-in\"],null,1],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Change Password\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"change-password\"],null,4],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"signOut\"]],[\"flush-element\"],[\"text\",\"Sign Out\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"See apartment rentals\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Create A Listing\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"apartments/new\"],null,7],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.list-it/templates/components/my-application.hbs" } });
});
define("ga-wdi-boston.list-it/templates/components/navbar-header", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "flVo5YNB", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"hamburger-menu\"]],false],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"application\"],[[\"class\"],[\"navbar-brand\"]],0],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"Home\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.list-it/templates/components/navbar-header.hbs" } });
});
define("ga-wdi-boston.list-it/templates/components/new-apartment-link", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "NbV6+sft", "block": "{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"isAuthenticated\"]]],null,1]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"Create A Listing\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"link-to\"],[\"apartments/new\"],null,0],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.list-it/templates/components/new-apartment-link.hbs" } });
});
define("ga-wdi-boston.list-it/templates/components/password-confirmation-input", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "YUfw/b0H", "block": "{\"statements\":[[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"password-confirmation\"],[\"flush-element\"],[\"text\",\"Password Confirmation\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"placeholder\",\"value\"],[\"password\",\"password-confirmation\",\"Password Confirmation\",[\"get\",[\"password\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.list-it/templates/components/password-confirmation-input.hbs" } });
});
define("ga-wdi-boston.list-it/templates/components/password-input", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "+TScILou", "block": "{\"statements\":[[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"kind\"],[\"flush-element\"],[\"text\",\"Password\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"placeholder\",\"value\"],[\"password\",\"password\",\"Password\",[\"get\",[\"password\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.list-it/templates/components/password-input.hbs" } });
});
define("ga-wdi-boston.list-it/templates/components/sign-in-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "eSqCAFRL", "block": "{\"statements\":[[\"append\",[\"helper\",[\"email-input\"],null,[[\"email\"],[[\"get\",[\"credentials\",\"email\"]]]]],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"password-input\"],null,[[\"password\"],[[\"get\",[\"credentials\",\"password\"]]]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"btn btn-primary\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"submit\"]],[\"flush-element\"],[\"text\",\"\\n  Sign In\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-default\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"reset\"]],[\"flush-element\"],[\"text\",\"\\n  Cancel\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.list-it/templates/components/sign-in-form.hbs" } });
});
define("ga-wdi-boston.list-it/templates/components/sign-up-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "fpNgW5un", "block": "{\"statements\":[[\"append\",[\"helper\",[\"email-input\"],null,[[\"email\"],[[\"get\",[\"credentials\",\"email\"]]]]],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"password-input\"],null,[[\"password\"],[[\"get\",[\"credentials\",\"password\"]]]]],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"password-confirmation-input\"],null,[[\"password\"],[[\"get\",[\"credentials\",\"passwordConfirmation\"]]]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"btn btn-primary\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"submit\"]],[\"flush-element\"],[\"text\",\"\\n  Sign Up\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-default\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"reset\"]],[\"flush-element\"],[\"text\",\"\\n  Cancel\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.list-it/templates/components/sign-up-form.hbs" } });
});
define("ga-wdi-boston.list-it/templates/sign-in", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "h/nhqlb7", "block": "{\"statements\":[[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Sign In\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"sign-in-form\"],null,[[\"submit\",\"reset\",\"credentials\"],[\"signIn\",\"reset\",[\"get\",[\"model\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.list-it/templates/sign-in.hbs" } });
});
define("ga-wdi-boston.list-it/templates/sign-up", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "72Fp6PFQ", "block": "{\"statements\":[[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Sign Up\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"sign-up-form\"],null,[[\"submit\"],[\"signUp\"]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.list-it/templates/sign-up.hbs" } });
});
define("ga-wdi-boston.list-it/templates/users", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "pd0zDVut", "block": "{\"statements\":[[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Users\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,0],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"user\",\"email\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"user\"]}],\"hasPartials\":false}", "meta": { "moduleName": "ga-wdi-boston.list-it/templates/users.hbs" } });
});
define('ga-wdi-boston.list-it/transforms/file', ['exports', 'ember', 'ember-data', 'ga-wdi-boston.list-it/config/environment'], function (exports, _ember, _emberData, _gaWdiBostonListItConfigEnvironment) {
  var isEmpty = _ember['default'].isEmpty;
  var assign = _ember['default'].assign;
  var getOwner = _ember['default'].getOwner;
  var Transform = _emberData['default'].Transform;

  /**
   * A file transform for Ember-Data.
   *
   * The will enable files to be used as an Ember Data attribute:
   *
   * ```javascript
   * // app/models/product.js
   * import Model from 'ember-data/model';
   * import attr from 'ember-data/attr';
   *
   * export default Model.extend({
   *   photo: attr('file')
   * })
   * ```
   *
   * @module app/transforms/file
   * @private
   */
  exports['default'] = Transform.extend({
    /**
     * Deserialize file json to a file object
     *
     * @public
     */
    deserialize: function deserialize(serialized, attributeMeta) {
      var File = getOwner(this).factoryFor('object:file');

      return File.create(assign({}, serialized, _gaWdiBostonListItConfigEnvironment['default'].paperclip, attributeMeta, {
        isNew: isEmpty(serialized),
        isEmpty: isEmpty(serialized),
        attributes: Object.keys(serialized || {})
      }));
    },

    /**
     * Serialize a file object to json
     *
     * @public
     */
    serialize: function serialize(deserialized) {
      return deserialized.serialize();
    }
  });
});


define('ga-wdi-boston.list-it/config/environment', [], function() {
  var prefix = 'ga-wdi-boston.list-it';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("ga-wdi-boston.list-it/app")["default"].create({"name":"ga-wdi-boston.list-it","version":"0.0.0+5bf6b856"});
}
//# sourceMappingURL=ga-wdi-boston.list-it.map
