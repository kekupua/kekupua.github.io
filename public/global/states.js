kekupua.config(function($stateProvider, $urlRouterProvider) {
  // For any unmatched url, redirect to /
  $urlRouterProvider.otherwise("/test");
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "public/global/views/home.html",
      controller: "ContentController"
    })
    .state('test', {
      url: "/test",
      templateUrl: "public/global/views/test.html"
    })
    .state('state2.list', {
      url: "/list",
      templateUrl: "partials/state2.list.html"
    });
});
