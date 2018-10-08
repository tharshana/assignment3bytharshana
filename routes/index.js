var mongoose = require('mongoose');
const TVDB = require('node-tvdb');
var http = require('http');
var request = require('request');
var xml2js = require('xml2js');

var Show = require('../app/models/show');
var User = require('../app/models/user');
module.exports = function(app, passport) {

	// normal routes ===============================================================

	// show the home page (will also have our login links)
	app.get('/', function(req, res) {
		res.render('index', {user : req.user});
	});


	app.get('/add', isLoggedIn, function(req, res) {
		res.render('add', {user : req.user});
	});

	app.get('/movie', function(req, res) {
		res.render('movie', {user : req.user});
	});


	// // PROFILE SECTION =========================
	// app.get('/profile', isLoggedIn, function(req, res) {
	// 	res.render('profile.ejs', {
	// 		user : req.user
	// 	});
	// });

	// LOGOUT ==============================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	// =============================================================================
	// AUTHENTICATE (FIRST LOGIN) ==================================================
	// =============================================================================

	// locally --------------------------------
	// LOGIN ===============================
	// show the login form
	app.get('/login', function(req, res) {
		res.render('Login', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// SIGNUP =================================
	// show the signup form
	app.get('/signup', function(req, res) {
		res.render('signup', { message: req.flash('loginMessage') });
	});

	app.get('/profile',isLoggedIn, (req, res)=>{
		res.render('index', {user : req.user});
	})

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// facebook -------------------------------

	// send to facebook to do the authentication
	app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

	// handle the callback after facebook has authenticated the user
	app.get('/auth/facebook/callback',
	passport.authenticate('facebook', {
		successRedirect : '/',
		failureRedirect : '/login'
	}));

	// // github --------------------------------
	//
	// 	// send to github to do the authentication
	// 	app.get('/auth/github', passport.authenticate('github', { scope : 'email' }));
	//
	// 	// handle the callback after github has authenticated the user
	// 	app.get('/auth/github/callback',
	// 		passport.authenticate('github', {
	// 			successRedirect : '/profile',
	// 			failureRedirect : '/'
	// 		}));
	//

	// google ---------------------------------

	// send to google to do the authentication
	app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

	// the callback after google has authenticated the user
	app.get('/auth/google/callback',
	passport.authenticate('google', {
		successRedirect : '/',
		failureRedirect : '/login'
	}));

	// =============================================================================
	// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
	// =============================================================================

	// locally --------------------------------
	app.get('/connect/local', function(req, res) {
		res.render('connect-local', { message: req.flash('loginMessage') });
	});

	app.post('/connect/local', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// facebook -------------------------------

	// send to facebook to do the authentication
	app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

	// handle the callback after facebook has authorized the user
	app.get('/connect/facebook/callback',
	passport.authorize('facebook', {
		successRedirect : '/profile',
		failureRedirect : '/'
	}));

	// // github --------------------------------
	//
	// 	// send to github to do the authentication
	// 	app.get('/connect/github', passport.authorize('github', { scope : 'email' }));
	//
	// 	// handle the callback after github has authorized the user
	// 	app.get('/connect/github/callback',
	// 		passport.authorize('github', {
	// 			successRedirect : '/profile',
	// 			failureRedirect : '/'
	// 		}));


	// google ---------------------------------

	// send to google to do the authentication
	app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

	// the callback after google has authorized the user
	app.get('/connect/google/callback',
	passport.authorize('google', {
		successRedirect : '/profile',
		failureRedirect : '/'
	}));

	// =============================================================================
	// UNLINK ACCOUNTS =============================================================
	// =============================================================================
	// used to unlink accounts. for social accounts, just remove the token
	// for local account, remove email and password
	// user account will stay active in case they want to reconnect in the future

	// local -----------------------------------
	app.get('/unlink/local', function(req, res) {
		var user            = req.user;
		user.local.email    = undefined;
		user.local.password = undefined;
		user.save(function(err) {
			res.redirect('/profile');
		});
	});

	// facebook -------------------------------
	app.get('/unlink/facebook', function(req, res) {
		var user            = req.user;
		user.facebook.token = undefined;
		user.save(function(err) {
			res.redirect('/profile');
		});
	});

	// // github --------------------------------
	// app.get('/unlink/github', function(req, res) {
	// 	var user           = req.user;
	// 	user.github.token = undefined;
	// 	user.save(function(err) {
	// 		res.redirect('/profile');
	// 	});
	// });

	// google ---------------------------------
	app.get('/unlink/google', function(req, res) {
		var user          = req.user;
		user.google.token = undefined;
		user.save(function(err) {
			res.redirect('/profile');
		});
	});


	app.get('/desc/:id', (req, res)=>{
		const tvdb = new TVDB('0YTLHQL6Q63URBKV');
		Show.findOne({'id': req.params.id}, (err, show)=>{
			if(err) throw err;
			if(!show){
				tvdb.getSeriesById(req.params.id).then((response, body) => {
					var newShow = new Show();

					newShow.seriesName = response.seriesName;
					newShow.firstAired = response.firstAired;
					newShow.id = req.params.id;
					newShow.network = response.network;
					newShow.overview = response.overview;
					newShow.status = response.status;
					newShow.subscriber = "";

					Show.createShow(newShow, function(err, result) {
						if (err)
						throw err;

						console.log("Succeeded");
						res.render('desc', {data : result, user : req.user});
					});

				}).catch(error => { throw error });

			}
			else{
				res.render('desc', {data : show, user : req.user});
			}
		})
	});

	app.put('/desc/sublog', (req, res)=>{
		var mail = req.body.mail;
		var password = req.body.password;
		var showid = req.body.sid;

		User.findOne({ 'local.email' :  mail }, function(err, user) {
			if(err) throw err;
			if(!user) {
				var mailstatus = false;
				console.log("No such user found");
				// res.send(mailstatus);
			}
			if (!user.validPassword(password)){
				console.log("wrong");
				// var mailstatus = true;
				var passwordstatus = false;
				var data =passwordstatus;
				res.send(data);
			}
			else {
				Show.findOne({'id' : showid}, (err, reesult)=>{
					if(err) throw err;
					if(!reesult){
						const tvdb = new TVDB('0YTLHQL6Q63URBKV');
						tvdb.getSeriesById(showid).then((response, body) => {
							var newShow = new Show();

							newShow.seriesName = response.seriesName;
							newShow.firstAired = response.firstAired;
							newShow.id = req.params.id;
							newShow.network = response.network;
							newShow.overview = response.overview;
							newShow.status = response.status;
							newShow.subscriber = mail;
							console.log("came this far");

							Show.createShow(newShow, function(err) {
								if (err)
								throw err;

								console.log("Succeeded in adding");
							});

							// res.send();

							// res.render('desc', {data : response, user : req.user});
						}).catch(error => { throw error });
					}else{
						var status = true;
						console.log("gotcha");
						console.log(reesult.subscriber);
						// res.send({status : reesult.subscriber.includes(mail), user : mail});

						if(reesult.subscriber.includes(mail) == false){
							Show.update(
								{ "id": showid },
								{ "$push": { "subscriber": mail } },
								function (err, raw) {
									if (err) return console.log(err);
									console.log("No such use found");
									status = true;
									res.send(status);
								}
							);
						}else {

							res.send(status)
						}

						// result.findOne({'subscriber' : showid}, (err, results)=>{
						//   if(err) throw err;
						//   if(!result){
						//
						//   }
						//   else {
						//     console.log("Already subscribed")
						//   }
						// })

					}
				})
			}
		});


	})

	app.get('/desc/checksubscribe/:id', (req, res)=>{
		var data = req.params.id;
		console.log('hello'+data);
		Show.findOne({'id' : req.params.id}, (err, result)=>{
			console.log(result);
			res.send(result);
		})
	});

	app.put('/desc/subscribe/:id', (req, res)=>{
		var name = req.body.name;
		var firstAired = req.body.banner;
		var network = req.body.network;
		var overview = req.body.overview;
		var status = req.body.status;
		var subid = req.body.subid;

		var newShow = new Show();
		// console.log(newShow.tree);

		Show.findOne({'id' : req.params.id}, (err, result)=>{
			if(err) throw err;
			if(!result){
				newShow.seriesName = name;
				newShow.firstAired = firstAired;
				newShow.id = req.params.id;
				newShow.network = network;
				newShow.overview = overview;
				newShow.status = status;
				newShow.subscriber = subid;

				Show.createShow(newShow, function(err) {
					if (err)
					throw err;

					// if successful, return the new user
					console.log("Succeeded");
				});
			}else{
				Show.findOne({'id' : req.params.id, 'subscriber' : subid }, (err, result)=>{
					if(err) throw err;
					if(!result){
						Show.update(
							{ "id": req.params.id},
							{ "$push": { "subscriber": subid } },
							function (err, raw) {
								if (err) return console.log(err);
								status = true;
								res.send(status);
							}
						);
					}
					else {
						console.log("Already subscribed")
					}
				})
			}
		})
	})

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/login');
	});


	app.get('/search/:id', function(req, res){
    var parser = xml2js.Parser({
      explicitArray: false,
      normalizeTags: true
    });
    const tvdb = new TVDB('0YTLHQL6Q63URBKV');
    tvdb.getSeriesByName(req.params.id).then((response, body) => {

      // for (var i = 0; i < response.length; i++) {
      //   var newShow = new Show();
      //
      //   newShow._id = response[i].id;
      //   newShow.name = response[i].seriesName;
      //   newShow.firstAired = response[i].
      // }
      res.send(response);
    }).catch(error => { throw error });
  });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
	return next();

	res.redirect('/login');
}
