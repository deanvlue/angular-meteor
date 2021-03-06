angular
  .module('socially')
  .run(['$rootScope','$state', function($rootScope, $state){
    $rootScope.$on('$stateChangeError',function(event, toStatem, toParams, fromState, fromParams, error){
      //Cachamos el error cuando $requiredUser es rechazado
      if (error === 'AUTH_REQUIRED'){
        $state.go('parties');
      }
    });
  }]);

angular
  .module('socially')
  .config(['$urlRouterProvider','$stateProvider','$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider){

      $locationProvider.html5Mode(true);

      $stateProvider
        .state('parties',{
          url: '/parties',
          templateUrl: 'client/parties/views/parties-list.ng.html',
          controller:'PartiesListCtrl'
        })
        .state('partyDetails',{
          url: '/parties/:partyId',
          templateUrl: 'client/parties/views/party-details.ng.html',
          controller:'PartyDetailsCtrl',
          resolve:{
            "currentUser":["$meteor", function($meteor){
              return $meteor.requireUser();
            }]
          }
        });


      $urlRouterProvider.otherwise("/parties");
    }]);
