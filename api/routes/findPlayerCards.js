var express = require('express');
var router = express.Router();
var playerCardsModel = require('../player-cards/player-cards.dao');

/* GET home page. */
router.get('/', function(req, res) {

	playerCardsModel.find({}, function(err, result) {
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