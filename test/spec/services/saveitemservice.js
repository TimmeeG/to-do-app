'use strict';

describe('Service: saveItemService', function () {

  // load the service's module
  beforeEach(module('todoApp'));

  // instantiate service
  var saveItemService;
  beforeEach(inject(function (_saveItemService_) {
    saveItemService = _saveItemService_;
  }));

  it('should do something', function () {
    expect(!!saveItemService).toBe(true);
  });

});
