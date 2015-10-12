angular
  .module('socially')
  .controller('PartiesListCtrl', ['$scope','$meteor', function ($scope, $meteor){

    $scope.page = 1;
    $scope.perPage = 3;
    $scope.sort = {name: 1};
    $scope.orderProperty = '1';

    //$scope.parties = $meteor.collection(Parties);
    //$scope.parties = $meteor.collection(Parties).subscribe("parties");

    $scope.parties = $meteor.collection(function(){
      return Parties.find({},{
        sort: $scope.getReactively('sort')
      });
    });

    $meteor.autorun($scope, function(){
      //$scope.parties = $meteor.collection('parties');
      $meteor.subscribe("parties",{
        limit: parseInt($scope.getReactively('perPage')),
        skip: parseInt($scope.getReactively('page') -1) * parseInt($scope.getReactively('perPage')),
        sort: $scope.getReactively('sort')
     }, $scope.getReactively('search')).then(function() {
        $scope.partiesCount = $meteor.object(Counts ,'numberOfParties', false);
      });
    });


    $scope.remove = function(party){
      if (confirm("En realidad desea borrar: " + party.name + "?")){
        $scope.parties.remove(party);
      }
    };

    $scope.removeAll = function(){
      if (confirm("En realidad desea borrar todas las fiestas?")){
        $scope.parties.remove();
      }
    };

    $scope.pageChanged = function(newPage) {
     $scope.page = newPage;
   };

    $scope.$watch('orderProperty', function(){
      if($scope.orderProperty)
        $scope.sort = {name: parseInt($scope.orderProperty)};
    });


  }]);
