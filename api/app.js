// jshint esversion:8
// const createError = require('http-errors');
const express = require('express');
const path = require('path');
// const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// const logger = require('morgan');
const cors = require("cors");
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const findMonstersRouter = require('./routes/findMonsters');
const findDefensesRouter = require('./routes/findDefenses');
const findMonsterDeckRouter = require('./routes/findMonsterDeck');
const findPlayerCardsRouter = require('./routes/findPlayerCards');
const findPlayerDeckRouter = require('./routes/findPlayerDeck');
const db = require('./config/database');
const app = express();
// const MonstersState = require('./monsters/monsters.states');
// const defensesState = require('./defenses/defenses.states');
// const playerCardsState = require('./player-cards/player-cards.state');
// const playerCardsModel = require('./player-cards/player-cards.dao');
// const playerDeckState = require('./player-deck/player-deck.state');
// const playerDeckModel = require('./player-deck/player-deck.dao');
// const properties = require('./config/properties');

//configure bodyparser
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({extended:true});

// call the database connectivity function
db();

// configure app.use()
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(cors());
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); 
// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/findMonsters', findMonstersRouter);
app.use('/findDefenses', findDefensesRouter);
app.use('/findMonsterDeck', findMonsterDeckRouter);
app.use('/findPlayerCards', findPlayerCardsRouter);
app.use('/findPlayerDeck', findPlayerDeckRouter);
// catch 404 and forward to error handler
// Error handling
// app.use(function(req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//    res.setHeader("Access-Control-Allow-Credentials", "true");
//    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
//  next();
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// playerDeckState.removePlayerCardIndices();
// playerDeckState.initializePlayerDeck();
// use express router
// app.use('/api', router);
// call monsters routing

// MonstersState.clearBoard();
// MonstersState.initializeBoard();
// MonstersState.addMonster(4);
// MonstersState.giantBoulder();

// MonstersState.moveMonsters(null);

// app.listen(properties.PORT, (req, res) => {
//   console.log(`Server is running on ${properties.PORT} port.`);
// });

module.exports = app;
