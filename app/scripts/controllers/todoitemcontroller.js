'use strict';

/**
 * @ngdoc function
 * @name todoApp.controller:TodoitemcontrollerCtrl
 * @description
 * # TodoitemcontrollerCtrl
 * Controller of the todoApp
 */
angular.module('todoApp')
  .controller('ToDoItemCtrl', function ($scope, saveItemService) {
    $scope.saveItemService = saveItemService;

    $scope.currentDate = new Date();

    $scope.edit = function(item) {
      $scope.editable = true;

      var d = new Date(item.due),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      item.due ? item.due = [month, day, year].join('/') : '';
    }

    $scope.saveItem = function(item) {
      var re = new RegExp(/^\d{1,2}\/\d{1,2}\/\d{4}$/);
      if (item.due && !re.test(item.due)) {
        alert('Invalid date format: ' + item.due);
        return;
      }

      $scope.saveItemService.updateItem(item);

      $scope.editable = false;

      item.description = '';
      item.due = '';
    }

    $scope.toggleComplete = function(item) {
      item.completed = !item.completed;
      $scope.saveItemService.updateItem(item);
    };

    $scope.remove = function(item) {
      $scope.saveItemService.removeItem(item);
    };

    $scope.getBackgroundColor = function(item) {
      if (item.completed) return 'completed';
      if (new Date(item.due) < $scope.currentDate) return 'overdue';
    }
  });
