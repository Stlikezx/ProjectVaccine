var mainApp = angular.module('mainApp', ['ionic', 'ngRoute', 'firebase']);

mainApp.config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
    $routeProvider
		.when("/", {
		    templateUrl: "01_main.html",
		    controller: "googleCtrl"
		})
		.when("/home", {
		    templateUrl: "02_home.html",
		    controller: "googleCtrl2"
		})
    // .otherwise({ redirectTo: '/'})
    ;
}]);

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



mainApp.controller('googleCtrl', ['$scope', '$firebaseAuth', '$location',
     function ($scope, $firebaseAuth, $location) {
         $scope.login = function () {
             
                 firebase.auth().signInWithPopup(provider).then(function (result) {
                     var name = result.user.providerData[0].displayName;
                     var photoUrl = result.user.providerData[0].photoURL
                     console.log(result.user.providerData[0]);
                     $scope.$apply();
                     window.localStorage.setItem("name", name);
                     window.localStorage.setItem("photoURL", photoUrl);
                     window.location = "02_home.html"
                 }).catch(function (error) {

                     var errorCode = error.code;
                     var errorMessage = error.message;
                     var email = error.email;
                     var credential = error.credential;
                 });

             };

     }
]);


mainApp.controller('googleCtrl2', ['$scope',
    function ($scope) {
        $scope.name = window.localStorage.getItem("name");
        $scope.photo = window.localStorage.getItem("photoURL");
    }
]);

