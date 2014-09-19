var express = require('express');
var api = express.Router();
var Twit = require('twit');

var T = new Twit({
  consumer_key: process.env.TWITTER_API_KEY
  , consumer_secret: process.env.TWITTER_API_SECRET
  , access_token: process.env.TWITTER_A_TOKEN
  , access_token_secret: process.env.TWITTER_A_TOKEN_SECRET
});

var Tweeter = function(name, screen_name , id ) { 
	this.name= name ; 
	this.handle= screen_name ; 
	this.id= id ;

};

var followers = [] ;
var friends = [] ;

/* GET home page. */
api.get('/', function(req, res) {
  console.log("/api worked");
    res.end();
});

api.get('/test', function(req, res) {
  console.log("/api/test worked");
  res.end();
});


api.get('/twitter/:handle/followers', function(req,res) { 
  followers=[];
	T.get('followers/list', { screen_name:  req.params.handle },  function (err, data, response) {
		if(!err){
  		data.users.forEach(function(elem) { 
  			var follower= new Tweeter(elem.name , elem.screen_name , elem.id );
  			followers.push(follower);

  		}) ; 
  		res.json(followers);
  	}
  	else {
  		res.end("no such handler");
  	}
		}); 
});


api.get('/twitter/:handle/friends', function(req,res) { 
    friends=[] ;
	T.get('friends/list', { screen_name:  req.params.handle },  function (err, data, response) {
  		data.users.forEach(function(elem) { 
  			var friend= new Tweeter(elem.name , elem.screen_name , elem.id );
  			friends.push(friend);

  		}) ; 
  		res.json(friends);
		}); 
});


module.exports = api;
