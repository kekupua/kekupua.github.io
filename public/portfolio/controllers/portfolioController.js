kekupua.controller('PortfolioController', ['$scope', function($scope){
  $scope.projectList = [
    {
      projectName: "Hearthstone Cards",
      description: "A handy tool for viewing collectable Hearthstone cards",
      state: "hearthstone"
    },
    {
      projectName: "Personal Life",
      description: "A recap of some personal moments",
      state: "personal"
    }
  ]

}])
