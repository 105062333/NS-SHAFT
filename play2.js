
var playState_2 = {
   
    preload:function () {
    
    
    },
    
    create:function () {
        game.add.image(0, 0, 'background3');
        game.add.image(400, 0, 'record');
        this.hurtSound = game.add.audio('hurt');
        this.hurt2Sound = game.add.audio('hurt2');
        this.backSound = game.add.audio('back3');
        this.overSound = game.add.audio('over');
        //this.menuSound.stop();
        this.backSound.play();
        this.backSound.volume = 0.8;
        this.backSound.loop = true;
    
        this.status = 'running';
        this.score = 0;
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

        this.emitter2 = game.add.emitter(0, 0, 15);
        this.emitter2.makeParticles('pixel2');
        this.emitter2.setYSpeed(-150, 150);
        this.emitter2.setXSpeed(-150, 150);
        this.emitter2.setScale(2, 0, 2, 0, 800);
        this.emitter2.gravity = 0;
        this.emitter2.width = 50;
        this.emitter2.height = 50;
    
        this.createBounders();
        this.createPlayer();
        this.createTextsBoard();
    },
    
     update:function () {
    
        if(this.status == 'gameOver' && this.keyboard.enter.isDown){
            game.state.start('menu');
        } 
        if(this.status == 'gameOver' && this.keyboard.n.isDown) {
            game.state.start('menu');
        }
        if(this.status != 'running') return;
    
        game.physics.arcade.collide(this.player, this.player2);
        game.physics.arcade.collide(this.player, this.platforms, this.effect, null, this);
        game.physics.arcade.collide(this.player, [this.leftWall, this.rightWall]);
        game.physics.arcade.collide(this.player2, this.platforms, this.effect2, null, this);
        game.physics.arcade.collide(this.player2, [this.leftWall, this.rightWall]);
         
    
        this.checkTouchCeiling(this.player);
        this.checkTouchCeiling2(this.player2);
        this.checkGameOver();
    
        this.updatePlayer();
        this.updatePlatforms();
        this.updateTextsBoard();
    
        this.createPlatforms();
        this.updateScore();
    },
    
     createBounders :function() {
        this.ceiling = game.add.image(0, 0, 'ceiling');
    
        this.leftWall = game.add.sprite(0, 0, 'wallc');
        game.physics.arcade.enable(this.leftWall);
        this.leftWall.body.immovable = true;
    
        this.rightWall = game.add.sprite(383, 0, 'wallc');
        game.physics.arcade.enable(this.rightWall);
        this.rightWall.body.immovable = true;
    
        this.rrightWall = game.add.sprite(700, 0, 'wallc');
    },
    
     createPlayer:function() {
        this.player = game.add.sprite(250, 50, 'player');
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

        this.player2 = game.add.sprite(150, 50, 'player2');
        game.physics.arcade.enable(this.player2);
        this.player2.body.gravity.y = 500;
        this.player2.animations.add('left', [0, 1, 2, 3], 8);
        this.player2.animations.add('right', [9, 10, 11, 12], 8);
        this.player2.animations.add('flyleft', [18, 19, 20, 21], 12);
        this.player2.animations.add('flyright', [27, 28, 29, 30], 12);
        this.player2.animations.add('fly', [36, 37, 38, 39], 12);
        this.player2.life = 10;
        this.player2.unbeatableTime = 0;
        this.player2.touchOn = undefined;
    },
    
     createTextsBoard :function() {
        var style = {fill: '#ffffff', font: '20px Arial'}
        var style1 = {fill: '#ffffff', font: '40px Arial'}
        var style2 = {fill: '#ffffff', font: '30px Arial'}
        this.text1 = game.add.text(340, 30, '', {fill: '#FFFF59', font: '20px Arial'});
        this.text1.anchor.setTo(0.5, 0.5);
        this.text2p = game.add.text(60, 30, '', {fill: '#59FF59', font: '20px Arial'});
        this.text2p.anchor.setTo(0.5, 0.5);

        this.text2 = game.add.text(550, 200, '', style1);
        this.text2.anchor.setTo(0.5, 0.5);
        this.textu = game.add.text(550, 150, 'UNDERGROUND', style);
        this.textu.anchor.setTo(0.5, 0.5);
        this.texttime = game.add.text(500, 30, '', style);
    
        this.text3 = game.add.text(200, -50, 'Player 1 WIN !!', style2);
        this.text3.anchor.setTo(0.5, 0.5);
        this.text4 = game.add.text(200, -50, 'Player 2 WIN !!', style2);
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
            this.score += 1;
        }
    },
     createOnePlatform :function() {
    
        var platform;
        var x = Math.random()*(400 - 96 - 40) + 20;
        var y = 400;
        var rand = Math.random() * 100;
    
        if(rand < 20) {
            platform = game.add.sprite(x, y, 'normal2');
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

        if(this.keyboard.a.isDown) {
            this.player2.body.velocity.x = -250;
        } else if(this.keyboard.d.isDown) {
            this.player2.body.velocity.x = 250;
        } else {
            this.player2.body.velocity.x = 0;
        }
        this.setPlayerAnimate(this.player2);
    },
    
    setPlayerAnimate:function(player) {
        var x = this.player.body.velocity.x;
        var y = this.player.body.velocity.y;

        var x2 = this.player2.body.velocity.x;
        var y2 = this.player2.body.velocity.y;
    
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

        if (x2 < 0 && y2 != 0) {
            this.player2.animations.play('flyleft');
        }
        if (x2 > 0 && y2 != 0) {
            this.player2.animations.play('flyright');
        }
        if (x2 < 0 && y2 == 0) {
            this.player2.animations.play('left');
        }
        if (x2 > 0 && y2 == 0) {
            this.player2.animations.play('right');
        }
        if (x2 == 0 && y2 != 0) {
            this.player2.animations.play('fly');
        }
        if (x2 == 0 && y2 == 0) {
            this.player2.frame = 8;
        }
    },
    
    updatePlatforms:function () {
        for(var i=0; i<this.platforms.length; i++) {
            var platform = this.platforms[i];
            if(this.score > 30)
                platform.body.position.y -= 3.5;
            else if(this.score > 20)
                platform.body.position.y -= 3;
            else if(this.score > 10)
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
        this.text2p.setText('LIFE ' + this.player2.life);
        this.texttime.setText('Time : ' + game.time.now/1000);
        this.text2.setText(this.score);
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
        if(platform.key == 'normal2') {
            this.basicEffect(this.player, platform);
        }
        if(platform.key == 'fake') {
            this.fakeEffect(this.player, platform);
        }
    },
    effect2:function(player2, platform) {
        if(platform.key == 'conveyorRight') {
            this.conveyorRightEffect2(this.player2, platform);
        }
        if(platform.key == 'conveyorLeft') {
            this.conveyorLeftEffect2(this.player2, platform);
        }
        if(platform.key == 'trampoline') {
            this.trampolineEffect2(this.player2, platform);
        }
        if(platform.key == 'nails') {
            this.nailsEffect2(this.player2, platform);
        }
        if(platform.key == 'normal2') {
            this.basicEffect2(this.player2, platform);
        }
        if(platform.key == 'fake') {
            this.fakeEffect2(this.player2, platform);
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

    conveyorRightEffect2:function(player2, platform) {
        this.player2.body.x += 2;
    },
    
    conveyorLeftEffect2: function(player2, platform) {
        this.player2.body.x -= 2;
    },
    
    trampolineEffect2: function(player2, platform) {
        platform.animations.play('jump');
        this.player2.body.velocity.y = -350;
    },
    
    nailsEffect2: function(player2, platform) {
        if (this.player2.touchOn !== platform) {
            this.hurt2Sound.play();
            if(this.player2.life < 3) this.player2.life = 0;
            if(this.player2.life >= 3) this.player2.life -= 3;
            this.player2.touchOn = platform;
            game.camera.flash(0xff0000, 100);
        }
    },
    
    basicEffect2:function(player2, platform) {
        if (this.player2.touchOn !== platform) {
            if(this.player2.life < 10) {
                this.player2.life += 1;
            }
            this.player2.touchOn = platform;
        }
    },
    
    fakeEffect2:function(player2, platform) {
        if(this.player2.touchOn !== platform) {
            platform.animations.play('turn');
            setTimeout(function() {
                platform.body.checkCollision.up = false;
            }, 100);
            this.player2.touchOn = platform;
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
    checkTouchCeiling2:function(player2) {
        if(this.player2.body.y < 0) {
            if(this.player2.body.velocity.y < 0) {
                this.player2.body.velocity.y = 0;
            }
            if(game.time.now > this.player2.unbeatableTime) {
                this.hurt2Sound.play();
                if(this.player2.life < 3) this.player2.life = 0;
                if(this.player2.life >= 3) this.player2.life -= 3;
                game.camera.flash(0xff0000, 100);
                this.player2.unbeatableTime = game.time.now + 2000;
            }
        }
    },
    
    checkGameOver:function () {
        if(this.player.life <= 0) {
            game.camera.shake(0.02, 300);
            this.emitter.x = this.player.body.x;
            this.emitter.y = this.player.body.y;
            this.emitter.start(true, 800, null, 15);
            this.text4.visible = true;
            game.add.tween(this.text4).to({y: 200}, 1000).easing(Phaser.Easing.Bounce.Out).start();
            this.gameOver();
        }
        if(this.player.body.y > 500){
            game.camera.shake(0.02, 300);
            this.emitter.x = this.player.body.x;
            this.emitter.y = 400;
            this.emitter.start(true, 800, null, 15);
            this.text4.visible = true;
            game.add.tween(this.text4).to({y: 200}, 1000).easing(Phaser.Easing.Bounce.Out).start();
            this.gameOver();
        }
        if(this.player2.life <= 0) {
            game.camera.shake(0.02, 300);
            this.emitter2.x = this.player2.body.x;
            this.emitter2.y = this.player2.body.y;
            this.emitter2.start(true, 800, null, 15);
            this.text3.visible = true;
            game.add.tween(this.text3).to({y: 200}, 1000).easing(Phaser.Easing.Bounce.Out).start();
            this.gameOver();
        }
        if(this.player2.body.y > 500){
            game.camera.shake(0.02, 300);
            this.emitter2.x = this.player2.body.x;
            this.emitter2.y = 400;
            this.emitter2.start(true, 800, null, 15);
            this.text3.visible = true;
            game.add.tween(this.text3).to({y: 200}, 1000).easing(Phaser.Easing.Bounce.Out).start();
            this.gameOver();
        }
    },
    
     gameOver :function() {
        //this.text3.visible = true;
        //this.text4.visible = true;
    
        /*this.emitter.x = this.player.body.x;
        this.emitter.y = this.player.body.y;
        this.emitter.start(true, 800, null, 15);*/
        
        this.platforms.forEach(function(s) {s.destroy()});
        this.platforms = [];
        this.player.visible = false;
        this.player2.visible = false;
        this.status = 'gameOver';
        this.backSound.stop();
        this.overSound.play();
        //game.add.tween(this.text3).to({y: 180}, 1000).easing(Phaser.Easing.Bounce.Out).start();
        //game.add.tween(this.text4).to({y: 230}, 1000).easing(Phaser.Easing.Bounce.Out).start();
        game.time.events.add(1500,function() {game.state.start('menu');}, this);
    },
    
    restart:function () {
        game.add.tween(this.text3).to({y: -50}, 1000).start();
        game.add.tween(this.text4).to({y: -50}, 1000).start();
        this.text3.visible = false;
        this.text4.visible = false;
        this.score = 0;
        this.createPlayer();
        this.status = 'running';
        this.backSound.play();
    }

};

