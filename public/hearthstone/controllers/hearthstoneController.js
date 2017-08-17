kekupua.controller('HearthstoneController', ['$scope', '$mdDialog', 'globalService', function($scope, $mdDialog, globalService){
  $scope.allCards = [];
  $scope.currentExpansion = "Knights of the Frozen Throne";
  $scope.cardSet = $scope.currentExpansion;
  $scope.cardsPerRow = 5;
  $scope.queryStatus = null;

  $scope.expansions = {
    "Basic": 0,
    "Blackrock Mountain": 1,
    "Classic": 2,
    "Goblins vs Gnomes": 5,
    "Journey to Un'Goro" : 8,
    "Knights of the Frozen Throne" : 9,
    "Mean Streets of Gadgetzan": 10,
    "Naxxramas": 12,
    "One Night in Karazhan" : 13,
    "The Grand Tournament": 17,
    "The League of Explorers": 18,
    "Whispers of the Old Gods": 19
  };

  $scope.loadCards = function(cardSet){
    if(cardSet == null) return;
    if(cardSet == $scope.currentExpansion && $scope.queryStatus == 1) return;
    $scope.currentExpansion = cardSet;
    $scope.queryStatus = null;
    globalService.getCards(null, function(response){
      $scope.allCards = response;
      console.log($scope.allCards);
      $scope.chunkedCards = $scope.chunk($scope.allCards[cardSet], $scope.cardsPerRow);
      $scope.queryStatus = 1;
    });
  };

  $scope.chunk = function(arr, size) {
    var newArr = [];
    for (var i=0; i<arr.length; i+=size) {
      newArr.push(arr.slice(i, i+size));
    }
    return newArr;
  };

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
  };

  $scope.loadCards($scope.currentExpansion);

}]);
