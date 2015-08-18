$(document).ready(function(){


  function Model(name, path, templateSelector){
    var template = $(templateSelector)
    var object = {
        name: name,
        path: path,
        template: templateSelector,
        fields: (function(){
          var matches = template.html().match(/{{{[^}]*(?=}}})/g), match, m, output = {};
          for(m = 0; m < matches.length; m++){
            match = matches[m].substring(3).split(".");
            if(match[0] == name){
              output[match[1]] = true;
            }
          }
          return output;
        }.call())
    }
    return object;
  }
  Model.prototype = {
    query: function (method, url, data){
      return $.ajax({
        method: method,
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json"
      });
    }
  }

  var Artist = new Model("artist", "/artists", ".artist");
  var Song = new Model("song", "/songs", ".song");
  console.dir([Artist, Song]);

});
