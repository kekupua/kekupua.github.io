kekupua.controller('ContentController', ['$scope', 'globalService' , function($scope, globalService){
  $scope.allCards = [];

  $scope.loadCards = function(){
    globalService.getCards(null, function(response){
      $scope.allCards = response;
      console.log($scope.allCards['Basic']);
    });
  }

  $scope.loadCards();

}]);
