console.log("testing");

var game = new Phaser.Game(700, 500, Phaser.CANVAS, 'game');
var players = this.player || this.player2;
var playerhit = 0;
var player2hit = 0;
if(localStorage.p1 == undefined){
  localStorage.p1 = 0;
}
if(localStorage.p2 == undefined){
  localStorage.p2 = 0;
}
game.state.add('menu', menuState);
game.state.add('win', winState);

WebFontConfig = {
    google: {
      families: ['Press Start 2P']
    }
};

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
        // this.load.image('background', 'assets/Mountains_PS.png');
        // this.load.image('background', 'assets/Church-cloud.jpg');
        // this.load.image('background', 'assets/layers/sky2.png');
        this.load.image('mountback', 'assets/layers/mountains.png');
        this.load.image('mount', 'assets/layers/mountains2.png');
        this.load.image('platform', 'assets/cloud-platform.png');
        this.load.image('ice-platform', 'assets/ice-platform.png');
        //CHARS
        this.load.spritesheet('dude', 'assets/nitesheet2.png', 100, 83);
        this.load.spritesheet('dude2', 'assets/nitesheetBLU.png', 100, 83);
        //AUDIO
        this.load.audio('music', '../assets/dark-shrine.mp3');
        this.load.audio('smash', '../assets/churchbell.mp3');
        //FONT
        game.load.script("webfont", "//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js");
    },

    create: function () {
        //APPEARANCES
        this.add.sprite(0, 0, 'mount');
        this.MountainBacking = this.game.add.tileSprite(0,
          this.game.height - this.game.cache.getImage('mountback').height,
          this.game.width,
          this.game.cache.getImage('mountback').height,
          'mountback'
        );

        var mtext = game.add.text(game.world.centerX, game.world.centerY -180, $('#playerscore'));
        mtext.anchor.set(0.5);
        mtext.font = 'Press Start 2P';
        grd = mtext.context.createLinearGradient(0, 0, 0, mtext.canvas.height);
        grd.addColorStop(0, '#8ED6FF');
        grd.addColorStop(1, '#004CB3');
        mtext.fill = grd;
        mtext.align = 'center';
        mtext.stroke = '#000000';
        mtext.strokeThickness = 2;
        mtext.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);



        this.platforms = this.add.physicsGroup();
        this.platforms.create(0, 64, 'ice-platform');
        this.platforms.create(200, 180, 'platform');
        this.platforms.create(400, 296, 'ice-platform');
        this.platforms.create(600, 412, 'platform');
        this.platforms.setAll('body.allowGravity', false);
        this.platforms.setAll('body.immovable', true);
        this.platforms.setAll('body.velocity.x', 50);
        //PLAYER
        this.player = this.add.sprite(320, 432, 'dude');
        this.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
        // this.player.body.setSize(20, 32, 5, 16);
        this.player.body.setSize(40, 64, 10, 16);
        // this.player.body.gravity.y = 200;
        // sprite.body.velocity.y
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
        } else if (platform.body.velocity.x > 0 && platform.x >= 640) {
            platform.x = -160;
        }
    },

    setFriction: function (player, platform) {
        if (platform.key === 'ice-platform'){
            player.body.x -= platform.body.x - platform.body.prev.x;
        }
    },


    update: function () {
        // if (!music.isPlaying){
        //   music.resume();
        // }
        //IMAGE SCROLL
        this.MountainBacking.tilePosition.x -= 0.15;

        //PAUSE FUNCTION
        //Win FUNCTION
        $('#player2score').text('Player 2 Score: ' + playerhit);
        $('#playerscore').text('Player 1 Score: ' + player2hit);
        $('#p2won').text('Games Won: ' + localStorage.p2);
        $('#p1won').text('Games Won: ' + localStorage.p1);
        var Win = function () {
          game.state.start('win');
        };
        //Platform interaction
        this.platforms.forEach(this.wrapPlatform, this);
        this.physics.arcade.collide(this.player, this.player2);
        this.physics.arcade.collide(this.player2, this.player);
        this.physics.arcade.collide(this.player, this.platforms, this.setFriction, null, this);
        this.physics.arcade.collide(this.player2, this.platforms, this.setFriction, null, this);
        // this.platforms.collideDown == false;
        if (this.player.body.touching.up) {
          playerhit++;
          smash.play();
          this.player.kill();
          this.player.reset(game.world.randomX, this.player.y - 300);
          this.player.revive();
          // $('#player2score').text('Player 2 Score: ' + playerhit);
        }
        if (this.player2.body.touching.up) {
          player2hit++;
          smash.play();
          this.player2.kill();
          this.player2.reset(game.world.randomX, this.player2.y - 300);
          this.player2.revive();
          // $('#playerscore').text('Player 1 Score: ' + player2hit);
        }
        if (player2hit === 15 || playerhit === 15){
          Win();
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

game.state.start('menu');
// game.state.add('Game', PhaserGame, true);

// PAUSE FUNCTION
// $(function () {
//     $("#pauseButton").text("Pause").data("paused", false).click(function () {
//         $(this).data("paused", !$(this).data("paused"));
//         if ($(this).data("paused")) {
//             $(this).text("Resume");
//             game.paused = true;
//         } else {
//             $(this).text("Pause");
//             game.paused = false;
//         }
//     })
// });
