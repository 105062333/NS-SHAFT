var game = new Phaser.Game(717, 400, Phaser.AUTO, 'canvas');


//var user_name = "";
//var database = firebase.database().ref();
var input;
var userInfoText="";
var bool=-1;
var score= 0;

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('name', nameState);
game.state.add('play', playState);
game.state.add('play2', playState_2);
game.state.add('challenge', challState);
game.state.add('leader', leaderState);
game.state.add('info', infoState);
game.state.add('info2', info2State);
game.state.add('info3', info3State);

game.state.start('boot');