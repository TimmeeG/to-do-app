'use strict';

/**
 * @ngdoc directive
 * @name todoApp.directive:toDoItem
 * @description
 * # toDoItem
 */
angular.module('todoApp')
  .directive('toDoItem', function () {
    return {
      templateUrl: '../views/todoitem.html',
      controller: 'ToDoItemCtrl',
      controllerAs: 'ctrl',
      restrict: 'E',
      scope: {
        item: '='
      }
    };
  });
