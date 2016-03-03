var express = require('express');
var app = express();
var url = require('url');
var google = require('googleapis');
var path = require('path');
var customsearch = google.customsearch('v1');

const CX = '013996294933914171983:xk6kcwiy3ii';
const API_KEY = 'AIzaSyAtGOfjX3dOrgXaboqOWqMBM_X4zCqzL3k';

var recentSearches = [];

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'front_page.html'));
});

app.get('/favicon.ico', function (req, res) {
	res.send('Hi!');
});

app.get('/recent', function (req, res) {
  res.send(recentSearches);
});

app.get(/[^.]/, function (req, res) {
  var parsedUrl = url.parse(req.url);
  var search = req.url.split('/')[1].split('?')[0];
  var index = req.query.offset || 1;

  customsearch.cse.list({ cx: CX, q: search, auth: API_KEY, searchType: 'image', start: index }, function(err, resp) {
	  if (err) {
	    console.log('An error occured', err);
	    return;
	  }
    
    recentSearches.push({term: search, when: new Date()});
	  res.send(resp.items.map(extractData));
  });

});

app.listen(process.env.PORT||3000, function () {
  console.log('Example app listening on port 3000!');
});

function extractData(item){
	return {
		url: item.link,
		altText: item.snippet,
		thumbnail: item.image.thumbnailLink,
    context: item.image.contextLink
	};
}



