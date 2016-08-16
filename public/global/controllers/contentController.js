kekupua.controller('ContentController', ['$scope', '$mdDialog', 'globalService' , function($scope, $mdDialog, globalService){
  $scope.allCards = [];
  $scope.status = null;

  $scope.loadCards = function(){
    globalService.getCards(null, function(response){
      $scope.allCards = response;
      $scope.chunkedCards = $scope.chunk($scope.allCards['Whispers of the Old Gods'], 8);
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
    alert = $mdDialog.alert()
      .title(flavorText)
      .ok('Close');
    $mdDialog
        .show( alert )
        .finally(function() {
          alert = undefined;
        });
  }

  $scope.loadCards();

}]);
