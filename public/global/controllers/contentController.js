kekupua.controller('ContentController', ['$scope', 'globalService' , function($scope, globalService){
  $scope.allCards = [];

  $scope.loadCards = function(){
    $scope.allCards = globalService.getCards();
  }

  console.log("Hello");
  $scope.loadCards();

}]);
