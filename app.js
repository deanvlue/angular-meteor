Parties = new Mongo.Collection("parties");


if (Meteor.isClient){

  angular.module('socially', ['angular-meteor','ui.router']);

  angular
    .module('socially')
    .config(['$urlRouterProvider','$stateProvider','$locationProvider',
      function($urlRouterProvider, $stateProvider, $locationProvider){

        $locationProvider.html5Mode(true);

        $stateProvider
          .state('parties',{
            url: '/parties',
            templateUrl: 'parties-list.ng.html',
            controller:'PartiesListCtrl'
          })
          .state('partyDetails',{
            url: '/parties/:partyId',
            templateUrl: 'party-details.ng.html',
            controller:'PartyDetailsCtrl'
          });


        $urlRouterProvider.otherwise("/parties");
      }]);


  angular
    .module('socially')
    .controller('PartiesListCtrl', ['$scope','$meteor', function ($scope, $meteor){

      $scope.parties = $meteor.collection(Parties);

      $scope.remove = function(party){
        if (confirm("En realidad desea borrar: " + party.name + "?")){
          $scope.parties.remove(party);
        }
      }

      $scope.removeAll = function(){
        if (confirm("En realidad desea borrar todas las fiestas?")){
          $scope.parties.remove();
        }
      }

    }])
    .controller('PartyDetailsCtrl',['$scope','$stateParams', '$meteor', function ($scope, $stateParams, $meteor){
      $scope.party = $meteor.object(Parties, $stateParams.partyId, false);

      $scope.save = function(){
        $scope.party.save();
      };

      $scope.reset = function(){
        $scope.party.reset();
      };

    }]);
}

if (Meteor.isServer){
  Meteor.startup(function(){
    if (Parties.find().count() === 0){
      var parties = [
        {
          'name': 'Dubstep-Free Zone A',
          'description': 'Stop the dubstep for just one moment'
        },
        {
          'name': 'All dubstep all the time',
          'description': 'Puros drops de dusbtep all day long'
        },
        {
          'name': 'Savage lounging',
          'description': 'Desde esquivel hasta emmanuel'
        }
      ];

      for (var i = 0; i < parties.length; i++){
        Parties.insert(parties[i]);
      }
    }
  });
}
