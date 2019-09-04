var menuState = {
    create: function() {
        game.add.image(0, 0, 'backgroundm');
        this.menuSound = game.add.audio('menu');
        this.buttonSound = game.add.audio('button');
        this.karSound = game.add.audio('kar98');
        this.menuSound.play();
        this.menuSound.volume = 0.5;
        this.select_one = 0;

        this.keyboard = game.input.keyboard.addKeys({
            'enter': Phaser.Keyboard.ENTER,
            'up': Phaser.Keyboard.UP,
            'down': Phaser.Keyboard.DOWN,
            'left': Phaser.Keyboard.LEFT,
            'right': Phaser.Keyboard.RIGHT,
            'w': Phaser.Keyboard.W,
            'a': Phaser.Keyboard.A,
            's': Phaser.Keyboard.S,
            'd': Phaser.Keyboard.D
        });
        

        var nameLabel = game.add.text(358, -50, 'NS-SHAFT',
        { font: '50px Arial', fill: '#ffffff' });
        nameLabel.anchor.setTo(0.5, 0.5);
        game.add.tween(nameLabel).to({y: 80}, 1000).easing(Phaser.Easing.Bounce.Out).start();

        this.option = game.add.image(235, 156, 'play');

        this.oneLabel = game.add.text(358, 180, '1 Player', { font: '25px Arial', fill: '#ffffff' });
        this.oneLabel.anchor.setTo(0.5, 0.5);

        this.twoLabel = game.add.text(358, 230,'2 Players', { font: '25px Arial', fill: '#ffffff' });
        this.twoLabel.anchor.setTo(0.5, 0.5);

        this.hardLabel = game.add.text(358, 280,'Challenge', { font: '25px Arial', fill: '#ffffff' });
        this.hardLabel.anchor.setTo(0.5, 0.5);

        this.leaderLabel = game.add.text(358, 330,'Leaderboard', { font: '25px Arial', fill: '#ffffff' });
        this.leaderLabel.anchor.setTo(0.5, 0.5);
        
        /*var startLabel = game.add.text(358, 340,'Press the Enter key to Start the game !', { font: '25px Arial', fill: '#ffffff' });
        startLabel.anchor.setTo(0.5, 0.5);
        game.add.tween(startLabel).to({angle: -5}, 100).to({angle: 5}, 200).to({angle: 0}, 100).loop().start();*/

        var infoLabel = game.add.text(750, 50, 'Press A to \nSee Info ⍰', {font: '20px Arial', fill: '#ffffff'});
        infoLabel.anchor.setTo(0.5, 0.5);
        game.add.tween(infoLabel).to({x: 650}, 1000).easing(Phaser.Easing.Exponential.Out).start();

        if (this.select_one == 0) {
            this.oneLabel = game.add.text(358, 180, '1 Player', { font: '25px Arial', fill: '#ffffff' });
            this.oneLabel.anchor.setTo(0.5, 0.5);
            this.twoLabel = game.add.text(358, 230,'2 Players', { font: '25px Arial', fill: '#ffffff' });
            this.twoLabel.anchor.setTo(0.5, 0.5);
            this.hardLabel = game.add.text(358, 280,'Challenge', { font: '25px Arial', fill: '#ffffff' });
            this.hardLabel.anchor.setTo(0.5, 0.5);
            this.leaderLabel = game.add.text(358, 330,'Leaderboard', { font: '25px Arial', fill: '#ffffff' });
            this.leaderLabel.anchor.setTo(0.5, 0.5);
        } else if (this.select_one == 1) {
            this.oneLabel = game.add.text(358, 180, '1 Player', { font: '25px Arial', fill: '#ffffff' });
            this.oneLabel.anchor.setTo(0.5, 0.5);
            this.twoLabel = game.add.text(358, 230,'2 Players', { font: '25px Arial', fill: '#ffffff' });
            this.twoLabel.anchor.setTo(0.5, 0.5);
            this.hardLabel = game.add.text(358, 280,'Challenge', { font: '25px Arial', fill: '#ffffff' });
            this.hardLabel.anchor.setTo(0.5, 0.5);
            this.leaderLabel = game.add.text(358, 330,'Leaderboard', { font: '25px Arial', fill: '#ffffff' });
            this.leaderLabel.anchor.setTo(0.5, 0.5);
        } else if (this.select_one == 2) {
            this.oneLabel = game.add.text(358, 180, '1 Player', { font: '25px Arial', fill: '#ffffff' });
            this.oneLabel.anchor.setTo(0.5, 0.5);
            this.twoLabel = game.add.text(358, 230,'2 Players', { font: '25px Arial', fill: '#ffffff' });
            this.twoLabel.anchor.setTo(0.5, 0.5);
            this.hardLabel = game.add.text(358, 280,'Challenge', { font: '25px Arial', fill: '#ffffff' });
            this.hardLabel.anchor.setTo(0.5, 0.5);
            this.leaderLabel = game.add.text(358, 330,'Leaderboard', { font: '25px Arial', fill: '#ffffff' });
            this.leaderLabel.anchor.setTo(0.5, 0.5);
        } else if (this.select_one == 3) {
            this.oneLabel = game.add.text(358, 180, '1 Player', { font: '25px Arial', fill: '#ffffff' });
            this.oneLabel.anchor.setTo(0.5, 0.5);
            this.twoLabel = game.add.text(358, 230,'2 Players', { font: '25px Arial', fill: '#ffffff' });
            this.twoLabel.anchor.setTo(0.5, 0.5);
            this.hardLabel = game.add.text(358, 280,'Challenge', { font: '25px Arial', fill: '#ffffff' });
            this.hardLabel.anchor.setTo(0.5, 0.5);
            this.leaderLabel = game.add.text(358, 330,'Leaderboard', { font: '25px Arial', fill: '#ffffff' });
            this.leaderLabel.anchor.setTo(0.5, 0.5);
        }
        
        game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(this.prev, this);
        game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(this.next, this);
        game.input.keyboard.addKey(Phaser.Keyboard.W).onDown.add(this.prev, this);
        game.input.keyboard.addKey(Phaser.Keyboard.S).onDown.add(this.next, this);
        var EnterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        EnterKey.onDown.add(this.start, this);
        /*var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        upKey.onDown.add(this.start, this);*/

        var aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        aKey.onDown.add(this.leader, this);

        

    },

    next: function () {
        this.buttonSound.play();
        if (this.select_one == 0) {
            this.select_one = 1;
            this.oneLabel = game.add.text(358, 180, '1 Player', { font: '25px Arial', fill: '#ffffff' });
            this.oneLabel.anchor.setTo(0.5, 0.5);
            this.twoLabel = game.add.text(358, 230,'2 Players', { font: '25px Arial', fill: '#ffffff' });
            this.twoLabel.anchor.setTo(0.5, 0.5);
            game.add.tween(this.twoLabel.scale).to({x: 1.5, y: 1.5}, 200).yoyo(true).start();
            game.add.tween(this.option).to({y: 206}, 100).start();
            this.hardLabel = game.add.text(358, 280,'Challenge', { font: '25px Arial', fill: '#ffffff' });
            this.hardLabel.anchor.setTo(0.5, 0.5);
            this.leaderLabel = game.add.text(358, 330,'Leaderboard', { font: '25px Arial', fill: '#ffffff' });
            this.leaderLabel.anchor.setTo(0.5, 0.5);
        } else if (this.select_one == 1) {
            this.select_one = 2;
            this.oneLabel = game.add.text(358, 180, '1 Player', { font: '25px Arial', fill: '#ffffff' });
            this.oneLabel.anchor.setTo(0.5, 0.5);
            this.twoLabel = game.add.text(358, 230,'2 Players', { font: '25px Arial', fill: '#ffffff' });
            this.twoLabel.anchor.setTo(0.5, 0.5);
            this.hardLabel = game.add.text(358, 280,'Challenge', { font: '25px Arial', fill: '#ffffff' });
            this.hardLabel.anchor.setTo(0.5, 0.5);
            game.add.tween(this.hardLabel.scale).to({x: 1.5, y: 1.5}, 200).yoyo(true).start();
            game.add.tween(this.option).to({y: 256}, 100).start();
            this.leaderLabel = game.add.text(358, 330,'Leaderboard', { font: '25px Arial', fill: '#ffffff' });
            this.leaderLabel.anchor.setTo(0.5, 0.5);
        } else if (this.select_one == 2) {
            this.select_one = 3;
            this.oneLabel = game.add.text(358, 180, '1 Player', { font: '25px Arial', fill: '#ffffff' });
            this.oneLabel.anchor.setTo(0.5, 0.5);
            this.twoLabel = game.add.text(358, 230,'2 Players', { font: '25px Arial', fill: '#ffffff' });
            this.twoLabel.anchor.setTo(0.5, 0.5);
            this.hardLabel = game.add.text(358, 280,'Challenge', { font: '25px Arial', fill: '#ffffff' });
            this.hardLabel.anchor.setTo(0.5, 0.5);
            this.leaderLabel = game.add.text(358, 330,'Leaderboard', { font: '25px Arial', fill: '#ffffff' });
            this.leaderLabel.anchor.setTo(0.5, 0.5);
            game.add.tween(this.leaderLabel.scale).to({x: 1.5, y: 1.5}, 200).yoyo(true).start();
            game.add.tween(this.option).to({y: 306}, 100).start();
        }
        else if (this.select_one == 3) {
            this.select_one = 0;
            this.oneLabel = game.add.text(358, 180, '1 Player', { font: '25px Arial', fill: '#ffffff' });
            this.oneLabel.anchor.setTo(0.5, 0.5);
            game.add.tween(this.oneLabel.scale).to({x: 1.5, y: 1.5}, 200).yoyo(true).start();
            game.add.tween(this.option).to({y: 156}, 100).start();
            this.twoLabel = game.add.text(358, 230,'2 Players', { font: '25px Arial', fill: '#ffffff' });
            this.twoLabel.anchor.setTo(0.5, 0.5);
            this.hardLabel = game.add.text(358, 280,'Challenge', { font: '25px Arial', fill: '#ffffff' });
            this.hardLabel.anchor.setTo(0.5, 0.5);
            this.leaderLabel = game.add.text(358, 330,'Leaderboard', { font: '25px Arial', fill: '#ffffff' });
            this.leaderLabel.anchor.setTo(0.5, 0.5);
        }
    },
    prev: function () {
        this.buttonSound.play();
        if (this.select_one == 0) {
            this.select_one = 3;
            this.oneLabel = game.add.text(358, 180, '1 Player', { font: '25px Arial', fill: '#ffffff' });
            this.oneLabel.anchor.setTo(0.5, 0.5);
            this.twoLabel = game.add.text(358, 230,'2 Players', { font: '25px Arial', fill: '#ffffff' });
            this.twoLabel.anchor.setTo(0.5, 0.5);
            this.hardLabel = game.add.text(358, 280,'Challenge', { font: '25px Arial', fill: '#ffffff' });
            this.hardLabel.anchor.setTo(0.5, 0.5);
            this.leaderLabel = game.add.text(358, 330,'Leaderboard', { font: '25px Arial', fill: '#ffffff' });
            this.leaderLabel.anchor.setTo(0.5, 0.5);
            game.add.tween(this.leaderLabel.scale).to({x: 1.5, y: 1.5}, 200).yoyo(true).start();
            game.add.tween(this.option).to({y: 306}, 100).start();
        } else if (this.select_one == 1) {
            this.select_one = 0;
            this.oneLabel = game.add.text(358, 180, '1 Player', { font: '25px Arial', fill: '#ffffff' });
            this.oneLabel.anchor.setTo(0.5, 0.5);
            game.add.tween(this.oneLabel.scale).to({x: 1.5, y: 1.5}, 200).yoyo(true).start();
            game.add.tween(this.option).to({y: 156}, 100).start();
            this.twoLabel = game.add.text(358, 230,'2 Players', { font: '25px Arial', fill: '#ffffff' });
            this.twoLabel.anchor.setTo(0.5, 0.5);
            this.hardLabel = game.add.text(358, 280,'Challenge', { font: '25px Arial', fill: '#ffffff' });
            this.hardLabel.anchor.setTo(0.5, 0.5);
            this.leaderLabel = game.add.text(358, 330,'Leaderboard', { font: '25px Arial', fill: '#ffffff' });
            this.leaderLabel.anchor.setTo(0.5, 0.5);
        } else if (this.select_one == 2) {
            this.select_one = 1;
            this.oneLabel = game.add.text(358, 180, '1 Player', { font: '25px Arial', fill: '#ffffff' });
            this.oneLabel.anchor.setTo(0.5, 0.5);
            this.twoLabel = game.add.text(358, 230,'2 Players', { font: '25px Arial', fill: '#ffffff' });
            this.twoLabel.anchor.setTo(0.5, 0.5);
            game.add.tween(this.twoLabel.scale).to({x: 1.5, y: 1.5}, 200).yoyo(true).start();
            game.add.tween(this.option).to({y: 206}, 100).start();
            this.hardLabel = game.add.text(358, 280,'Challenge', { font: '25px Arial', fill: '#ffffff' });
            this.hardLabel.anchor.setTo(0.5, 0.5);
            this.leaderLabel = game.add.text(358, 330,'Leaderboard', { font: '25px Arial', fill: '#ffffff' });
            this.leaderLabel.anchor.setTo(0.5, 0.5);
        } else if (this.select_one == 3) {
            this.select_one = 2;
            this.oneLabel = game.add.text(358, 180, '1 Player', { font: '25px Arial', fill: '#ffffff' });
            this.oneLabel.anchor.setTo(0.5, 0.5);
            this.twoLabel = game.add.text(358, 230,'2 Players', { font: '25px Arial', fill: '#ffffff' });
            this.twoLabel.anchor.setTo(0.5, 0.5);
            this.hardLabel = game.add.text(358, 280,'Challenge', { font: '25px Arial', fill: '#ffffff' });
            this.hardLabel.anchor.setTo(0.5, 0.5);
            game.add.tween(this.hardLabel.scale).to({x: 1.5, y: 1.5}, 200).yoyo(true).start();
            game.add.tween(this.option).to({y: 256}, 100).start();
            this.leaderLabel = game.add.text(358, 330,'Leaderboard', { font: '25px Arial', fill: '#ffffff' });
            this.leaderLabel.anchor.setTo(0.5, 0.5);
        }
    },
    start: function () {
        
        if (this.select_one == 0) {
            //this.karSound.play();
            this.menuSound.stop();
            game.state.start('name');
        } else if (this.select_one == 1) {
            //this.karSound.play();
            this.menuSound.stop();
            game.state.start('play2');
        } else if (this.select_one == 2) {
            //this.karSound.play();
            this.menuSound.stop();
            game.state.start('challenge');
        }
        else if (this.select_one == 3) {
            //this.karSound.play();
            this.menuSound.stop();
            game.state.start('leader');
        }

    },
    leader: function(){
        this.menuSound.stop();
        game.state.start('info');
        //alert("\nPress the B key to Back\n\nPress the Enter key to next");
    }

}; 