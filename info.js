
var infoState = {
    
    preload:function () {
       
       
   },
   
   create:function () {
        game.add.image(0, 0, 'backgroundm');
       this.hurtSound = game.add.audio('hurt');
       this.overSound = game.add.audio('over');
       this.ruleSound = game.add.audio('rule');
       //this.menuSound.stop();
       this.ruleSound.play();

   
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

       var nameLabel = game.add.text(game.width/2, -50, 'Rules',
        { font: '50px Arial', fill: '#ffffff' }); 
        nameLabel.anchor.setTo(0.5, 0.5);
        game.add.tween(nameLabel).to({y: 80}, 1000).easing(Phaser.Easing.Exponential.Out).start();

        this.backLabel = game.add.text(130, game.height-70,
        '☜ BACK', { font: '30px Arial', fill: '#ffffff' }); 
        this.backLabel.anchor.setTo(0.5, 0.5);
        game.add.tween(this.backLabel).to({angle: -2}, 200).to({angle: 2}, 400).to({angle: 0}, 200).loop().start();

        this.player = game.add.sprite(200, 140, 'player');
        game.physics.arcade.enable(this.player);
        this.player.animations.add('right', [9, 10, 11, 12], 8);

        var style = {fill: '#ffffff', font: '20px Arial'}
        this.text1 = game.add.text(250, 140, '', style);
        this.text1.setText('press ← to Left ╱ → to Right');

        this.player2 = game.add.sprite(200, 200, 'player2');
        game.physics.arcade.enable(this.player2);
        this.player2.animations.add('right', [9, 10, 11, 12], 8);

        this.text2 = game.add.text(250, 200, '', style);
        this.text2.setText('press A to Left ╱ D to Right');

        this.text3 = game.add.text(250, 260, '', style);
        this.text3.setText('press B to Back ╱ Enter to Next');

        var bKey = game.input.keyboard.addKey(Phaser.Keyboard.B);
        bKey.onDown.add(this.back, this); 

   },
   
    update:function () {
        this.player.animations.play('right');
        this.player2.animations.play('right');
   },

   back: function(){
        this.ruleSound.stop();
        game.state.start('menu');
   }
};
   
   