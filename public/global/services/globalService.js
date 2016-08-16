kekupua.factory('globalService', function($http){
  var getCards = function(){
    return $http.get('public/resources/cards.json').then(
      function(response){
        console.log(response);
        return response.data;
      },
      function(error){
        console.log(error);
        return error;
      }
    );
  }


  return{
    getCards : getCards
  }
});
