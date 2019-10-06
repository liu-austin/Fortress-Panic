// jshint esversion:6

const goblinCard = {name: 'Goblin', 
                    type: 'Monster',
                    description: '',
                    hitpoints: 1,
                    points: 1
                    };

const orcCard = {name: 'Orc', 
                    type: 'Monster',
                    description: '',
                    hitpoints: 2,
                    points: 2
                    };

const trollCard = {name: 'Troll', 
                    type: 'Monster',
                    description: '',
                    hitpoints: 3,
                    points: 3
                    };

const goblinKingCard = {name: 'Goblin King', 
                    type: 'Boss Monster',
                    description: 'When this monster spawns, spawn 3 more monsters.',
                    hitpoints: 2,
                    points: 3
                    };
                    
const orcWarlordCard = {name: 'Orc Warlord', 
                    type: 'Boss Monster',
                    description: 'When this monster spawns, move all monsters 1.',
                    hitpoints: 3,
                    points: 4
                    };

const ogreMageCard = {name: 'Ogre Mage', 
                    type: 'Boss Monster',
                    description: 'All players discard 1 card.',
                    hitpoints: 3,
                    points: 4
                    };

const shamanCard = {name: 'Shaman', 
                    type: 'Boss Monster',
                    description: 'When this monster spawns, all monsters gain 1 hitpoint.',
                    hitpoints: 1,
                    points: 2
                    };

const blueMonstersMove1Card = {name: 'Blue Monsters Move 1', 
                    type: 'Monster Effect',
                    description: 'Move all blue monsters 1.',
                    hitpoints: 0
                    };

const greenMonstersMove1Card = {name: 'Green Monsters Move 1', 
                    type: 'Monster Effect',
                    description: 'Move all green monsters 1.',
                    hitpoints: 0
                    };

const redMonstersMove1Card = {name: 'Red Monsters Move 1', 
                    type: 'Monster Effect',
                    description: 'Move all red monsters 1.',
                    hitpoints: 0
                    };

const plagueArchersCard = {name: 'Plague! Archers', 
                    type: 'Monster Effect',
                    description: 'All players discard all Archer cards.',
                    hitpoints: 0
                    };

const plagueKnightsCard = {name: 'Plague! Knights', 
                    type: 'Monster Effect',
                    description: 'All players discard all Knight cards.',
                    hitpoints: 0
                    };

const plagueSwordsmenCard = {name: 'Plague! Swordsmen', 
                    type: 'Monster Effect',
                    description: 'All players discard all Swordsman cards.',
                    hitpoints: 0
                    };

const discard1Card = {name: 'All Players Discard 1 Card', 
                    type: 'Monster Effect',
                    description: 'All players discard 1 card.',
                    hitpoints: 0
                    };

const draw3MonstersCard = {name: 'Draw 3 Monsters', 
                    type: 'Monster Effect',
                    description: 'Spawn 3 monsters.',
                    hitpoints: 0
                    };

const draw4MonstersCard = {name: 'Draw 4 Monsters', 
                    type: 'Monster Effect',
                    description: 'Spawn 4 monsters.',
                    hitpoints: 0
                    };

const monstersMoveClockwiseCard = {name: 'Monsters Move Clockwise', 
                    type: 'Monster Effect',
                    description: 'Move all monsters clockwise 1.',
                    hitpoints: 0
                    };

const monstersMoveCounterClockwiseCard = {name: 'Monsters Move Counter-Clockwise', 
                    type: 'Monster Effect',
                    description: 'Move all monsters counter-clockwise 1.',
                    hitpoints: 0
                    };

const giantBoulderCard = {name: 'Giant Boulder', 
                    type: 'Monster Effect',
                    description: 'A giant boulder randomly spawns and moves in a straight line, destroying all monsters until it hits a wall or tower.',
                    hitpoints: 0
                    };

const MonstersList = [
goblinCard,
goblinCard,
goblinCard,
goblinCard,
goblinCard,
goblinCard,
goblinCard,
goblinCard,
goblinCard,
orcCard,
orcCard,
orcCard,
orcCard,
orcCard,
orcCard,
orcCard,
orcCard,
trollCard,
trollCard,
trollCard,
trollCard,
goblinKingCard,
shamanCard,
orcWarlordCard,
ogreMageCard,
giantBoulderCard,
giantBoulderCard,
giantBoulderCard,
giantBoulderCard,
blueMonstersMove1Card,
blueMonstersMove1Card,
greenMonstersMove1Card,
greenMonstersMove1Card,
redMonstersMove1Card,
redMonstersMove1Card,
monstersMoveCounterClockwiseCard,
monstersMoveClockwiseCard,
plagueArchersCard,
plagueKnightsCard,
plagueSwordsmenCard,
discard1Card,
draw3MonstersCard,
draw4MonstersCard
];

module.exports = MonstersList;