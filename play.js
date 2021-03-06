

var playState = {
    
 preload:function () {
    
    
},

create:function () {
    game.add.image(0, 0, 'background');
    game.add.image(400, 0, 'record');
    this.hurtSound = game.add.audio('hurt');
    this.backSound = game.add.audio('back');
    this.overSound = game.add.audio('over');

    //this.menuSound.stop();
    this.backSound.play();
    this.backSound.volume = 0.5;
    this.backSound.loop = true;

    this.status = 'running';

    score = 0;

    this.platforms = [];
    this.lastTime = 0;
    this.scoretime = 0;

    this.keyboard = game.input.keyboard.addKeys({
        'enter': Phaser.Keyboard.ENTER,
        'up': Phaser.Keyboard.UP,
        'down': Phaser.Keyboard.DOWN,
        'left': Phaser.Keyboard.LEFT,
        'right': Phaser.Keyboard.RIGHT,
        'n': Phaser.Keyboard.N,
        'w': Phaser.Keyboard.W,
        'a': Phaser.Keyboard.A,
        's': Phaser.Keyboard.S,
        'd': Phaser.Keyboard.D
    });

    this.emitter = game.add.emitter(0, 0, 15);
    this.emitter.makeParticles('pixel');
    this.emitter.setYSpeed(-150, 150);
    this.emitter.setXSpeed(-150, 150);
    this.emitter.setScale(2, 0, 2, 0, 800);
    this.emitter.gravity = 0;
    this.emitter.width = 50;
    this.emitter.height = 50;

    this.createBounders();
    this.createPlayer();
    this.createTextsBoard();
},

 update:function () {

    if(this.status == 'gameOver' && this.keyboard.enter.isDown){

        //this.restart();
        var Renew = new Date();
        game.state.start('play');
        var recordref = firebase.database().ref('scoreBoard').push();
        recordref.set({
            Name: input.value,
            Score: score,
            Year: Renew.getFullYear(),
            Month: Renew.getMonth() + 1,
            Day: Renew.getDate(),
            Hours: Renew.getHours(),
            Minutes: Renew.getMinutes(),
            Seconds: Renew.getSeconds()
        });
    } 
    if(this.status == 'gameOver' && this.keyboard.n.isDown) {
        var Renew = new Date();
        game.state.start('menu');
        var recordref = firebase.database().ref('scoreBoard').push();
        recordref.set({
            Name: input.value,
            Score: score,
            Year: Renew.getFullYear(),
            Month: Renew.getMonth() + 1,
            Day: Renew.getDate(),
            Hours: Renew.getHours(),
            Minutes: Renew.getMinutes(),
            Seconds: Renew.getSeconds()
        });

    }
    if(this.status != 'running') return;

    game.physics.arcade.collide(this.player, this.platforms, this.effect, null, this);
    game.physics.arcade.collide(this.player, [this.leftWall, this.rightWall]);
     

    this.checkTouchCeiling(this.player);
    this.checkGameOver();

    this.updatePlayer();
    this.updatePlatforms();
    this.updateTextsBoard();

    this.createPlatforms();
    this.updateScore();
},

 createBounders :function() {
    this.ceiling = game.add.image(0, 0, 'ceiling');

    this.leftWall = game.add.sprite(0, 0, 'wall');
    game.physics.arcade.enable(this.leftWall);
    this.leftWall.body.immovable = true;

    this.rightWall = game.add.sprite(383, 0, 'wall');
    game.physics.arcade.enable(this.rightWall);
    this.rightWall.body.immovable = true;

    this.rrightWall = game.add.sprite(700, 0, 'wall');
},

 createPlayer:function() {
    this.player = game.add.sprite(200, 50, 'player');
    game.physics.arcade.enable(this.player);
    this.player.body.gravity.y = 500;
    this.player.animations.add('left', [0, 1, 2, 3], 8);
    this.player.animations.add('right', [9, 10, 11, 12], 8);
    this.player.animations.add('flyleft', [18, 19, 20, 21], 12);
    this.player.animations.add('flyright', [27, 28, 29, 30], 12);
    this.player.animations.add('fly', [36, 37, 38, 39], 12);
    this.player.life = 10;
    this.player.unbeatableTime = 0;
    this.player.touchOn = undefined;
},

 createTextsBoard :function() {
    var style = {fill: '#ffffff', font: '20px Arial'}
    var style1 = {fill: '#ffffff', font: '40px Arial'}
    this.text1 = game.add.text(340, 30, '', style);
    this.text1.anchor.setTo(0.5, 0.5);
    this.text2 = game.add.text(550, 200, '', style1);
    this.text2.anchor.setTo(0.5, 0.5);
    this.textu = game.add.text(550, 150, 'UNDERGROUND', style);
    this.textu.anchor.setTo(0.5, 0.5);
    this.texttime = game.add.text(500, 30, '', style);


    this.text3 = game.add.text(200, -80, 'Press Enter to Restart', style);
    this.text3.anchor.setTo(0.5, 0.5);
    this.text4 = game.add.text(200, -30, 'Press N to Exit', style);

    this.text4.anchor.setTo(0.5, 0.5);
    this.text3.visible = false;
    this.text4.visible = false;
},


createPlatforms:function() {
    if(game.time.now > this.lastTime + 600) {
        this.lastTime = game.time.now;
        this.createOnePlatform();
    }
},
updateScore:function(){
    if(game.time.now > this.scoretime + 3000) {
        this.scoretime = game.time.now;

        score += 1;

    }
},
 createOnePlatform :function() {

    var platform;
    var x = Math.random()*(400 - 96 - 40) + 20;
    var y = 400;
    var rand = Math.random() * 100;

    if(rand < 20) {
        platform = game.add.sprite(x, y, 'normal');
    } else if (rand < 40) {
        platform = game.add.sprite(x, y, 'nails');
        game.physics.arcade.enable(platform);
        platform.body.setSize(96, 15, 0, 15);
    } else if (rand < 50) {
        platform = game.add.sprite(x, y, 'conveyorLeft');
        platform.animations.add('scroll', [0, 1, 2, 3], 16, true);
        platform.play('scroll');
    } else if (rand < 60) {
        platform = game.add.sprite(x, y, 'conveyorRight');
        platform.animations.add('scroll', [0, 1, 2, 3], 16, true);
        platform.play('scroll');
    } else if (rand < 80) {
        platform = game.add.sprite(x, y, 'trampoline');
        platform.animations.add('jump', [4, 5, 4, 3, 2, 1, 0, 1, 2, 3], 60);
        platform.frame = 3;
    } else {
        platform = game.add.sprite(x, y, 'fake');
        platform.animations.add('turn', [0, 1, 2, 3, 4, 5, 0], 14);
    }

    game.physics.arcade.enable(platform);
    platform.body.immovable = true;
    this.platforms.push(platform);

    platform.body.checkCollision.down = false;
    platform.body.checkCollision.left = false;
    platform.body.checkCollision.right = false;
},

 updatePlayer :function() {
    if(this.keyboard.left.isDown) {
        this.player.body.velocity.x = -250;
    } else if(this.keyboard.right.isDown) {
        this.player.body.velocity.x = 250;
    } else {
        this.player.body.velocity.x = 0;
    }
    this.setPlayerAnimate(this.player);
},

setPlayerAnimate:function(player) {
    var x = this.player.body.velocity.x;
    var y = this.player.body.velocity.y;

    if (x < 0 && y != 0) {
        this.player.animations.play('flyleft');
    }
    if (x > 0 && y != 0) {
        this.player.animations.play('flyright');
    }
    if (x < 0 && y == 0) {
        this.player.animations.play('left');
    }
    if (x > 0 && y == 0) {
        this.player.animations.play('right');
    }
    if (x == 0 && y != 0) {
        this.player.animations.play('fly');
    }
    if (x == 0 && y == 0) {
        this.player.frame = 8;
    }
},

updatePlatforms:function () {
    for(var i=0; i<this.platforms.length; i++) {
        var platform = this.platforms[i];

        if(score > 30)
            platform.body.position.y -= 3.5;
        else if(score > 20)
            platform.body.position.y -= 3;
        else if(score > 10)
            platform.body.position.y -= 2.5;
        else
            platform.body.position.y -= 2;

        if(platform.body.position.y <= -20) {
            platform.destroy();
            this.platforms.splice(i, 1);
        }
    }
},

updateTextsBoard:function () {
    this.text1.setText('LIFE ' + this.player.life);
    this.texttime.setText('Time : ' + game.time.now/1000);

    this.text2.setText(score);

},

effect:function(player, platform) {
    if(platform.key == 'conveyorRight') {
        this.conveyorRightEffect(this.player, platform);
    }
    if(platform.key == 'conveyorLeft') {
        this.conveyorLeftEffect(this.player, platform);
    }
    if(platform.key == 'trampoline') {
        this.trampolineEffect(this.player, platform);
    }
    if(platform.key == 'nails') {
        this.nailsEffect(this.player, platform);
    }
    if(platform.key == 'normal') {
        this.basicEffect(this.player, platform);
    }
    if(platform.key == 'fake') {
        this.fakeEffect(this.player, platform);
    }
},

conveyorRightEffect:function(player, platform) {
    this.player.body.x += 2;
},

conveyorLeftEffect: function(player, platform) {
    this.player.body.x -= 2;
},

trampolineEffect: function(player, platform) {
    platform.animations.play('jump');

    this.player.body.velocity.y = -350;

},

nailsEffect: function(player, platform) {
    if (this.player.touchOn !== platform) {
        this.hurtSound.play();
        if(this.player.life < 3) this.player.life = 0;
        if(this.player.life >= 3) this.player.life -= 3;
        this.player.touchOn = platform;
        game.camera.flash(0xff0000, 100);
    }
},

basicEffect:function(player, platform) {
    if (this.player.touchOn !== platform) {
        if(this.player.life < 10) {
            this.player.life += 1;
        }
        this.player.touchOn = platform;
    }
},

fakeEffect:function(player, platform) {
    if(this.player.touchOn !== platform) {
        platform.animations.play('turn');
        setTimeout(function() {
            platform.body.checkCollision.up = false;
        }, 100);
        this.player.touchOn = platform;
    }
},

checkTouchCeiling:function(player) {
    if(this.player.body.y < 0) {
        if(this.player.body.velocity.y < 0) {
            this.player.body.velocity.y = 0;
        }
        if(game.time.now > this.player.unbeatableTime) {
            this.hurtSound.play();
            if(this.player.life < 3) this.player.life = 0;
            if(this.player.life >= 3) this.player.life -= 3;
            game.camera.flash(0xff0000, 100);
            this.player.unbeatableTime = game.time.now + 2000;
        }
    }
},

checkGameOver:function () {
    if(this.player.life <= 0) {
        game.camera.shake(0.02, 300);
        this.emitter.x = this.player.body.x;
        this.emitter.y = this.player.body.y;
        this.emitter.start(true, 800, null, 15);
        this.gameOver();
    }
    if(this.player.body.y > 500){
        game.camera.shake(0.02, 300);
        this.emitter.x = this.player.body.x;
        this.emitter.y = 400;
        this.emitter.start(true, 800, null, 15);
        this.gameOver();
    }
},

 gameOver :function() {
    this.text3.visible = true;
    this.text4.visible = true;
    /*this.emitter.x = this.player.body.x;
    this.emitter.y = this.player.body.y;
    this.emitter.start(true, 800, null, 15);*/
    
    this.platforms.forEach(function(s) {s.destroy()});
    this.platforms = [];
    this.player.visible = false;
    this.status = 'gameOver';
    this.backSound.stop();

    this.overSound.play();
    game.add.tween(this.text3).to({y: 180}, 1000).easing(Phaser.Easing.Bounce.Out).start();
    game.add.tween(this.text4).to({y: 230}, 1000).easing(Phaser.Easing.Bounce.Out).start();
    //game.time.events.add(500,function() {game.state.start('menu');}, this);
   
    
 }/*,

restart:function () {
    game.add.tween(this.text3).to({y: -80}, 1000).start();
    game.add.tween(this.text4).to({y: -30}, 1000).start();
    this.text3.visible = false;
    this.text4.visible = false;
    score = 0;

    //game.time.events.add(500,function() {game.state.start('menu');}, this);
},

restart:function () {
    this.text3.visible = false;
    this.text4.visible = false;
    game.global.score = 0;

    this.createPlayer();
    this.status = 'running';
    this.backSound.play();
}

*/
};

