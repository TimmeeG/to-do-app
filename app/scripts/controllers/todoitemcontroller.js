'use strict';

/**
 * @ngdoc function
 * @name todoApp.controller:TodoitemcontrollerCtrl
 * @description
 * # TodoitemcontrollerCtrl
 * Controller of the todoApp
 */
angular.module('todoApp')
  .controller('ToDoItemCtrl', function ($scope) {
    debugger
    $scope.toggleComplete = function(item) {
      item.completed = !item.completed;
    };

    $scope.remove = function(item) {
      $scope.toDoList = $scope.toDoList.filter(i => i !== item);
    };

    $scope.getBackgroundColor = function(item) {
      if (item.completed) return 'completed';
      if (new Date(item.due) < $scope.currentDate) return 'overdue';
    }
  });
