var loadState = {
    preload: function () {

        var loadingLabel = game.add.text(358, 150,
        'loading...', { font: '30px Arial', fill: '#ffffff' });
        loadingLabel.anchor.setTo(0.5, 0.5);
        var progressBar = game.add.sprite(358, 200, 'progressBar');
        progressBar.anchor.setTo(0.5, 0.5);
        game.load.setPreloadSprite(progressBar);
        game.load.spritesheet('player', './assets/player.png', 32, 32);
        game.load.spritesheet('player2', './assets/player2.png', 32, 32);
        game.load.image('normal', './assets/normall.png');
        game.load.image('normal2', './assets/normal.png');

        game.load.image('nails', './assets/nails.png');
        game.load.spritesheet('conveyorRight', './assets/conveyor_right.png', 96, 16);
        game.load.spritesheet('conveyorLeft', './assets/conveyor_left.png', 96, 16);
        game.load.spritesheet('trampoline', './assets/trampoline.png', 96, 22);
        game.load.spritesheet('fake', './assets/fake.png', 96, 36);

        game.load.spritesheet('btn', './assets/button-anim.png', 40.4, 41);
        game.load.image('wall', './assets/walll.png');
        game.load.image('wallc', './assets/wall.png');
        game.load.image('ceiling', './assets/ceiling.png');
        game.load.image('pixel', 'assets/pixel2.png');
        game.load.image('pixel2', 'assets/pixel.png');

        game.load.image('backgroundm', 'assets/background.jpg');
        game.load.image('background', 'assets/back.jpg');
        game.load.image('background2', 'assets/back2.jpg');
        game.load.image('background3', 'assets/back3.jpg');
        game.load.image('backgroundch', 'assets/backch.jpg');
        game.load.image('record', 'assets/reco.jpg');
        game.load.image('play', './assets/play2.png');
        
        game.load.audio('menu', ['assets/chal.wav', 'assets/chal.mp3']);
        game.load.audio('hurt', ['assets/hurt.wav', 'assets/hurt.mp3']);
        game.load.audio('back', ['assets/back.wav', 'assets/back.mp3']);
        game.load.audio('chall', 'assets/menu.mp3');
        game.load.audio('back3', 'assets/back3.mp3');
        game.load.audio('legend', 'assets/legend.mp3');
        game.load.audio('rule', 'assets/rule.mp3');
        game.load.audio('button', 'assets/button.mp3');
        game.load.audio('kar98', 'assets/98k.mp3');
        game.load.audio('over', 'assets/gameover.mp3');
        game.load.audio('hurt2', 'assets/hurt2.mp3');


    },
    create: function() {
        game.state.start('menu');
    }
}; 