app.controller('ouoCtrl', ['$scope','$mdDialog', function ($scope,$mdDialog) {
		 $scope.btn_ouo = function() {
    $mdDialog.show({
      controller: ouoController,
      templateUrl: '/app/html/ouo.html',
      parent: angular.element(document.body),
      clickOutsideToClose:true
    })
  };

  function ouoController($scope, $mdDialog,socket) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };

    $scope.rutgon = function (){
    	var url = $scope.input 
      socket.emit('ouo',url)
      socket.on('outputOUO',function(url) {
        $scope.output = url
      })
    }
  }

}])