'use strict';

/**
 * @ngdoc function
 * @name todoApp.controller:TodoitemcontrollerCtrl
 * @description
 * # TodoitemcontrollerCtrl
 * Controller of the todoApp
 */
angular.module('todoApp')
  .controller('ToDoItemCtrl', function ($scope, localStorageService) {
    $scope.localStorageService = localStorageService;
    $scope.currentDate = new Date();

    $scope.toggleComplete = function(item) {
      item.completed = !item.completed;
      $scope.localStorageService.set(item.key, item)
    };

    $scope.remove = function(item) {
      $scope.localStorageService.remove(item.key);
    };

    $scope.getBackgroundColor = function(item) {
      if (item.completed) return 'completed';
      if (new Date(item.due) < $scope.currentDate) return 'overdue';
    }
  });
