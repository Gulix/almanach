define(['knockout', 'lodash', 'viewmodels/itemsQty', 'data/load-data'],
   function(ko, _, ItemsQty, Data) {
  /**
   * ViewModel for the global engine of Almanach
   */
  function almanachVM() {
    var self = this;

    // Steps of the App
    // 0 - Selection of the kind of data (Identities, Locations, ...)
    //     Passed if there is only one kind of data or if type of data is passed through url
    // 1 - Tags & Configuration
    //     List of tags "only with that tag" / "not with that tag"
    //     Also the selection of number of items (4 / 6 / 8 / 10 / 12 / 20 / 100)
    //     The data can be passed via url
    // 2 - Display of the Elements
    self.currentStep = ko.observable(0);

    // Categories of data
    self.listCategories = ko.observableArray([]);
    self.selectedCategory = ko.observable(null);

    // Tags
    self.listTags = ko.observableArray([]);
    self.selectedTagsNeeded = ko.observableArray([]);
    self.selectedTagsExcluded = ko.observableArray([]);

    // Number of items
    self.listItemsQty = ko.observableArray([]);
    self.itemsQty = ko.observable(null);

    self.items = ko.observableArray([]);

    /*******************/
    /**** Functions ****/
    /*******************/
    self.getConfigFromUrl = function() {

    }
    self.initializeConfig = function() {
      // Lists initialization
      self.listItemsQty(ItemsQty.getCommonQties(self.selectQty));

      // Step 0 with only one category (or none) => jump to Step 1
      if ((self.currentStep() == 0) && (self.listCategories().length <= 1)) {
        self.currentStep(1);
        if (self.listCategories().length == 1) {
          self.selectedCategory(self.listCategories()[0]);
        }
      }
    }

    /* Qty of elements generated */
    self.selectQty = function(element) {
      self.itemsQty(element);
      self.currentStep(2);

      self.items(self.getItems('identities', self.itemsQty().nbItemsGenerated));
    }
    self.getItems = function(sCategory, nbItems) {
      var list = [ ];
      // Collecting all data items
      _.forEach(Data.getAllData(), function(dataCollection) {
        if (dataCollection.category == sCategory) {
          _.forEach(dataCollection.data, function(dataItem) {
            list.push(dataItem);
          });
        }
      });

      // Get X random items
      var shuffledList = _.shuffle(list);

      return _.take(shuffledList, nbItems);
    }

    /********************************/
    /*** Initialization of object ***/
    /********************************/
    self.initializeConfig();
    self.getConfigFromUrl();

  }

  return {
    createAlmanach: function() { return new almanachVM(); }
  }
});
