console.log("testing");

var game = new Phaser.Game(700, 500, Phaser.CANVAS, 'game');

var PhaserGame = function () {

    this.player = null;
    this.player2 = null;
    this.platforms = null;
    this.facing = 'left';
    this.jumpTimer = 0;
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
        this.load.spritesheet('dude', 'assets/nitesheet2.png', 100, 83);
        this.load.spritesheet('dude2', 'assets/nitesheetBLU.png', 100, 83);

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

        this.player = this.add.sprite(320, 432, 'dude');

        this.physics.arcade.enable(this.player);

        this.player.body.collideWorldBounds = true;
        // this.player.body.setSize(20, 32, 5, 16);
        this.player.body.setSize(40, 64, 10, 16);

        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('turn', [4], 20, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);

        this.cursors = this.input.keyboard.createCursorKeys();

    },

    wrapPlatform: function (platform) {

        if (platform.body.velocity.x < 0 && platform.x <= -160)
        {
            platform.x = 640;
        }
        else if (platform.body.velocity.x > 0 && platform.x >= 640)
        {
            platform.x = -160;
        }

    },

    setFriction: function (player, platform) {

        if (platform.key === 'ice-platform')
        {
            player.body.x -= platform.body.x - platform.body.prev.x;
        }

    },

    update: function () {

        this.platforms.forEach(this.wrapPlatform, this);

        this.physics.arcade.collide(this.player, this.platforms, this.setFriction, null, this);

        //  Do this AFTER the collide check, or we won't have blocked/touching set
        var standing = this.player.body.blocked.down || this.player.body.touching.down;

        this.player.body.velocity.x = 0;

        if (this.cursors.left.isDown)
        {
            this.player.body.velocity.x = -300;

            if (this.facing !== 'left')
            {
                this.player.play('left');
                this.facing = 'left';
            }
        }
        else if (this.cursors.right.isDown)
        {
            this.player.body.velocity.x = 300;

            if (this.facing !== 'right')
            {
                this.player.play('right');
                this.facing = 'right';
            }
        }
        else
        {
            if (this.facing !== 'idle')
            {
                this.player.animations.stop();

                if (this.facing === 'left')
                {
                    this.player.frame = 0;
                }
                else
                {
                    this.player.frame = 5;
                }

                this.facing = 'idle';
            }
        }

        if (standing && this.cursors.up.isDown && this.time.time > this.jumpTimer)
        {
            this.player.body.velocity.y = -500;
            this.jumpTimer = this.time.time + 750;
        }

    }

};

game.state.add('Game', PhaserGame, true);
