var mainApp = angular.module('mainApp', ['ionic', 'firebase']);

var config = {
    apiKey: "AIzaSyCg3zxVD2ykqAhypLZe7rZ4ZjtfnnpEL_k",
    authDomain: "project--6603901669083249275.firebaseapp.com",
    databaseURL: "https://project--6603901669083249275.firebaseio.com",
    storageBucket: "project--6603901669083249275.appspot.com",
    messagingSenderId: "924207543766"
};
firebase.initializeApp(config);

var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/plus.login');



mainApp.controller('googleCtrl', ['$scope', '$firebaseAuth', 'dataShare',
     function ($scope, $firebaseAuth, dataShare) {
         $scope.login = function () {
             firebase.auth().signInWithPopup(provider).then(function (result) {
                 $scope.email = result.user.providerData[0].email;
                 $scope.$apply();
                 dataShare.sendData($scope.email);
             }).catch(function (error) {

                 var errorCode = error.code;
                 var errorMessage = error.message;
                 var email = error.email;
                 var credential = error.credential;
                 $scope.error = errorMessage;
                 $scope.$apply();
                 dataShare.sendData($scope.error);
             });

         };

     }
]);


mainApp.controller('googleCtrl2', ['$scope', 'dataShare',
    function ($scope, dataShare) {
        $scope.text = '';
        $scope.$on('data_shared', function () {
            var text = dataShare.getData();
            console.log(text);
            $scope.text = text;
            $scope.$apply();
        });
    }
]);
mainApp.factory('dataShare', function ($rootScope) {
    var service = {};
    service.data = false;
    service.sendData = function (data) {
        console.log(data);
        this.data = data;
        $rootScope.$broadcast('data_shared');
    };
    service.getData = function () {
        return this.data;
    };
    return service;
});