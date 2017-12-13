console.log("testing");

var game = new Phaser.Game(700, 500, Phaser.CANVAS, 'game');
var players = this.player || this.player2;
var playerhit = 0;
var player2hit = 0;

var PhaserGame = function () {
    this.player = null;
    this.player2 = null;
    this.platforms = null;
    this.facing = 'left';
    this.facing2 = 'left';
    this.jumpTimer1 = 0;
    this.jumpTimer2 = 0;
    this.cursors = null;
};

PhaserGame.prototype = {
    init: function () {
        this.game.renderer.renderSession.roundPixels = true;
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.gravity.y = 700;
    },

    preload: function () {
        this.load.image('background', 'assets/sophia.png');
        this.load.image('platform', 'assets/cloud-platform.png');
        this.load.image('ice-platform', 'assets/ice-platform.png');
        //CHARS
        this.load.spritesheet('dude', 'assets/nitesheet2.png', 100, 83);
        this.load.spritesheet('dude2', 'assets/nitesheetBLU.png', 100, 83);
        //AUDIO
        this.load.audio('music', '../assets/dark-shrine.mp3');
        this.load.audio('smash', '../assets/churchbell.mp3');
    },

    create: function () {
        this.add.sprite(0, 0, 'background');

        this.platforms = this.add.physicsGroup();
        this.platforms.create(0, 64, 'ice-platform');
        this.platforms.create(200, 180, 'platform');
        this.platforms.create(400, 296, 'ice-platform');
        this.platforms.create(600, 412, 'platform');
        this.platforms.setAll('body.allowGravity', false);
        this.platforms.setAll('body.immovable', true);
        this.platforms.setAll('body.velocity.x', 100);
        //PLAYER
        this.player = this.add.sprite(320, 432, 'dude');
        this.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
        // this.player.body.setSize(20, 32, 5, 16);
        this.player.body.setSize(40, 64, 10, 16);
        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('turn', [4], 20, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);
        //PLAYER 2
        this.player2 = this.add.sprite(120, 432, 'dude2');
        this.physics.arcade.enable(this.player2);
        this.player2.body.collideWorldBounds = true;
        // this.player.body.setSize(20, 32, 5, 16);
        this.player2.body.setSize(40, 64, 10, 16);
        this.player2.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player2.animations.add('turn', [4], 20, true);
        this.player2.animations.add('right', [5, 6, 7, 8], 10, true);

        this.cursors = this.input.keyboard.createCursorKeys();
        upButton = game.input.keyboard.addKey(Phaser.Keyboard.W);
        downButton = game.input.keyboard.addKey(Phaser.Keyboard.S);
        leftButton = game.input.keyboard.addKey(Phaser.Keyboard.A);
        rightButton = game.input.keyboard.addKey(Phaser.Keyboard.D);
        //audio
        music = game.add.audio('music');
        // music.play(); //background
        // music.loopFull()

        music = game.add.audio('music');
      	//	play: function (marker, position, volume, loop, forceRestart) {
        // this.music.loop = true;
      	music.play('', 0, 1, true);
        smash = game.add.audio('smash', 0.7, false)
    },

    wrapPlatform: function (platform) {
        if (platform.body.velocity.x < 0 && platform.x <= -160) {
            platform.x = 640;
        }
        else if (platform.body.velocity.x > 0 && platform.x >= 640) {
            platform.x = -160;
        }
    },

    setFriction: function (player, platform) {
        if (platform.key === 'ice-platform'){
            player.body.x -= platform.body.x - platform.body.prev.x;
        }
    },

    // toggleAudio: function () {
    //   if (music.isPlaying) {
		//       music.pause();
    //     } else {
		//   music.resume();
	  //   }
    // },

    update: function () {
        // if (!music.isPlaying){
        //   music.resume();
        // }
        //Platform interaction
        this.platforms.forEach(this.wrapPlatform, this);
        this.physics.arcade.collide(this.player, this.player2);
        this.physics.arcade.collide(this.player2, this.player);
        this.physics.arcade.collide(this.player, this.platforms, this.setFriction, null, this);
        this.physics.arcade.collide(this.player2, this.platforms, this.setFriction, null, this);
        if (this.player.body.touching.up) {
          playerhit++;
          console.log(playerhit);
          smash.play();
          this.player.kill();
          // this.player.revive();
          this.player.reset(game.world.randomX, this.player.y - 300);
          this.player.revive();
          $('#player2score').text('Player 2 Score: ' + playerhit);
        }
        if (this.player2.body.touching.up) {
          player2hit++;
          console.log(player2hit);
          smash.play();
          this.player2.kill();
          // this.player.revive();
          this.player2.reset(game.world.randomX, this.player.y - 300);
          this.player2.revive();
          $('#playerscore').text('Player 1 Score: ' + playerhit);
        }

        //  Do this AFTER the collide check, or we won't have blocked/touching set
        var standing = this.player.body.blocked.down || this.player.body.touching.down;

        this.player.body.velocity.x = 0;

        if (this.cursors.left.isDown){
            this.player.body.velocity.x = -300;

            if (this.facing !== 'left'){
                this.player.play('left');
                this.facing = 'left';
            }
        } else if (this.cursors.right.isDown) {
            this.player.body.velocity.x = 300;

            if (this.facing !== 'right'){
                this.player.play('right');
                this.facing = 'right';
            }
        } else {
            if (this.facing !== 'idle'){
                this.player.animations.stop();
                if (this.facing === 'left'){
                    this.player.frame = 0;
                } else {
                    this.player.frame = 5;}
                this.facing = 'idle';
            }
        }
        if (standing && this.cursors.up.isDown && this.time.time > this.jumpTimer1){
            this.player.body.velocity.y = -500;
            this.jumpTimer1 = this.time.time + 750;
        }
    //Player 2 controlled
    var standing2 = this.player2.body.blocked.down || this.player2.body.touching.down;

    this.player2.body.velocity.x = 0;

    if (leftButton.isDown){
        this.player2.body.velocity.x = -300;

        if (this.facing2 !== 'left'){
            this.player2.play('left');
            this.facing2 = 'left';
        }
    } else if (rightButton.isDown) {
        this.player2.body.velocity.x = 300;

        if (this.facing2 !== 'right'){
            this.player2.play('right');
            this.facing2 = 'right';
        }
    } else {
        if (this.facing2 !== 'idle'){
            this.player2.animations.stop();
            if (this.facing2 === 'left'){
                this.player2.frame = 0;
            } else {
                this.player2.frame = 5;}
            this.facing2 = 'idle';
        }
    }
    if (standing2 && upButton.isDown && this.time.time > this.jumpTimer2){
        this.player2.body.velocity.y = -500;
        this.jumpTimer2 = this.time.time + 750;
    }
}




};

game.state.add('Game', PhaserGame, true);
