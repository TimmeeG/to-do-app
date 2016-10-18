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
    this.saveNewItem = function(item) {
      var newItem = angular.copy(item);

      if (!newItem.key) {
        newItem.key = new Date().getUTCMilliseconds();
      }

      newItem.due = new Date(newItem.due);
      newItem.completed = false;

      this.updateItem(item);
    };

    this.updateItem = function(item) {
      item.isTemplateItem = false;
      item.createdDate = new Date();
      this.localStorageService.set(item.key, item);
    };

    this.removeItem = function(item) {
      this.localStorageService.remove(item.key);
    };

    this.get = function() {
      var itemsList = [];
      var keys = this.localStorageService.keys();
      for (var i = 0; i < keys.length; i++) {
        var item = this.localStorageService.get(keys[i]);
        itemsList.push(item);
      }

      return itemsList;
    };
});
