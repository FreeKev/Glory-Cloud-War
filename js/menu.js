var menuState = {
  preload: function () {
    this.load.image('cloudz', 'assets/layers/cloud_lonely2.png');
  },

  create: function () {
    this.add.sprite(0, 0, 'cloudz');
    // var text = game.add.text(game.world.centerX, game.world.centerY, "click and drag me", { font: "65px Arial", fill: "#ff0044", align: "center" });
    var mtext = game.add.text(game.world.centerX, game.world.centerY, "- GLORY CLOUD WAR -\nWatch your head\nSquash your enemy");
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

    var texty = game.add.text(game.world.centerX, game.world.centerY + 150, "P1 = Arrows\nP2 = W-A-S-D\nSpacebar Starts Game\n15 Kills Wins");
    texty.anchor.set(0.5);
    texty.font = 'Press Start 2P';
    texty.fill = "#ffffff";


    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.addOnce(this.start, this);
  },

  start: function () {
    game.state.add('Game', PhaserGame, true);
  },


//ENDING BRACKET
};
