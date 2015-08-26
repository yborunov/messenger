'use strict';

var httpBackEndMock = require('../httpBackEndMock');

describe('test routing', function() {
	var mockupData = {};
	mockupData['authResponse'] = {
		"auth": {
			"id": "679c68cc-d9ae-4f7a-a31f-3959a551cd0b",
			"name": "interview_session"
		},
		"customer": {
			"key": "interview",
			"id": 217,
			"name": "Interview Candidate Test"
		},
		"user": {
			"id": 2,
			"username": "interview",
			"displayName": "Interview Test User"
		}
	};
	mockupData['sessionId'] = 'eyJhdXRoIjp7ImlkIjoiNGQ4MGIyZmQtYWVmMi00Y2Q0LTgwYjMtMTdmODNlNjQ2OTgzIiwibmFtZSI6Im1pc2thdG9uaWNfc2Vzc2lvbiJ9LCJjdXN0b21lciI6eyJrZXkiOiJtaXNrYXRvbmljIiwiaWQiOjE2MywibmFtZSI6Ik1pc2thdG9uaWMgVW5pdmVyc2l0eSBEaXN0cmljdCJ9LCJ1c2VyIjp7ImlkIjo3LCJ1c2VybmFtZSI6InNzaHloIiwiZGlzcGxheU5hbWUiOiJTaGF3biBTaHloIn19';
	mockupData['messageGroups'] = [
	 {
	   "id": 7,
	   "name": "phone and email",
	   "description": "this is a test",
	   "type": "notification",
	   "isPublished": false,
	   "isSubscribed": false,
	   "messageTypes": [
	     {
	       "type": "phone",
	       "subType": "voice"
	     },
	     {
	       "type": "email",
	       "subType": "html"
	     }
	   ],
	   "user": {
	     "id": 2
	   }
	 },
	 {
	   "id": 8,
	   "name": "email only",
	   "description": "",
	   "type": "notification",
	   "isPublished": false,
	   "isSubscribed": false,
	   "messageTypes": [
	     {
	       "type": "email",
	       "subType": "html"
	     }
	   ],
	   "user": {
	     "id": 2
	   }
	 }
	];

	describe('default routing', function() {
		it('root path should be redirected to #/login', function() {
			browser.get('/');
			browser.getLocationAbsUrl().then(function(url) {
				expect(url).toEqual('/login');
			});
		});
		it('#/messages should be redirected to #/login', function() {
			browser.get('#/messages');
			browser.getLocationAbsUrl().then(function(url) {
				expect(url).toEqual('/login');
			});
		});
	});

	describe('authorization', function() {
		beforeEach(function() {
			httpBackEndMock.create(function($httpBackend, payload) {
				$httpBackend.whenPOST('https://treadstone-testdev.testschoolmessenger.com/v1/sessions')
					.respond(200, payload.authResponse, {
						'Sm-App-SessionId': payload.sessionId
					});
				$httpBackend.whenGET('https://treadstone-testdev.testschoolmessenger.com/v1/messageGroups')
					.respond(payload.messageGroups);
			}, {
				authResponse: mockupData.authResponse,
				sessionId: mockupData.sessionId,
				messageGroups: mockupData.messageGroups
			});
		});
	    afterEach(function () {
	        httpBackEndMock.clear();
	    });

		it('signin in', function() {
			browser.get('/');
			element(by.model('signinForm.username')).sendKeys('interview');
			element(by.model('signinForm.password')).sendKeys('candidate123');
			element(by.model('signinForm.customer')).sendKeys('interview');
			element(by.css('button[type="submit"]')).click();

			browser.getLocationAbsUrl().then(function(url) {
				expect(url).toEqual('/messages');
			});

			expect(element.all(by.css('table tr:not(:first-child)')).count()).toEqual(2);
			expect(element(by.css('table tr:nth-child(2) td:nth-child(1)')).getText()).toEqual('7');
			expect(element(by.css('table tr:nth-child(2) td:nth-child(2)')).getText()).toEqual('phone and email');
			expect(element(by.css('table tr:nth-child(2) td:nth-child(3)')).getText()).toEqual('false');
		});
	});
});