/*global module, browser, angular */
'use strict';
/**
 * This is a helper function for generating mock responses on the client side.
 * This affects all uses of $http.
 */
module.exports = {
    /**
     * Call create() before loading a page to inject the mock $http
     *
     * mockBuilder (function) - sets up the test mocks.
     *  This function is called with 2 parameters; $httpBackend and payload
     * payload (object) - data to pass to the client. Must be JSON-serializable
     *
     * NOTE: The mockBuilder function must not use variables that are outside its scope.
     *  All external variables that mockBuilder use
     *  must be saved to payload (before execution) and read from payload (during execution).
     */
    create: function(mockBuilder, payload) {
        // we need to call eval() since functions are sent as strings to the webdriver
        browser.addMockModule('httpBackEndMock', function(mockBuilder, payload) {
            angular.module('httpBackEndMock', ['ngMockE2E'])
            .run(function($httpBackend) {
                eval('(' + mockBuilder + ')')($httpBackend, payload); // jshint ignore:line
            });
        }, mockBuilder, payload);
    },
    // Call clear() after a test to clean up the mock.
    clear: function() {
        browser.removeMockModule('httpBackEndMock');
    }
};