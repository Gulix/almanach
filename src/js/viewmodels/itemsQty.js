define(['knockout', 'lodash'],
   function(ko, _) {
  /**
   * Number of items to be generated. Provides the number, the text and description of the choice
   */
  function itemsQty(nbItems, text, description, fnSelection) {
    var self = this;

    self.nbItemsGenerated = nbItems;
    self.text = text;
    self.description = description;
    self.fnSelection = fnSelection;

    self.selectItem = function() {
      if (self.fnSelection != null) {
        self.fnSelection(self);
      }
    }
  }

  return {
    getCommonQties: function(fnSelection) {
      var list = [];
      list.push(new itemsQty(4, "4", "4 items", fnSelection));
      list.push(new itemsQty(6, "6", "6 items", fnSelection));
      list.push(new itemsQty(8, "8", "8 items", fnSelection));
      list.push(new itemsQty(10, "10", "10 items", fnSelection));
      list.push(new itemsQty(12, "12", "12 items", fnSelection));
      list.push(new itemsQty(20, "20", "20 items", fnSelection));
      list.push(new itemsQty(100, "100", "100 items", fnSelection));
      return list;
    }
  }
});
