require.config({
    paths: {
        'jQuery': 'vendors/jquery-3.0.0.min',
        'knockout': 'vendors/knockout-3.4.0',
        'lodash': 'vendors/lodash'
    },
    shim: {
        'jQuery': {
            exports: '$'
        }
    }
});

require(['knockout',
         'viewmodels/almanachVM',
         'domReady!'
       ], function(ko, Almanach){

  //components.register();
  var viewModel = Almanach.createAlmanach();
  ko.applyBindings(viewModel);
});
