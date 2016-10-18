'use strict';

/**
 * @ngdoc function
 * @name todoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the todoApp
 */
angular.module('todoApp')
  .controller('MainCtrl', function ($scope, localStorageService, saveItemService) {
    $scope.localStorageService = localStorageService;
    $scope.saveItemService = saveItemService;
    $scope.hideComplete = false;

    $scope.populateItems = function() {
      $scope.toDoList = [];
      var keys = $scope.localStorageService.keys();
      for (var i = 0; i < keys.length; i++) {
        var item = $scope.localStorageService.get(keys[i]);
        $scope.toDoList.push(item);
      }

      $scope.toDoList.sort(function(a,b) {
        if (new Date(a.due) === new Date(b.due)) return new Date(a.createdDate) - new Date(b.createdDate);
        else return new Date(a.due) - new Date(b.due);
      });
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

    $scope.save = function(item) {
      var re = new RegExp(/^\d{1,2}\/\d{1,2}\/\d{4}$/);
      if (newItem.due && !re.test(newItem.due)) {
        alert('Invalid date format: ' + newItem.due);
        return;
      }

      $scope.saveItemService.save(item);

      item.description = '';
      item.due = '';
    }
});
