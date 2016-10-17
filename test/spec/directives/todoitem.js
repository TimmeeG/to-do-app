'use strict';

describe('Directive: toDoItem', function () {

  // load the directive's module
  beforeEach(module('todoApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<to-do-item></to-do-item>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the toDoItem directive');
  }));
});
