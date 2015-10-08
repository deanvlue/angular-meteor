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

  }]);
