var express = require('express');
var router = express.Router();
var monsterDeckModel = require('../monster-deck/monster-deck.dao');

/* GET home page. */
router.get('/:room', function(req, res) {

	monsterDeckModel.find({room: req.params.room}, function(err, result) {
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