kekupua.factory('globalService', function($http){
  var getCards = function(parameters, callback){
    var config = {
      headers: {
        "X-Mashape-Authorization" : "6YdwHuHc8lmshKhC5pDFaaR1rZtQp11TQj9jsnEpV5IqezCqL7"
      },
      params:{
        'collectible' : '1'
      }
    }
    return $http.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards", config).then(
      function(response){
        callback(response.data);
      },
      function(error){
        console.log(error);
        callback(error);
      }
    );
  }


  return{
    getCards : getCards
  }
});
