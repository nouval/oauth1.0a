#oauth1.0a-serve
=========

OAuth-1.0a implementation for Serve Open API

## Installation

###Node.js
    $ npm install serve-oauth --save

###Browser
    Comming sooon...

## Usage

###Work with https (Node.js)

Depencies
```js
var oauth = require('serve-oauth');
var https = require('https');
```

Init
```js
var oauth_opts = {
		consumer: {
			public: '*****',
			secret: '*****'
		},
		signature_method: 'hmac-sha256',
	};
	var request_data = {
		url: 'https://apiu3.servevirtual.net/v1/utilities/authtest',
		method: 'GET'
	};
```

Setup your request
```js
var request_data = {
	url: 'https://api.twitter.com/1/statuses/update.json?include_entities=true',
    method: 'POST',
    data: {
        status: 'Hello Ladies + Gentlemen, a signed OAuth request!'
    }
};

var options = {
	hostname: 'apiu3.servevirtual.net',
	path: '/v1/utilities/authtest',
	method: 'GET',
	headers: {
		'Authorization': oauthHeader
	}
};
```

Call a request

```js
var httpReq = https.request(options, function(resp) {
	console.log("statusCode: ", resp.statusCode);
  	console.log("headers: ", resp.headers);

  	resp.on('data', function(d) {
		  console.log('on Data:' + d)
	  });	
});
httpReq.end();
```


## Tests

  npm test

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.1.0 Initial release
