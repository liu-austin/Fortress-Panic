var express = require('express');
var router = express.Router();
var monsterDeckModel = require('../monster-deck/monster-deck.dao');

/* GET home page. */
router.get('/', function(req, res) {

	monsterDeckModel.find({}, function(err, result) {
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