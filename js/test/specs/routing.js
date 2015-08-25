describe('test routing', function() {
	describe('default routing', function() {
		it('should be redirected to #/login', function() {
			browser.get('index.html');
			browser.getLocationAbsUrl().then(function(url) {
				expect(url).toEqual('/login');
			})
		});
	});
	describe('Login view', function() {
		beforeEach(function() {
			browser.get('index.html#/login');
		});
		
	});
});