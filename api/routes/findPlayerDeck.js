var express = require('express');
var router = express.Router();
var playerDeckModel = require('../player-deck/player-deck.dao');

/* GET home page. */
router.get('/', function(req, res) {

	playerDeckModel.find({}, function(err, result) {
		if (err) throw err;
		if (result) {
			res.json(result);
		} else {
			res.send(JSON.stringify({
				error : 'Error'
			}));
		}
	});
});

module.exports = router;