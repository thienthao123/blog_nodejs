app.controller('postCtrl', ['$scope','socket','Notification','$mdDialog', function ($scope,socket,Notification,$mdDialog) {
		socket.on('err',function(msg) {
			 Notification.error({message: msg, delay: 7000});
		})

		socket.on('postList',function(posts) {
			console.log(posts)
			$scope.posts = posts
		})

		$scope.search = function(key){
			socket.emit('postSearch',key)
		}

		$scope.btn_del = function(post) {
		    $mdDialog.show({
		      controller: DelController,
		      templateUrl: '/app/html/postDel.html',
		      parent: angular.element(document.body),
		      clickOutsideToClose:true
		    })
		    function DelController($scope, $mdDialog,socket) {
		    $scope.post = post
		    $scope.hide = function() {
		      $mdDialog.hide();
		    };

		    $scope.cancel = function() {
		      $mdDialog.cancel();
		    };

		    $scope.del = function(id){
		         socket.emit('postDel',id)
		         $mdDialog.cancel();
		    }
		  }
  };

		socket.on('done',function(msg){
			Notification.success({message: msg, delay: 5000});
			socket.emit('postList',1)
		})
}])