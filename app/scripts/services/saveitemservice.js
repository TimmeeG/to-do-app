'use strict';

/**
 * @ngdoc service
 * @name todoApp.saveItemService
 * @description
 * # saveItemService
 * Service in the todoApp.
 */
angular.module('todoApp')
  .service('saveItemService', function (localStorageService) {
    this.localStorageService = localStorageService;

    this.save = function(item) {
      var newItem = angular.copy(item)

      if (!newItem.key) newItem.key = new Date().getUTCMilliseconds();

      newItem.due = new Date(newItem.due);
      newItem.createdDate = new Date();
      newItem.completed = false;

      this.localStorageService.set(newItem.key, newItem);
    }
});
