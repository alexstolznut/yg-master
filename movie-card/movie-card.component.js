'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
module('movieCard').
component('movieCard', {
    templateUrl: "movie-card/movie-card.component.html",
    controller: ['$http', function MovieCardController($http) {
            var self = this;

            $http.get('data/movies.json').then(function (response) {
                self.movies = response.data;
            });
    }
 ]
});
