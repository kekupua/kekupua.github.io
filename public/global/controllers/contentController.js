kekupua.controller('ContentController', ['$scope', '$mdDialog', 'globalService' , function($scope, $mdDialog, globalService){
  $scope.allCards = [];
  $scope.currentExpansion = 'Karazhan';
  $scope.cardSet = 'Karazhan';
  $scope.status = null;

  $scope.expansions = {
    "Basic": 0,
    "Blackrock Mountain": 1,
    "Classic": 2,
    "Goblins vs Gnomes": 5,
    "Karazhan": 7,
    "Naxxramas": 9,
    "The Grand Tournament": 14,
    "The League of Explorers": 15,
    "Whispers of the Old Gods": 16,
  }

  $scope.loadCards = function(cardSet){
    if(cardSet == null) return;
    if(cardSet == $scope.currentExpansion && $scope.status == 1) return;
    $scope.currentExpansion = cardSet;
    $scope.status = null;
    globalService.getCards(null, function(response){
      $scope.allCards = response;
      $scope.chunkedCards = $scope.chunk($scope.allCards[cardSet], 6);
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

  $scope.loadCards('Karazhan');

}]);
