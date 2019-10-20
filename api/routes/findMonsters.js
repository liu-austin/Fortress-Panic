var express = require('express');
var router = express.Router();
var monstersModel = require('../monsters/monsters.dao');

/* GET home page. */
router.get('/:room', function(req, res) {

	monstersModel.find({room: req.params.room}, function(err, result) {
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