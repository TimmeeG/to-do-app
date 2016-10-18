'use strict';

/**
 * @ngdoc function
 * @name todoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the todoApp
 */
angular.module('todoApp')
  .controller('MainCtrl', function ($scope, saveItemService) {
    $scope.saveItemService = saveItemService;
    $scope.hideComplete = false;

    $scope.populateItems = function() {
      $scope.toDoList = [];

      $scope.toDoList = $scope.saveItemService.get();

      $scope.toDoList.sort(function(a,b) {
        if (new Date(a.due) === new Date(b.due)) {
          return new Date(a.createdDate) - new Date(b.createdDate);
        }
        else {
          return new Date(a.due) - new Date(b.due);
        }
      });

      var itemTemplate = {
        isTemplateItem: true,
        key: new Date().getUTCMilliseconds(),
        description: '',
        completed: false,
        due: ''
      };

      $scope.toDoList.push(itemTemplate);
    };

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
});
