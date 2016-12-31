kekupua.controller('PersonalController', ['$scope', function($scope){
  $scope.bioImage = 'public/resources/images/profilePicture.jpg';
  $scope.bioAddress = '1134 Luawai Place Honolulu, HI, 96816';
  $scope.bioEmail = 'seteramae@gmail.com';
  $scope.bioPhone = '(808)-226-4145';

  $scope.carouselImages = [
    {src: 'public/resources/images/instagram.jpg'},
    {src: 'public/resources/images/datahouseVolunteer.JPG'},
    {src: 'public/resources/images/withKoffing.jpg'},
    {src: 'public/resources/images/withTerry.jpg'}
  ];

}]);
