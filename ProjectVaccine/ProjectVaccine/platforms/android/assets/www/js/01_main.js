var mainApp = angular.module("mainApp", ["ionic", "firebase"]);

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



mainApp.controller("googleCtrl", ["$scope", "$firebaseAuth",
     function ($scope, $firebaseAuth, myservice) {
         $scope.login = function () {
             firebase.auth().signInWithPopup(provider).then(function (result) {
                 $scope.user = result.user.providerData[0].email;
                 $scope.$apply();
             }).catch(function (error) {
                 // Handle Errors here.
                 var errorCode = error.code;
                 var errorMessage = error.message;
                 // The email of the user's account used.
                 var email = error.email;
                 // The firebase.auth.AuthCredential type that was used.
                 var credential = error.credential;
                 // ...
             });

         }

     }
]);