var mainApp = angular.module('mainApp', ['ionic', 'ngRoute', 'firebase']);

mainApp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
          url: "/app",
          abstract: true,
          templateUrl: "menu.html"
      })

      .state('app.home', {
          url: '/02_home',
          views: {
              'menuContent': {
                  templateUrl: "02_home.html",
                  controller: 'homeController'
              }
          }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
});

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

        $scope.logout = function () {
            firebase.auth().signOut().then(function () {

                window.location = "01_main.html"

            }, function (error) {
                // An error happened.
            });
        };
    }
]);

