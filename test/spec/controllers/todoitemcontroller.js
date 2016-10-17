'use strict';

describe('Controller: TodoitemcontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('todoApp'));

  var TodoitemcontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TodoitemcontrollerCtrl = $controller('TodoitemcontrollerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TodoitemcontrollerCtrl.awesomeThings.length).toBe(3);
  });
});
