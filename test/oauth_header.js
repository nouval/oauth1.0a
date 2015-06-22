/// <reference path="../typings/mocha/mocha.d.ts"/>

var expect = require('chai').expect;
var oauth = require('../app/oauth1.0a');

	var oauth_opts = {
		consumer: {
			public: 'consumer.pub.key',
			secret: '1a5a6d7a756092892555305809ce66d66be1d0bd'
		},
		signature_method: 'hmac-sha256',
		nonce: '32acf939-7139-4bd1-bbbb-2209349b867e',
		timestamp: '1434705047',				
	};
	var request_data = {
		url: 'https://apiu3.servevirtual.net/v1/utilities/authtest',
		method: 'GET'
	};
	var request_data_with_oauthToken_and_oauthTokenSecret = {
		url: 'https://apiu3.servevirtual.net/v1/utilities/authtest',
		method: 'GET',
		oauthToken: 'RJH+zWzZ4ZHlk89iQmy1FKhtegu/k2opgB+k9gcMgp4=',
		oauthTokenSecret: 'q5978CpWbY/NV3nt8a7Osm4o4XbpwEGng0iAvqFx5s4='
	};
	var request_data_with_queryString = {
		url: 'https://apiu3.servevirtual.net/v1/utilities/authtest?foo=bar&woo=hoo',
		method: 'GET'
	};
	var request_data_with_queryString_with_oauthToken_and_oauthTokenSecret = {
		url: 'https://apiu3.servevirtual.net/v1/utilities/authtest?foo=bar&woo=hoo',
		method: 'GET',	
		oauthToken: 'RJH+zWzZ4ZHlk89iQmy1FKhtegu/k2opgB+k9gcMgp4=',
		oauthTokenSecret: 'q5978CpWbY/NV3nt8a7Osm4o4XbpwEGng0iAvqFx5s4='
	};
	var request_data_with_contentBody = {
		url: 'https://apiu3.servevirtual.net/v1/utilities/authtest',
		method: 'PUT',
		contentType: 'application/json',
		data: '{firstName: \'James\', lastName: \'Gordon\'}'
	};
	var request_data_with_contentBody_with_oauthToken_and_oauthTokenSecret = {
		url: 'https://apiu3.servevirtual.net/v1/utilities/authtest',
		method: 'PUT',
		contentType: 'application/json',
		data: '{firstName: \'James\', lastName: \'Gordon\'}',
		oauthToken: 'RJH+zWzZ4ZHlk89iQmy1FKhtegu/k2opgB+k9gcMgp4=',
		oauthTokenSecret: 'q5978CpWbY/NV3nt8a7Osm4o4XbpwEGng0iAvqFx5s4='
	};
	var request_data_with_contentBody_with_queryString = {
		url: 'https://apiu3.servevirtual.net/v1/utilities/authtest?foo=bar&woo=hoo',
		method: 'PUT',
		contentType: 'application/json',
		data: '{firstName: \'James\', lastName: \'Gordon\'}'
	};
	var request_data_with_contentBody_with_queryString_with_oauthToken_and_oauthTokenSecret = {
		url: 'https://apiu3.servevirtual.net/v1/utilities/authtest?foo=bar&woo=hoo',
		method: 'PUT',
		contentType: 'application/json',
		data: '{firstName: \'James\', lastName: \'Gordon\'}',
		oauthToken: 'RJH+zWzZ4ZHlk89iQmy1FKhtegu/k2opgB+k9gcMgp4=',
		oauthTokenSecret: 'q5978CpWbY/NV3nt8a7Osm4o4XbpwEGng0iAvqFx5s4='
	};
	var request_data_with_contentBody_form_urlencoded = {
		url: 'https://apiu3.servevirtual.net/v1/utilities/authtest',
		method: 'PUT',
		contentType: 'application/x-www-form-urlencoded',
		data: 'firstName=James&lastName=Gordon'
	};
	var request_data_with_contentBody_form_urlencoded_with_oauthToken_and_oauthTokenSecret = {
		url: 'https://apiu3.servevirtual.net/v1/utilities/authtest',
		method: 'PUT',
		contentType: 'application/x-www-form-urlencoded',
		data: 'firstName=James&lastName=Gordon',
		oauthToken: 'RJH+zWzZ4ZHlk89iQmy1FKhtegu/k2opgB+k9gcMgp4=',
		oauthTokenSecret: 'q5978CpWbY/NV3nt8a7Osm4o4XbpwEGng0iAvqFx5s4='
	};
	var request_data_with_contentBody_form_urlencoded_with_queryString = {
		url: 'https://apiu3.servevirtual.net/v1/utilities/authtest?foo=bar&woo=hoo',
		method: 'PUT',
		contentType: 'application/x-www-form-urlencoded',
		data: 'firstName=James&lastName=Gordon'
	};
	var request_data_with_contentBody_form_urlencoded_with_queryString_with_oauthToken_and_oauthTokenSecret = {
		url: 'https://apiu3.servevirtual.net/v1/utilities/authtest?foo=bar&woo=hoo',
		method: 'PUT',
		contentType: 'application/x-www-form-urlencoded',
		data: 'firstName=James&lastName=Gordon',
		oauthToken: 'RJH+zWzZ4ZHlk89iQmy1FKhtegu/k2opgB+k9gcMgp4=',
		oauthTokenSecret: 'q5978CpWbY/NV3nt8a7Osm4o4XbpwEGng0iAvqFx5s4='
	};

describe("Serve oauth1.0a authorization header builder", function() {
	
	describe("Serve oauth1.0a auth header with and without query string", function() {	
		it("should generate valid oauth header when given: valid data, NO query string", function() {
			var authorization_header = oauth.generateAuthorizationHeader(oauth_opts, request_data);

			expect(authorization_header).to.eql({
				oauth_consumer_key: 'consumer.pub.key',
				oauth_signature_method: 'hmac-sha256', 
				oauth_body_hash: 'rYmiz%2FSiNUUFqCYwccYM0ESxDyFdsS530KNgW4A9DVM%3D',
				oauth_signature: '6T%2B7YteAsggWeHJzSutJZG1ATh0TEP%2BF1tEwKJ57jzA%3D', 
				oauth_timestamp: '1434705047', 
				oauth_nonce: '32acf939-7139-4bd1-bbbb-2209349b867e', 
				oauth_version: '1.0'				
			});
		});
		
		it("should generate valid oauth header when given: valid data, NO query string, oauth_token & oauth_token_secret", function () {
			var authorization_header = oauth.generateAuthorizationHeader(oauth_opts, request_data_with_oauthToken_and_oauthTokenSecret);

			expect(authorization_header).to.eql({
				oauth_consumer_key: 'consumer.pub.key', 
				oauth_token:'RJH%2BzWzZ4ZHlk89iQmy1FKhtegu%2Fk2opgB%2Bk9gcMgp4%3D', 
				oauth_signature_method:'hmac-sha256', 
				oauth_body_hash:'AZQGv7DCtsQm51jeEEIVG1uocnr3b5U0MjULRT7s6SQ%3D', 
				oauth_signature:'v2JZZOUbzvZpJRDUmyGzXdK2PBpwjDwbAN3LTZQFp3Q%3D', 
				oauth_timestamp:'1434705047', 
				oauth_nonce:'32acf939-7139-4bd1-bbbb-2209349b867e', 
				oauth_version:'1.0'
			});			
		});

		it("should generate valid oauth header when given: valid data, with query string", function() {
			var authorization_header = oauth.generateAuthorizationHeader(oauth_opts, request_data_with_queryString);

			expect(authorization_header).to.eql({
				oauth_consumer_key:'consumer.pub.key',
				oauth_signature_method:'hmac-sha256',
				oauth_body_hash:'rYmiz%2FSiNUUFqCYwccYM0ESxDyFdsS530KNgW4A9DVM%3D',
				oauth_signature:'3tfxR6hnWdwofsA7MXo6VU0o1jHlCFPArj8Jnl7He40%3D',
				oauth_timestamp:'1434705047',
				oauth_nonce:'32acf939-7139-4bd1-bbbb-2209349b867e',
				oauth_version:'1.0'		
			});
		});

		it("should generate valid oauth header when given: valid data, with query string, oauth_token & oauth_token_secret", function () {
			var authorization_header = oauth.generateAuthorizationHeader(oauth_opts, request_data_with_queryString_with_oauthToken_and_oauthTokenSecret);

			expect(authorization_header).to.eql({
				oauth_consumer_key:'consumer.pub.key', 
				oauth_token:'RJH%2BzWzZ4ZHlk89iQmy1FKhtegu%2Fk2opgB%2Bk9gcMgp4%3D', 
				oauth_signature_method:'hmac-sha256', 
				oauth_body_hash:'AZQGv7DCtsQm51jeEEIVG1uocnr3b5U0MjULRT7s6SQ%3D', 
				oauth_signature:'5yhWPvLKVKCIURChNXOpuXteax1GzepxNRSW8q9fF8o%3D', 
				oauth_timestamp:'1434705047', 
				oauth_nonce:'32acf939-7139-4bd1-bbbb-2209349b867e', 
				oauth_version:'1.0'
			});			
		});
	});
	
	describe("Serve oauth1.0a auth header with and without query string, with content body", function() {		
		it("should generate valid oauth header when given: valid data, with content body, NO query string", function() {
			var authorization_header = oauth.generateAuthorizationHeader(oauth_opts, request_data_with_contentBody);

			expect(authorization_header).to.eql({
				oauth_consumer_key: 'consumer.pub.key',
				oauth_signature_method: 'hmac-sha256',
				oauth_body_hash: '%2BGErQCw2QpeVcGHieg7mfYp8%2BG92996KMJ3hEf6Cv04%3D',
				oauth_signature: 'VcbCK0IWvC1JS6WcAEa2Rm5o5ptS9JCYibMILTHonyw%3D',
				oauth_timestamp: '1434705047',
				oauth_nonce: '32acf939-7139-4bd1-bbbb-2209349b867e',
				oauth_version: '1.0'
			});
		});

		it("should generate valid oauth header when given: valid data, with content body, NO query string, oauth_token & oauth_token_secret", function() {
			var authorization_header = oauth.generateAuthorizationHeader(oauth_opts, request_data_with_contentBody_with_oauthToken_and_oauthTokenSecret);

			expect(authorization_header).to.eql({
				oauth_consumer_key:'consumer.pub.key', 
				oauth_token:'RJH%2BzWzZ4ZHlk89iQmy1FKhtegu%2Fk2opgB%2Bk9gcMgp4%3D', 
				oauth_signature_method:'hmac-sha256', 
				oauth_body_hash:'VK5pzyuSTWU0dFBF8T%2BE5eY%2F8YG3vZSCTEGR0sDMgBM%3D', 
				oauth_signature:'BT2RW%2BkvxWgc6R%2BvLsXD9ikT07lrMDuBR8ExSf0aJQ4%3D', 
				oauth_timestamp:'1434705047', 
				oauth_nonce:'32acf939-7139-4bd1-bbbb-2209349b867e', 
				oauth_version:'1.0'
			});
		});

		it("should generate valid auth header when given: valid data, with content body, with query string", function() {
			var authorization_header = oauth.generateAuthorizationHeader(oauth_opts, request_data_with_contentBody_with_queryString);

			expect(authorization_header).to.eql({
				oauth_consumer_key:'consumer.pub.key',
				oauth_signature_method:'hmac-sha256',
				oauth_body_hash:'%2BGErQCw2QpeVcGHieg7mfYp8%2BG92996KMJ3hEf6Cv04%3D',
				oauth_signature:'ZzRIjm4REZMvIkkxgczMgOpsy12h8R4XkD9HnHTpR2w%3D',
				oauth_timestamp:'1434705047',
				oauth_nonce:'32acf939-7139-4bd1-bbbb-2209349b867e',
				oauth_version:'1.0'				
			});
		});

		it("should generate valid oauth header when given: valid data, with content body, with query string, oauth_token & oauth_token_secret", function() {
			var authorization_header = oauth.generateAuthorizationHeader(oauth_opts, request_data_with_contentBody_with_queryString_with_oauthToken_and_oauthTokenSecret);

			expect(authorization_header).to.eql({
				oauth_consumer_key:'consumer.pub.key', 
				oauth_token:'RJH%2BzWzZ4ZHlk89iQmy1FKhtegu%2Fk2opgB%2Bk9gcMgp4%3D', 
				oauth_signature_method:'hmac-sha256', 
				oauth_body_hash:'VK5pzyuSTWU0dFBF8T%2BE5eY%2F8YG3vZSCTEGR0sDMgBM%3D', 
				oauth_signature:'qjfFw72b19RDOGiGdwT12W415Vh89y8dKsL90nmLf2A%3D', 
				oauth_timestamp:'1434705047', 
				oauth_nonce:'32acf939-7139-4bd1-bbbb-2209349b867e', 
				oauth_version:'1.0'
			});
		});
	});
	
	describe("Serve oauth1.0a auth header with and without query string, with content body (as form url encoded)", function() {		
		it("should generate valid oauth header when given: valid credential, with content body as form-urlencoded, NO query string", function() {
			var authorization_header = oauth.generateAuthorizationHeader(oauth_opts, request_data_with_contentBody_form_urlencoded);

			expect(authorization_header).to.eql({
				oauth_consumer_key:'consumer.pub.key',
				oauth_signature_method:'hmac-sha256',
				oauth_signature:'bczL64hL%2FSKIL3N0TXAHtC1sVel6egFm9lST2WN6iuY%3D',
				oauth_timestamp:'1434705047',
				oauth_nonce:'32acf939-7139-4bd1-bbbb-2209349b867e',
				oauth_version:'1.0'
			});
		});
		
		it("should generate valid oauth header when given: valid credential, with content body as form-urlencoded, NO query string, oauth_token & oauth_token_secret", function() {
			var authorization_header = oauth.generateAuthorizationHeader(oauth_opts, request_data_with_contentBody_form_urlencoded_with_oauthToken_and_oauthTokenSecret);

			expect(authorization_header).to.eql({
				oauth_consumer_key:'consumer.pub.key', 
				oauth_token:'RJH%2BzWzZ4ZHlk89iQmy1FKhtegu%2Fk2opgB%2Bk9gcMgp4%3D', 
				oauth_signature_method:'hmac-sha256', 
				oauth_signature:'AAC11xp0o49UAyLgR12xkYp2xgWbNy5jvTKUXoJcKRg%3D', 
				oauth_timestamp:'1434705047', 
				oauth_nonce:'32acf939-7139-4bd1-bbbb-2209349b867e', 
				oauth_version:'1.0'
			});
		});		

		it("should generate valid oauth header when given: valid credential, with content body as form-urlencoded, with query string", function() {
			var authorization_header = oauth.generateAuthorizationHeader(oauth_opts, request_data_with_contentBody_form_urlencoded_with_queryString);

			expect(authorization_header).to.eql({
			   oauth_consumer_key:'consumer.pub.key',
			   oauth_signature_method:'hmac-sha256',
			   oauth_signature:'aMKUiguvf8X0%2FKYyJnxrgk7aqJNc1m9qAjiWqVx4Wvs%3D',
			   oauth_timestamp:'1434705047',
			   oauth_nonce:'32acf939-7139-4bd1-bbbb-2209349b867e',
			   oauth_version:'1.0'
			});
		});
		
		it("should generate valid oauth header when given: valid credential, with content body as form-urlencoded, with query string, oauth_token & oauth_token_secret", function() {
			var authorization_header = oauth.generateAuthorizationHeader(oauth_opts, request_data_with_contentBody_form_urlencoded_with_queryString_with_oauthToken_and_oauthTokenSecret);

			expect(authorization_header).to.eql({
				oauth_consumer_key:'consumer.pub.key', 
				oauth_token:'RJH%2BzWzZ4ZHlk89iQmy1FKhtegu%2Fk2opgB%2Bk9gcMgp4%3D', 
				oauth_signature_method:'hmac-sha256', 
				oauth_signature:'kwgKuXVNG9vY9rTYPcYL9z20tc%2F%2FGTqS35bRYkmWpiM%3D', 
				oauth_timestamp:'1434705047', 
				oauth_nonce:'32acf939-7139-4bd1-bbbb-2209349b867e', 
				oauth_version:'1.0'
			});
		});				
	});
});
