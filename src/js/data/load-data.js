define(['json!data/data01.json', 'json!data/data02.json'],

function(data1, data2) {
  return {
    getAllData: function() {
      var list = [ ];
      list.push(data1);
      list.push(data2);
      return list;
    }
  };
});
