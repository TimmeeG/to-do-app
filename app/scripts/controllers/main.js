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
    //$scope.localStorageService.clearAll();
    $scope.hideComplete = false;

    $scope.populateItems = function() {
      $scope.toDoList = [];
      var keys = $scope.localStorageService.keys();
      for (var i = 0; i < keys.length; i++) {
        var item = $scope.localStorageService.get(keys[i]);
        $scope.toDoList.push(item);
      }
    }

    $scope.populateItems();

    $scope.$on('LocalStorageModule.notification.setitem', () => {
      $scope.switchFilter();
    });

    $scope.$on('LocalStorageModule.notification.removeitem', () => {
      $scope.switchFilter();
    });

    $scope.switchFilter = function() {
      $scope.populateItems();
      $scope.toDoList = $scope.hideComplete ? $scope.toDoList.filter(item => !item.completed) : $scope.toDoList;
    };

    $scope.update = function(item) {
      var newItem = angular.copy(item)

      if (!newItem.description) {
        alert('Please enter a description!');
        return;
      }

      var re = new RegExp(/^\d{1,2}\/\d{1,2}\/\d{4}$/);
      if (newItem.due && !re.test(newItem.due)) {
        alert('Invalid date format: ' + newItem.due);
        return;
      }

      newItem.key = new Date().getUTCMilliseconds();
      newItem.due = new Date(newItem.due);
      newItem.createdDate = new Date();
      newItem.completed = false;

      $scope.localStorageService.set(newItem.key, newItem);
      debugger
      $scope.toDoList.sort(function(a,b) {
        if (new Date(a.due) === new Date(b.due)) return new Date(a.createdDate) - new Date(b.createdDate);
        else return new Date(a.due) - new Date(b.due);
      });

      item.description = '';
      item.due = '';
    }
});
