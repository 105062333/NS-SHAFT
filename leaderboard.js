var leaderState = {
    preload:function () {
       
       
    },
    
    create:function () {
     game.add.image(0, 0, 'backgroundm');
        this.legendSound = game.add.audio('legend');
        this.karSound = game.add.audio('kar98');
        //this.menuSound.stop();
        this.legendSound.play();
 
    
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
 
        var scoreBoard = game.add.text(game.width/2, -50, 'Leaderboard',
         { font: '50px Arial', fill: '#ffffff' }); 
         scoreBoard.anchor.setTo(0.5, 0.5);
         game.add.tween(scoreBoard).to({y: 80}, 1000).easing(Phaser.Easing.Exponential.Out).start();
      
         this.backLabel = game.add.text(130, game.height-70,
         '☜ BACK', { font: '30px Arial', fill: '#ffffff' }); 
         this.backLabel.anchor.setTo(0.5, 0.5);
         game.add.tween(this.backLabel).to({angle: -2}, 200).to({angle: 2}, 400).to({angle: 0}, 200).loop().start();

         var infoLabel = game.add.text(750, 50, 'Press A to \nSee Info ⍰', {font: '20px Arial', fill: '#ffffff'});
        infoLabel.anchor.setTo(0.5, 0.5);
        game.add.tween(infoLabel).to({x: 650}, 1000).easing(Phaser.Easing.Exponential.Out).start();
     
         var bKey = game.input.keyboard.addKey(Phaser.Keyboard.B);
         bKey.onDown.add(this.back, this); 

         var aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        aKey.onDown.add(this.leader, this);

        var query = firebase.database().ref('scoreBoard').orderByChild('Score').limitToLast(5);
		var count = 0;
		query.on('child_added', function(snap) {
        var record = snap.val();
		if(count == 4){
            var board = game.add.text( game.width/2, 300-count*30, record.Name + '  ➯  ' + record.Score, { font: '25px Arial', fill: '#ffff14' });
            board.anchor.setTo(0.5, 0.5);
        }
		else{
            var board = game.add.text( game.width/2, 300-count*30, record.Name + '  ➯  ' + record.Score, { font: '25px Arial', fill: '#ffffff' });
            board.anchor.setTo(0.5, 0.5);
        }
        var date = game.add.text( game.width/2+250, 300-count*30, record.Year + '/' + record.Month + '/' + record.Day + '    ' + record.Hours + ':' + record.Minutes + ':' + record.Seconds, { font: '15px Arial', fill: '#ffffff' });
            date.anchor.setTo(0.5, 0.5);
        count++;
		});
    
    },
    
    update:function () {
         //this._inputField.update();
    },
    back: function(){
        game.state.start('menu');
        this.legendSound.stop();
    },
    leader: function(){
        this.legendSound.stop();
        game.state.start('info2');
        //alert("\nPress the B key to Back\n\nPress the Enter key to next");
    }
};