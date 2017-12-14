console.log("in win.js");

var winState = {
  create: function () {

    if (player2hit === 15) {
      var wtext = game.add.text(game.world.centerX, game.world.centerY, "PLAYER 1\nWINS\nTHE CLOUD WAR");
      wtext.anchor.set(0.5);
      wtext.font = 'Press Start 2P';

      var grd = wtext.context.createLinearGradient(0, 0, 0, wtext.canvas.height);
      grd.addColorStop(0, '#8ED6FF');
      grd.addColorStop(1, '#004CB3');
      wtext.fill = grd;

      wtext.align = 'center';
      wtext.stroke = '#000000';
      wtext.strokeThickness = 2;
      wtext.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
      player2hit = 0;
      playerhit = 0;
      // p1games++;
      localStorage.p1++;
      // $('#p1won').text('Games Won: ' + localStorage.p1);
    } else if (playerhit === 15) {
      var wtext = game.add.text(game.world.centerX, game.world.centerY, "PLAYER 2\nWINS\nTHE CLOUD WAR");
      wtext.anchor.set(0.5);
      wtext.font = 'Press Start 2P';

      var grd = wtext.context.createLinearGradient(0, 0, 0, wtext.canvas.height);
      grd.addColorStop(0, '#8ED6FF');
      grd.addColorStop(1, '#004CB3');
      wtext.fill = grd;

      wtext.align = 'center';
      wtext.stroke = '#000000';
      wtext.strokeThickness = 2;
      wtext.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
      player2hit = 0;
      playerhit = 0;
      // p2games++;
      localStorage.p2++;
      // $('#p2won').text('Games Won: ' + localStorage.p2);
    } else {
      console.log("error.");
    }

    var infoT = game.add.text(game.world.centerX, game.world.centerY + 150, "Press ENTER to Restart");
    infoT.anchor.set(0.5);
    infoT.font = 'Press Start 2P';
    infoT.fill = "#ffffff";

    music.play('', 0, 1, false);

    var resetReturn = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    resetReturn.onDown.addOnce(this.restart, this);
  },

  restart: function() {
    game.state.start('menu');
  }

};