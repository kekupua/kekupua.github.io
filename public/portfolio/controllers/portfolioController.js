kekupua.controller('PortfolioController', ['$scope', function($scope){
  $scope.projectList = [
    {
      projectName: "Hearthstone Cards",
      description: "A handy tool for viewing collectable Hearthstone cards",
      state: "hearthstone"
    },
    {
        projectName: "Blizzard Game Design Portfolio",
        description: "Portfolio for game design application",
        state: "gameDesign"
    }
    // {
    //   projectName: "About",
    //   description: "A recap of some personal moment",
    //   state: "profile"
    // }
  ]

}]);
