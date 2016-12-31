kekupua.config(function($stateProvider, $urlRouterProvider) {
  // For any unmatched url, redirect to /
  $urlRouterProvider.otherwise("/");
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "public/portfolio/views/portfolio.html"
    })
    .state('hearthstone', {
      url: "/hearthstoneCards",
      templateUrl: "public/hearthstone/views/hearthstone.html"
    })
    // .state('profile', {
    //   url: "/profile",
    //   templateUrl: "public/personal/views/personal.html"
    // });
});
