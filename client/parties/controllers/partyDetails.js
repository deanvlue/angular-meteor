angular
  .module("socially")
  .controller('PartyDetailsCtrl',['$scope','$stateParams', '$meteor', function ($scope, $stateParams, $meteor){
    //$scope.party = $meteor.object(Parties, $stateParams.partyId).subscribe('parties');
    $scope.party = $meteor.object(Parties, $stateParams.partyId);
    $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');
    $scope.$meteorSubscribe('parties');

    $scope.save = function(){
      $scope.party.save();
    };

    $scope.reset = function(){
      $scope.party.reset();
    };

  }]);
