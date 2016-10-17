'use strict';

/**
 * @ngdoc function
 * @name todoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the todoApp
 */
angular.module('todoApp')
  .controller('MainCtrl', function ($scope, localStorageService) {
    $scope.localStorageService = localStorageService;

    $scope.currentDate = new Date();
    $scope.hideComplete = false;

    $scope.toDoList = $scope.localStorageService.get('toDoList');
    if (!$scope.toDoList) $scope.toDoList = [];

    $scope.$watchCollection('toDoList', () => {
      $scope.switchFilter();
      $scope.localStorageService.set('toDoList', $scope.toDoList);
    });

    $scope.toggleComplete = function(item) {
      item.completed = !item.completed;
    };

    $scope.switchFilter = function() {
      $scope.displayList = $scope.hideComplete ? $scope.toDoList.filter(item => !item.completed) : $scope.toDoList;
    }

    $scope.update = function(item) {
      var newItem = angular.copy(item)

      if (!newItem.description) {
        alert('Please enter a description!');
        return;
      }

      var re = new RegExp(/^\d{1,2}\/\d{1,2}\/\d{4}$/);
      if (newItem.due === '' || !re.test(newItem.due)) {
        alert('Invalid date format: ' + newItem.due);
        return;
      }
      newItem.due = new Date(newItem.due);

      newItem.createdDate = new Date();
      newItem.completed = false;

      $scope.toDoList.push(newItem);

      $scope.toDoList.sort(function(a,b) {
        if (new Date(a.due) === new Date(b.due)) return new Date(a.createdDate) - new Date(b.createdDate);
        else return new Date(a.due) - new Date(b.due);
      });

      item.description = '';
      item.due = '';
    }

    $scope.remove = function(item) {
      $scope.toDoList = $scope.toDoList.filter(i => i !== item);
    };

    $scope.getBackgroundColor = function(item) {
      if (item.completed) return 'completed';
      if (new Date(item.due) < $scope.currentDate) return 'overdue';
    }
});
