
var cryptojs = require("crypto-js");
var uuid = require('uuid');
var url = require('url');
var querystring = require('querystring');

// exports public api
var oauth = {
	'generateSignature': genSignature,
	'generateAuthorizationHeader': genAuthorizationHeader,
};

module.exports = oauth;

/**
 * Returns oauth signature for given oauth's options and http request data
 * @param {Object} oauth options
 * @param {Object} oauth http request data 
 */
function genSignature(oauth_opts, request_data) {
	
	var oauth_params = genOAuthParams(oauth_opts, request_data);
	
	// build oauth body hash, only IF content type other than form-urlencoded
	if (request_data.contentType != 'application/x-www-form-urlencoded') {
		oauth_params['oauth_body_hash'] = hash(oauth_opts.signature_method, request_data.data || '', getHashKey(oauth_opts, request_data));
	}
	
	// add oauth_token, IF available
	if (request_data.oauthToken) {
		oauth_params['oauth_token'] = request_data.oauthToken; 
	}
	
	// merge with query string
	var parsedUrl = url.parse(request_data.url);
	mergeObjects(querystring.parse(parsedUrl.query), oauth_params);
	
	// merge with content body, IF content type is form-urlencoded
	if (request_data.contentType == 'application/x-www-form-urlencoded') {
		mergeObjects(querystring.parse(request_data.data), oauth_params);
	}
	
	// build oauth param string
	// sort
	var oauth_params_sorted = sort(oauth_params);
	var oauth_params_str = '';
    for(var key in oauth_params_sorted) {
        oauth_params_str += oauth_params_str == '' ? key + '=' + oauth_params_sorted[key] : '&' + key + '=' + oauth_params_sorted[key];
    }
	
	// build Base String
	var base_string = request_data.method.toUpperCase() + '&' + encodeURIComponent(getBaseUrl(request_data.url)) + '&' + encodeURIComponent(oauth_params_str);
	
	return hash(oauth_opts.signature_method, base_string, getHashKey(oauth_opts, request_data));
}

/**
 * Returns oauth authorization headers for given oauth option and http request data
 * @param {Object} oauth options
 * @param {Object} oauth http request data 
 */
function genAuthorizationHeader(oauth_opts, request_data) {

	var oauth_header = genOAuthParams(oauth_opts, request_data);
	
	oauth_header['oauth_signature'] = encodeURIComponent(genSignature(oauth_opts, request_data));

	if (request_data.oauthToken) {
		oauth_header['oauth_token'] = encodeURIComponent(request_data.oauthToken); 
	}
	
	// only add oauth_body_hash, IF content type is form-urlencoded
	if (request_data.contentType != 'application/x-www-form-urlencoded') {
		oauth_header['oauth_body_hash'] = encodeURIComponent(hash(oauth_opts.signature_method, request_data.data || '', getHashKey(oauth_opts, request_data)));
	}
	
	return oauth_header;
}

////
// private functions / helper methods //
////

/**
 * Returns hash value from givem signature's method, plain text and key
 * @param {Object} signature method, currently support hmac-sha1 & hmac-sha256
 * @param {Object} string value to hash
 * @param {Object} hashing key
 */
function hash(signature_method, text, key) {

	switch (signature_method.toUpperCase()) {
		case 'HMAC-SHA1':
            return cryptojs.HmacSHA1(text, key).toString(cryptojs.enc.Base64);
			break;
			
		case 'HMAC-SHA256':
            return cryptojs.HmacSHA256(text, key).toString(cryptojs.enc.Base64);
			break;
		
		default:
			throw new Error('This OAuth 1.0a implementation only support these signature: HMAC-SHA1, HMAC-SHA256');
	};
};

/**
 * Returns hash key, combination of consumer's secret and oauth token secret (if avaialable)
 * @param {Object} oauth options
 * @param {Object} oauth http request data
 */
function getHashKey(oauth_opts, request_data) {
	return oauth_opts.consumer.secret + (request_data.oauthTokenSecret ? '&' + request_data.oauthTokenSecret : '');
}

/**
 * Returns base oauth headers
 * @param {Object} oauth options
 * @param {Object} oauth http request data
 */
function genOAuthParams(oauth_opts, request_data) {
	
	// assigned nonce and timestamp if its empty/null
	oauth_opts.nonce = oauth_opts.nonce || uuid.v1();
	oauth_opts.timestamp = oauth_opts.timestamp || Math.floor(Date.now() / 1000);

	return {
		'oauth_consumer_key': oauth_opts.consumer.public,
		'oauth_version': oauth_opts.version || '1.0',
		'oauth_signature_method': oauth_opts.signature_method || 'HMAC-SHA256',
		'oauth_nonce': oauth_opts.nonce,
		'oauth_timestamp': oauth_opts.timestamp
	};
}

/**
 * Returns baseurl of given url
 * @param {string} uri 
 */
function getBaseUrl(uri) {
	return uri.split('?')[0];
}

/**
 * Return sorted object for given object
 * @param {Object} object to be sorted
 */
function sort(data) {
	var keys = Object.keys(data);
    var result = {};

    keys.sort();

    for(var i = 0; i < keys.length; i++) {
        var key = keys[i];
        result[key] = data[key];
    }

    return result;		
}

/**
 * Returns merged data of two objects
 * @param {Object} json object to copy from
 * @param {Object} json object to copy to
 */
function mergeObjects(source, target) {
    var merged_obj = target;
    for(var key in source) {
        merged_obj[key] = source[key];
	}
    return merged_obj;	
}