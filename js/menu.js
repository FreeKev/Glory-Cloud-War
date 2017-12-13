console.log("in menu.js");


var menuState = {
  create: function () {
    console.log("in the create function");

    // var text = game.add.text(game.world.centerX, game.world.centerY, "click and drag me", { font: "65px Arial", fill: "#ff0044", align: "center" });
    var text = game.add.text(game.world.centerX, game.world.centerY, "- phaser -\nrocking with\ngoogle web fonts");
    text.anchor.set(0.5);
    text.font = 'Press Start 2P';

    grd = text.context.createLinearGradient(0, 0, 0, text.canvas.height);
    grd.addColorStop(0, '#8ED6FF');
    grd.addColorStop(1, '#004CB3');
    text.fill = grd;

    text.align = 'center';
    text.stroke = '#000000';
    text.strokeThickness = 2;
    text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);


    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.addOnce(this.start, this);
  },

  start: function () {
    // game.state.start('play');
    game.state.add('Game', PhaserGame, true);
  },




//ENDING BRACKET
};



// TITLE BUTTON
// game.menu = function(game) {
//
// };
//
// game.menu.prototype = {
//     create: function(game){
//       this.createButton(game, "Play", game.world.centerX,game.world.centerY + 32, 300, 100, function() {
//         this.state.start('Level1');
//       })
//
//       titlescreen = game.add.sprite(game.world.centerX,game.world.centerY - 192, 'title');
//       titlescreen.anchor.setTo(0.5, 0.5);
//     },
//
//     update: function(game){
//
//     }
//
//     createButton: function(game, string, x,y,w,h, callback){
//
//       var buttonS = game.add.button(x,y, 'button', callback, this, 2,1,0);
//
//       buttoS.anchor.setTo(0.5, 0.5);
//       buttonS.width = w;
//       buttonS.height = h;
//
//       var txt = game.add.text(buttonS.x, buttonS.y, string);
//
//       txt.anchor.setTo(0.5, 0.5);
//     }
//
// };

// MUSIC
// toggleAudio: function () {
//   if (music.isPlaying) {
//       music.pause();
//     } else {
//   music.resume();
//   }
// },
