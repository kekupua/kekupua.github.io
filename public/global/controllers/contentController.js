kekupua.controller('ContentController', ['$scope', 'globalService' , function($scope, globalService){
  $scope.allCards = [];
  $scope.status = null;

  $scope.loadCards = function(){
    globalService.getCards(null, function(response){
      $scope.allCards = response;
      $scope.chunkedCards = $scope.chunk($scope.allCards['Basic'], 8);
      $scope.status = 1;
    });
  }

  $scope.chunk = function(arr, size) {
    var newArr = [];
    for (var i=0; i<arr.length; i+=size) {
      newArr.push(arr.slice(i, i+size));
    }
    return newArr;
  }

  $scope.displayFlavor = function(flavorText){
    if(!flavorText){
      return;
    }
    alert(flavorText);
  }

  $scope.loadCards();

}]);
