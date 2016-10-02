kekupua.controller('ContentController', ['$scope', '$mdDialog', '$state', 'globalService' , function($scope, $mdDialog, $state, globalService){
  $scope.navItems = [
    {
      title: "test",
      link: "home"
    },
    {
      title: "Hearthstone Cards",
      link: "hearthstone"
    }
  ]
  console.log($state);


}]);
