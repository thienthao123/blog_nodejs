app.controller('homeCtrl', ['$scope','socket','Notification', function ($scope,socket,Notification) {
		socket.on('done',function(msg){
			Notification.success({message: msg, delay: 5000});
			socket.emit('postList',1)
		})
}])