
var nameState = {
    
    preload:function () {
       
       
   },
   
   create:function () {
    game.add.image(0, 0, 'backgroundm');
       this.hurtSound = game.add.audio('hurt');
       this.overSound = game.add.audio('over');
       this.karSound = game.add.audio('kar98');
       //this.menuSound.stop();
       this.karSound.play();

   
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

       var nameLabel = game.add.text(game.width/2, -50, 'Type Your Name',
        { font: '50px Arial', fill: '#ffffff' }); 
        nameLabel.anchor.setTo(0.5, 0.5);
        game.add.tween(nameLabel).to({y: 100}, 1000).easing(Phaser.Easing.Exponential.Out).start();

        game.add.plugin(PhaserInput.Plugin);
		input = game.add.inputField(265, 195,{
			font: '18px Arial',
			fill: '#444444',
			fontWeight: 'bold',
			width: 180,
			padding: 8,
			borderWidth: 2,
			borderColor: '#000',
			borderRadius: 6,
            placeHolder: '李俊廷好帥'
        });
        this.startLabel = game.add.text(580, game.height-70,
        'START ☞', { font: '30px Arial', fill: '#ffffff' }); 
        this.startLabel.anchor.setTo(0.5, 0.5);
        game.add.tween(this.startLabel).to({angle: -2}, 200).to({angle: 2}, 400).to({angle: 0}, 200).loop().start();
            
        this.backLabel = game.add.text(130, game.height-70,
        '☜ BACK', { font: '30px Arial', fill: '#ffffff' }); 
        this.backLabel.anchor.setTo(0.5, 0.5);
        game.add.tween(this.backLabel).to({angle: -2}, 200).to({angle: 2}, 400).to({angle: 0}, 200).loop().start();

        var infoLabel = game.add.text(750, 50, 'Press A to \nSee Info ⍰', {font: '20px Arial', fill: '#ffffff'});
        infoLabel.anchor.setTo(0.5, 0.5);
        game.add.tween(infoLabel).to({x: 650}, 1000).easing(Phaser.Easing.Exponential.Out).start();
    
        var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enterKey.onDown.add(this.start, this); 

        var bKey = game.input.keyboard.addKey(Phaser.Keyboard.B);
        bKey.onDown.add(this.back, this); 

        var aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        aKey.onDown.add(this.leader, this);
   
   },
   
    update:function () {
        //this._inputField.update();
   },
   start: function() {
       if(input.value != "")
            game.state.start('play');
        else{
            alert("What's your name??");
        }
   },
   back: function(){
        game.state.start('menu');
   },
   leader: function(){
    game.state.start('info3');
    //alert("\nPress the B key to Back\n\nPress the Enter key to next");
    }

};
   
   