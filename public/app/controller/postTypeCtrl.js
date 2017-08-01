app.controller('postTypeCtrl', ['$scope','socket','Notification','$mdDialog', function ($scope,socket,Notification,$mdDialog) {
		$scope.formAdd = true
		$scope.btn_add = function(){
			$scope.formAdd = false
		}
		$scope.typeAdd = function(){
			socket.emit('typeAdd',$scope.type)
		}

		socket.on('err',function(err) {
			 Notification.error({message: err, delay: 4000});
		})

		socket.on('done',function(data){
			Notification.success({message: data, delay: 4000});
			$scope.formAdd = true
		})
		socket.on('Typelist',function(data) { 
				$scope.types = data
		})

	$scope.btn_edit = function(type) {
    $mdDialog.show({
      controller: TypeEditController,
      templateUrl: '/app/html/typeEdit.html',
      parent: angular.element(document.body),
      clickOutsideToClose:true
    })
    function TypeEditController($scope, $mdDialog,socket) {
  	$scope.typeEdit = type
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.edit = function(type){
          socket.emit('typeEdit',type)
          $mdDialog.cancel();
    }
  }
  };

  $scope.btn_del = function(type) {
    $mdDialog.show({
      controller: TypeDelController,
      templateUrl: '/app/html/typeDel.html',
      parent: angular.element(document.body),
      clickOutsideToClose:true
    })
    function TypeDelController($scope, $mdDialog,socket) {
    $scope.type = type
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.del = function(id){
         socket.emit('typeDel',id)
         $mdDialog.cancel();
    }
  }
  };



}])