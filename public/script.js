$(document).ready(function(){

  function db(method, url, data){
    return $.ajax({
      method: method,
      url: url,
      data: JSON.stringify(data),
      contentType: "application/json"
    });
  }

  function Artist(params){
    if(params) this.data = params;

  }
  Artist.prototype = function(){
    var self = this;
    var template = $(".artist").detach();
    return {
      template: template,
      fields: (function(){
        var matches = template.html().match(/{{{[^}]*(?=}}})/g), match, m;
        for(m = 0; m < matches.length; m++){
          matches[m] = matches[m].substring(3).split(".");
        }
      }())
    }
  }()

  console.log(new Artist().fields);

  function Song(params){

  }
  Song.prototype = function(){
    var template = Artist.prototype.template.find(".song");
    return {
      template: template
    }
  }()

});
