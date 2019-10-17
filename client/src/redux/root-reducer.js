// jshint esversion:6
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
// storage represents local storage, sessionStorage represents session storage
import storage from 'redux-persist/lib/storage';
import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import collectionReducer from './collection/collection.reducer';
import startButtonReducer from './startbutton/startbutton.reducer';
import rotationReducer from './rotation/rotation.reducer';
import gamePhaseReducer from './gamephase/gamephase.reducer';
import consoleReducer from './console/console.reducer';
import playerReducer from './players/player.reducer';
import selectedPlayerReducer from './selectedplayer/selectedplayer.reducer';
import currentPlayerReducer from './currentplayer/currentplayer.reducer';
import selectedCardReducer from './selectedcard/selectedcard.reducer';
import monsterInfoReducer from './monsterinfo/monsterinfo.reducer';
import defensesReducer from './defenses/defenses.reducer';
import monstersReducer from './monsters/monsters.reducer';
import endConditionReducer from './endcondition/endcondition.reducer';
import nameSpaceReducer from './namespace/namespace.reducer';

// key is the entry point fives therom where we start persisting state, root is the 
// bottom level. storage is object that gives method of 
// Only persist the cart reducer since the user reducer is being stored 
// by firebase auth.
const persistConfig = {
    key: 'root',
    storage, 
    whitelist: ['cart']
};

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    collection: collectionReducer,
    startbutton: startButtonReducer,
    rotation: rotationReducer,
    gamephase: gamePhaseReducer,
    console: consoleReducer,
    players: playerReducer,
    selectedplayer: selectedPlayerReducer,
    currentplayer: currentPlayerReducer,
    selectedcard: selectedCardReducer,
    monsterinfo: monsterInfoReducer,
    defenses: defensesReducer,
    monster: monstersReducer,
    endcondition: endConditionReducer,
    namespace: nameSpaceReducer
});

const resetReducer = (state, action) => {
    if (action.type === 'RESET_GAME') {
        state = undefined;
    }
    return rootReducer(state, action);
};

export const resetGame = () => {
    return ({
        type: 'RESET_GAME'
    });
};


export default persistReducer(persistConfig, resetReducer);